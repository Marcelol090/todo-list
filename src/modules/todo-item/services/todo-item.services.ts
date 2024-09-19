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
        listId
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
  todoItemId: number;
  userId: number;
  authToken: string;
  todoItemName?: string;
  todoItemDescription?: string;
  finished?: boolean;
};

// export async function updateTodoItem({
//   todoItemId,
//   userId,
//   authToken,
//   todoItemName,
//   todoItemDescription,
//   finished,
// }: UpdateTodoItemProps) {
//   try {
//     const { payload } = await jwtVerify(
//       authToken,
//       new TextEncoder().encode(process.env.JWT_SECRET!)
//     );

//     if (payload.userId !== userId) {
//       throw new Error("Invalid token");
//     }
//     const todoItem = await prisma.item.findUnique({ where: { todoItemId } });

//     if (!todoItem) {
//       throw new Error("Todo item not found");
//     }

//     const updatedTodoItem: TodoItemType = await prisma.item.update({
//       where: { todoItemId },
//       data: {
//         todoItemName: todoItemName ? todoItemName : todoItem.todoItemName,
//         todoItemDescription: todoItemDescription ? todoItemDescription : todoItem.todoItemDescription,
//         finished: finished === undefined ? todoItem.finished : finished,
//       },
//     });

//     return updatedTodoItem;
//   } catch (error: any) {
//     if (error.code === "ERR_JWT_EXPIRED") {
//       error.message = "Token has expired";
//       error.status = 401;
//     }

//     throw error;
//   }
// }

// export type DeleteTodoItemProps = {
//   todoItemIds: number[];
//   userId: number;
//   authToken: string;
// };

// export async function deleteTodoItem({
//   todoItemIds,
//   userId,
//   authToken,
// }: DeleteTodoItemProps): Promise<void> {
//   try {
//     const { payload } = await jwtVerify(
//       authToken,
//       new TextEncoder().encode(process.env.JWT_SECRET!)
//     );

//     if (payload.userId !== userId) {
//       throw new Error("Invalid token");
//     }

//     const todoItems = await prisma.todoItem.findMany({
//       where: { todoItemId: { in: todoItemIds } },
//     });

//     if (todoItems.length !== todoItemIds.length) {
//       throw new Error("Some todo items were not found");
//     }

//     await prisma.todoItem.deleteMany({
//       where: { todoItemId: { in: todoItemIds }, userId },
//     });
//   } catch (error: any) {
//     if (error.code === "ERR_JWT_EXPIRED") {
//       error.message = "Token has expired";
//       error.status = 401;
//     }

//     throw error;
//   }
// }


