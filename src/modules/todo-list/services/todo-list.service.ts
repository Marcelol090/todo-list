import { jwtVerify } from "jose";
import { PrismaClient } from "@prisma/client";
import { ListType } from "@/src/modules/todo-list/types/ListType";


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
  } catch (error: any) {
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

    const list: ListType = await prisma.list.create({
      data: {
        listName,
        userId,
        priority,
      },
    });

    return list;
  } catch (error: any) {
    if (error.code === "ERR_JWT_EXPIRED") {
      error.message = "Token has expired";
      error.status = 401;
    }

    throw error;
  }
}

export type UpdateListProps = {
  listId: number;
  userId: number;
  authToken: string;
  listName?: string;
  finished?: boolean;
  listEmoji?: string;
  priority?: "Alta" | "Media" | "Baixa";
};

export async function updateList({
  listId,
  userId,
  authToken,
  finished,
  listEmoji,
  listName,
  priority,
}: UpdateListProps) {
  try {
    const { payload } = await jwtVerify(
      authToken,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );

    if (payload.userId !== userId) {
      throw new Error("Invalid token");
    }
    const lsit = await prisma.list.findUnique({ where: { listId } });

    if (!lsit) {
      throw new Error("List not found");
    }

    const updatedList: ListType = await prisma.list.update({
      where: { listId },
      data: {
        listName: listName ? listName : lsit.listName,
        finished: finished === undefined ? lsit.finished : finished,
        listEmoji: listEmoji ? listEmoji : lsit.listEmoji,
        priority: priority ? priority : lsit.priority,
      },
    });

    return updatedList;
  } catch (error: any) {
    if (error.code === "ERR_JWT_EXPIRED") {
      error.message = "Token has expired";
      error.status = 401;
    }

    throw error;
  }
}

export type DeleteListProps = {
  listIds: number[];
  userId: number;
  authToken: string;
};

export async function deleteList({
  listIds,
  userId,
  authToken,
}: DeleteListProps): Promise<void> {
  try {
    const { payload } = await jwtVerify(
      authToken,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );

    if (payload.userId !== userId) {
      throw new Error("Invalid token");
    }

    const lists = await prisma.list.findMany({
      where: { listId: { in: listIds } },
    });

    if (lists.length !== listIds.length) {
      throw new Error("Some lists were not found");
    }

    await prisma.item.deleteMany({
      where: { listId: { in: listIds } },
    });

    await prisma.list.deleteMany({
      where: { listId: { in: listIds }, userId },
    });
  } catch (error: any) {
    if (error.code === "ERR_JWT_EXPIRED") {
      error.message = "Token has expired";
      error.status = 401;
    }

    throw error;
  }
}

export type GetListByListIdProps = {
  listId: number;
  userId: number;
  authToken: string;
};

export async function getListByListId({
  listId,
  userId,
  authToken,
}: GetListByListIdProps): Promise<ListType | null> {
  try {
    const { payload } = await jwtVerify(
      authToken,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );

    if (payload.userId !== userId) {
      throw new Error("Invalid token");
    }

    const list = await prisma.list.findUnique({ where: { listId } });

    if (!list) {
      return null;
    }

    return list;
  } catch (error: any) {
    if (error.code === "ERR_JWT_EXPIRED") {
      error.message = "Token has expired";
      error.status = 401;
    }

    throw error;
  }
}