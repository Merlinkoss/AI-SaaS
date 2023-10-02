import { checkPromocode, tryToUsePromocode } from "@/lib/promocode";
import { auth, currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const user = await currentUser();
    const body = await req.json();
    const { promocode } = body;

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!promocode) {
      return new NextResponse("Wrong params", { status: 400 });
    }

    if (!checkPromocode(promocode)) {
      return new NextResponse("Promocode not found", { status: 404 });
    }

    const promocodeResult = await tryToUsePromocode(promocode, userId);

    if (!promocodeResult) {
      return new NextResponse("Promocode is not available to use", {
        status: 403,
      });
    }

    return new NextResponse("Done!", { status: 200 });
  } catch (error) {
    console.log("[PROMOCODE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
