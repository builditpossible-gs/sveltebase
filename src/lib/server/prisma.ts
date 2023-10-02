import { PrismaClient } from "@prisma/client";

const prisma_client = global.prisma || new PrismaClient()

if(process.env.NODE_ENV === "development"){
    global.prisma = prisma_client
}

export { prisma_client }