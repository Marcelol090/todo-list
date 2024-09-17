import {
  deleteList,
  DeleteListProps,
} from "@/src/modules/todo-list/services/todo-list.service";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const authToken = req.headers.get("Authorization")?.split(" ")[1];

    if (!authToken) {
      return NextResponse.json(
        { error: "Authorization token is missing" },
        { status: 401 }
      );
    }

    const { listIds, userId }: DeleteListProps = await req.json();

    if (!listIds) {
      return NextResponse.json(
        { error: "Missing required field: listId" },
        { status: 400 }
      );
    }

    await deleteList({ listIds, userId, authToken });

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
