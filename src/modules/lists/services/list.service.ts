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


export type CreateListProps = {
  listName: string;
  userId: number;
  authToken: string;
  priority?: "Alta" | "Media" | "Baixa";
};

export async function createList({
  listName,
  userId,
  authToken,
  priority = "Baixa",	
}: CreateListProps) {
  try {
    const { payload } = await jwtVerify(
      authToken,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );

    if (payload.userId !== userId) {
      throw new Error("Invalid token");
    }

    const list = await prisma.list.create({
      data: {
        listName,
        userId,
        priority,
      },
    });

    return list;
  } catch (error) {
    throw error;
  }
}
