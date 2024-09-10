import {
  getListsByUserId,
  GetListsByUserIdProps,
} from "@/src/modules/todo-list/services/todo-list.service";
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

    const { userId }: GetListsByUserIdProps = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "Missing required field: userId" },
        { status: 400 }
      );
    }

    const lists = await getListsByUserId({ userId, authToken });

    return NextResponse.json(lists);
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