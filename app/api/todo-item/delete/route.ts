import {
  deleteTodoItem,
  DeleteTodoItemProps,
} from "@/src/modules/todo-item/services/todo-item.services";
import { NextResponse } from "next/server";

export async function deleteItems(req: Request) {
  try {
    const authToken = req.headers.get("Authorization")?.split(" ")[1];

    if (!authToken) {
      return NextResponse.json(
        { error: "Authorization token is missing" },
        { status: 401 }
      );
    }

    const { todoItemIds, userId }: DeleteTodoItemProps = await req.json();

    if (!todoItemIds) {
      return NextResponse.json(
        { error: "Missing required field: listId" },
        { status: 400 }
      );
    }

    await deleteTodoItem({ todoItemIds, userId, authToken });

    return NextResponse.json({ status: 200 });
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

export async function DELETE(req: Request) {
  try {
    const authToken = req.headers.get("Authorization")?.split(" ")[1];

    if (!authToken) {
      return NextResponse.json(
        { error: "Authorization token is missing" },
        { status: 401 }
      );
    }

    const { itemIds, userId }: { itemIds: number[]; userId: number } =
      await req.json();

    if (!itemIds || !userId) {
      return NextResponse.json(
        { error: "Missing required fields: itemId and userId" },
        { status: 400 }
      );
    }

    await deleteTodoItem({ todoItemIds: itemIds, userId, authToken });

    return NextResponse.json({ status: 200 });
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
