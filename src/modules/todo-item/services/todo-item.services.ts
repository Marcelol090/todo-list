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
  itemId: number;
  userId: number;
  authToken: string;
  todoItemName?: string;
  priority?: "Alta" | "Media" | "Baixa";
  finished?: boolean;
};

export async function updateTodoItem({
  itemId,
  userId,
  authToken,
  todoItemName,
  priority,
  finished,
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
        itemName: todoItemName ? todoItemName : todoItem.itemName,
        priority: priority ? priority : todoItem.priority,
        editedAt: new Date(),
        finished: finished === undefined ? todoItem.finished : finished,
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
  todoItemIds: number[];
  userId: number;
  authToken: string;
};
export async function deleteTodoItem({
  todoItemIds,
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
      where: { itemId: { in: todoItemIds } },
    });
    if (todoItems.length !== todoItemIds.length) {
      throw new Error("Some todo items were not found");
    }
    await prisma.item.deleteMany({
      where: { itemId: { in: todoItemIds }},
    });
  } catch (error: any) {
    if (error.code === "ERR_JWT_EXPIRED") {
      error.message = "Token has expired";
      error.status = 401;
    }
    throw error;
  }
}