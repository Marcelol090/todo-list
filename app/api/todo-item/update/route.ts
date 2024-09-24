import {
  updateTodoItem,
  UpdateTodoItemProps,
} from "@/src/modules/todo-item/services/todo-item.services";
import { NextResponse } from "next/server";

export type TodoItemBodyProps = {
  itemId: number;
  itemName?: string;
  finished?: boolean;
  priority?: "Alta" | "Media" | "Baixa";
  userId: number;
};

export async function POST(req: Request) {
  try {
    const authToken = req.headers.get("Authorization")?.split(" ")[1];

    const body: TodoItemBodyProps = await req.json();

    const { itemId, itemName, finished, priority, userId }: TodoItemBodyProps =
      body;

    if (!authToken || !itemId || !userId) {
      return NextResponse.json(
        {
          error:
            "Authorization token or required fields are missing: itemId or userId",
        },
        { status: 401 }
      );
    }

    const todoItem = await updateTodoItem({
      itemId,
      todoItemName: itemName,
      finished,
      authToken,
      userId,
      priority,
    });

    return NextResponse.json(todoItem, { status: 200 });
  } catch (error: any) {
    if (error.message === "Invalid token") {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    if (error.message === "Token has expired") {
      return NextResponse.json(
        { error: "Token has expired, please log in again" },
        { status: 401 }
      );
    }

    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}