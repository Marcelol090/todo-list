import { jwtVerify } from "jose";
import { PrismaClient } from "@prisma/client";
import { TodoItemType } from "@/src/modules/todo-item/types/TodoItemType";

const prisma = new PrismaClient();

export type GetTodoItemsByListIdProps = {
  listId: number;
  userId: number;
  authToken: string;
};
export async function getTodoItemsByListId({
  listId,
  userId,
  authToken,
}: GetTodoItemsByListIdProps) {
  try {
    const { payload } = await jwtVerify(
      authToken,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );
    if (payload.userId !== userId) {
      throw new Error("Invalid token");
    }
    const todoItems = await prisma.item.findMany({
      where: { listId },
    });
    return todoItems;
  } catch (error: any) {
    throw error;
  }
}
export type CreateTodoItemProps = {
  listId: number;
  userId: number;
  authToken: string;
};
export async function createTodoItem({
  listId,
  userId,
  authToken,
}: CreateTodoItemProps) {
  try {
    const { payload } = await jwtVerify(
      authToken,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );
    if (payload.userId !== userId) {
      throw new Error("Invalid token");
    }
    const todoItem: TodoItemType = await prisma.item.create({
      data: {
        listId,
        userId,
      },
    });
    return todoItem;
  } catch (error: any) {
    if (error.code === "ERR_JWT_EXPIRED") {
      error.message = "Token has expired";
      error.status = 401;
    }
    throw error;
  }
}
export type UpdateTodoItemProps = {
  itemName?: string;
  itemId: number;
  finished?: boolean;
  priority?: "Alta" | "Media" | "Baixa";
  authToken: string;
  userId: number;
};

export async function updateTodoItem({
  itemName,
  itemId,
  finished,
  priority,
  authToken,
  userId,
}: UpdateTodoItemProps) {
  try {
    const { payload } = await jwtVerify(
      authToken,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );

    if (payload.userId !== userId) {
      throw new Error("Invalid token");
    }

    const todoItem = await prisma.item.findUnique({ where: { itemId } });

    if (!todoItem) {
      throw new Error("Todo item not found");
    }

    const updatedTodoItem: TodoItemType = await prisma.item.update({
      where: { itemId },
      data: {
        itemName: itemName ? itemName : todoItem.itemName,
        finished: finished === undefined ? todoItem.finished : finished,
        priority: priority ? priority : todoItem.priority,
        editedAt: new Date(),
      },
    });

    return updatedTodoItem;
  } catch (error: any) {
    if (error.code === "ERR_JWT_EXPIRED") {
      error.message = "Token has expired";
      error.status = 401;
    }
    throw error;
  }
}

export type DeleteTodoItemProps = {
  itemIds: number[];
  userId: number;
  authToken: string;
};

export async function deleteTodoItem({
  itemIds,
  userId,
  authToken,
}: DeleteTodoItemProps): Promise<void> {
  try {
    const { payload } = await jwtVerify(
      authToken,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );

    if (payload.userId !== userId) {
      throw new Error("Invalid token");
    }

    const todoItems = await prisma.item.findMany({
      where: { itemId: { in: itemIds } },
    });

    if (todoItems.length !== itemIds.length) {
      throw new Error("Some todo items were not found");
    }

    await prisma.item.deleteMany({
      where: { itemId: { in: itemIds } },
    });
  } catch (error: any) {
    if (error.code === "ERR_JWT_EXPIRED") {
      error.message = "Token has expired";
      error.status = 401;
    }
    throw error;
  }
}