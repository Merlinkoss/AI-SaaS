import { auth } from "@clerk/nextjs";
import prismaDB from "@/lib/prismadb";

export const incrementApiLimit = async () => {
    const { userId } = auth();

    if (!userId) {
        return;
    }

    const userApiLimit = await prismaDB.userApiLimit.findUnique({
        where: { userId: userId },
    });

    if (userApiLimit) {
        await prismaDB.userApiLimit.update({
            where: { userId: userId },
            data: { count: userApiLimit.count + 1 },
        });
    } else {
        await prismaDB.userApiLimit.create({
            data: { userId: userId, count: 1 },
        });
    }
};

export const checkApiLimit = async () => {
    const { userId } = auth();

    if (!userId) {
        return false;
    }

    const userApiLimit = await prismaDB.userApiLimit.findUnique({
        where: { userId: userId }
    })

    if (!userApiLimit || userApiLimit.count < userApiLimit.maxApiLimit) {
        return true
    } else {
        return false
    }
}

export const getCurrentApiUsage = async () => {
    const { userId } = auth();

    if (!userId) {
        return 0;
    }

    const userApiLimit = await prismaDB.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    if (!userApiLimit) {
        return 0;
    }

    return userApiLimit.count;
}

export const getMaxAvailableApiUsage = async () => {
    const { userId } = auth();

    if (!userId) {
        return 1;
    }

    const userApiLimit = await prismaDB.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    if (!userApiLimit) {
        return 1;
    }

    return userApiLimit.maxApiLimit;
}