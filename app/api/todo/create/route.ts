import {
  createTodoItem,
  CreateTodoItemProps,
} from "@/src/modules/todo-item/services/todo-item.services";
import {} from "@/src/modules/todo-list/services/todo-list.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const authToken = req.headers.get("Authorization")?.split(" ")[1];

    if (!authToken) {
      return NextResponse.json(
        { error: "Authorization token is missing" },
        { status: 401 }
      );
    }

    const { userId, listId }: CreateTodoItemProps = await req.json();

    if (!userId || !listId) {
      return NextResponse.json(
        { error: "Missing required fields: userId, listId" },
        { status: 400 }
      );
    }

    const todoItem = await createTodoItem({
      userId,
      listId,
      authToken,
    });

    return NextResponse.json(todoItem, { status: 201 });
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
