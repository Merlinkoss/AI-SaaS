import { generatePaymentLink } from "@/lib/payment";
import { auth, currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();
    const user = await currentUser();
    const amount = req.nextUrl.searchParams.get("amount");

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!amount) {
      return new NextResponse("Wrong params", { status: 400 });
    }

    var url = await generatePaymentLink(userId, amount);

    return new NextResponse(JSON.stringify({ url }));
  } catch (error) {
    console.log("[PAYMENT_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
