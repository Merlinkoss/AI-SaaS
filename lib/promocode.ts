import { onPaymentProcessed } from "./payment";
import prismaDB from "./prismadb";

interface PromocodeToAmount {
    [key: string]: number;
}

const promocodeList: PromocodeToAmount = {
    "dreamteam": 7,
};

export function checkPromocode(promocode: string) {
    return promocode in promocodeList
}

export const tryToUsePromocode = async (promocode: string, userId: string) => {
    const usedPromocodes = await prismaDB.userPromocode.findMany(
        {
            where: {
                userId,
                activatedPromocode: promocode
            }
        }
    );

    if (usedPromocodes.length !== 0) {
        return false
    }

    await prismaDB.userPromocode.create(
        {
            data: {
                userId: userId,
                activatedPromocode: promocode
            }
        }
    )
    await onPaymentProcessed(userId, promocodeList[promocode].toString())

    return true;
}