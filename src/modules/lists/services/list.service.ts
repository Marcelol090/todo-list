import { jwtVerify } from "jose";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type GetListsByUserIdProps = {
  userId: number;
  authToken: string;
};

export async function getListsByUserId({
  userId,
  authToken,
}: GetListsByUserIdProps) {
  try {
    const { payload } = await jwtVerify(
      authToken,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );

    if (payload.userId !== userId) {
      throw new Error("Invalid token");
    }

    const lists = await prisma.list.findMany({
      where: { userId },
    });

    return lists;
  } catch (error) {
    throw error;
  }
}
