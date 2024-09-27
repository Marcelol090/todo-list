import { getListByListId } from "@/src/modules/todo-list/services/todo-list.service";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { listId: string } }
) {
  try {
    const listId = Number (params.listId);
    const { userId }: { userId: number } = await req.json();

    if (isNaN(listId)) {
      return NextResponse.json(
        { error: "Missing required field: listId" },
        { status: 400 }
      );
    }

    if (isNaN(userId)) {
      return NextResponse.json(
        { error: "Missing required field: userId" },
        { status: 400 }
      );
    }

    const authToken = req.headers.get("Authorization")?.split(" ")[1];

    if (!authToken) {
      return NextResponse.json(
        { error: "Authorization token is missing" },
        { status: 401 }
      );
    }

    const list = await getListByListId({ listId, authToken, userId });

    if (!list) {
      return NextResponse.json({ error: "List not found" }, { status: 404 });
    }

    return NextResponse.json(list);
  } catch (error: any) {
    console.error(error);
    if (error.code === "ERR_JWT_EXPIRED") {
      return NextResponse.json(
        { error: "Token has expired, please log in again" },
        { status: 401 }
      );
    }

    if (error.code === "ERR_JWS_SIGNATURE_VERIFICATION_FAILED") {
      return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }

    if (error.message === "Invalid token") {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
