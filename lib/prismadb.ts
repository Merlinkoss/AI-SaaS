import { PrismaClient } from "@prisma/client"

declare global {
    var prisma: PrismaClient | undefined;
};

const prismaDB = global.prisma || new PrismaClient();
if(process.env.NODE_ENV !== "production") globalThis.prisma = prismaDB;

export default prismaDB;