import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../generated/prisma/client.js";

const isTest = process.env.NODE_ENV === "test";
const connectionString = isTest ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString: connectionString || "" });

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
