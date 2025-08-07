import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'], // เอาออกใน production ถ้าไม่อยากให้แสดง
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
