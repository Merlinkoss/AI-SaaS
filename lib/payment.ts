import axios from "axios";
import prismaDB from "./prismadb";
import { randomUUID, createHmac } from "crypto";
import { absoluteUrl } from "./utils";
import { auth } from "@clerk/nextjs";
import { getPriceForAmount } from "./constants";

const redirectUrl = absoluteUrl("/settings/postpayment");
const DELIMETER = "#";

export async function generatePaymentLink(userId: string, amount: string) {
  const o2Response = await axios.post(
    `https://api.o2pay.co/api/merchant/v1/merchant/${process.env.O2PAY_MERCHANT_ID}/payment`,
    {
      currency: "USD",
      description: amount + " usages of LampoAI",
      id: randomUUID(),
      orderId: amount + DELIMETER + userId,
      price: getPriceForAmount(amount),
      redirectUrl: redirectUrl,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-O2PAY-TOKEN": process.env.O2PAY_API_KEY,
      },
    }
  );

  return o2Response.data.paymentUrl;
}

export function isPaymentSignatureCorrect(body: string, signature: string) {
  const digest = createHmac("sha512", process.env.O2PAY_WEBHOOK_SECRET!)
    .update(body)
    .digest("base64");

  return digest !== signature;
}

export async function getPaymentResult(id: string) {
  const o2Response = await axios.get(
    `https://api.o2pay.co/api/merchant/v1/merchant/${process.env.O2PAY_MERCHANT_ID}/payment/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-O2PAY-TOKEN": process.env.O2PAY_API_KEY,
      },
    }
  );

  return {
    amount: o2Response.data.orderId.split(DELIMETER, 2)[0],
    userId: o2Response.data.orderId.split(DELIMETER, 2)[1],
    price: o2Response.data.price + " " + o2Response.data.currency,
  };
}

export async function addPayment(
  id: string,
  userId: string,
  price: string,
  amount: string
) {
  if (!userId) {
    return;
  }

  await prismaDB.userPayment.create({
    data: {
      id,
      userId,
      price,
      amount,
    },
  });
}

export async function onPaymentProcessed(userId: string, amount: string) {
  if (!userId) {
    return;
  }

  let amountNum = parseInt(amount);

  if (!amountNum) {
    return;
  }

  const userApiLimit = await prismaDB.userApiLimit.findUnique({
    where: { userId: userId },
  });

  if (userApiLimit) {
    await prismaDB.userApiLimit.update({
      where: { userId: userId },
      data: { maxApiLimit: userApiLimit.maxApiLimit + amountNum },
    });
  } else {
    await prismaDB.userApiLimit.create({
      data: { userId: userId, maxApiLimit: 1 + amountNum },
    });
  }
}

export async function getPaymentHistory() {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const listOfPayment = await prismaDB.userPayment.findMany({
    where: { userId: userId },
  });
  return listOfPayment;
}
