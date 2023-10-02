import { headers } from "next/headers";
import { NextResponse } from "next/server";
import {
  addPayment,
  getPaymentResult,
  isPaymentSignatureCorrect,
  onPaymentProcessed,
} from "@/lib/payment";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("X-Signature") as string;
  const data = JSON.parse(body);

  if (isPaymentSignatureCorrect(body, signature)) {
    return new NextResponse("Webhook error", { status: 400 });
  }

  if (data.status !== "success") {
    return new NextResponse("Operation not complete", { status: 400 });
  }

  if (!data?.id) {
    return new NextResponse("ID is empty", { status: 400 });
  }

  const { userId, amount, price } = await getPaymentResult(data?.id!);

  await addPayment(data.id, userId, price, amount);
  await onPaymentProcessed(userId, amount);

  return new NextResponse(null, { status: 200 });
}
