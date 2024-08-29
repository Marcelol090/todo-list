import { NextResponse } from "next/server";
import {
  getUsers,
  createUser,
} from "@/src/modules/users/services/user.service";

export async function GET() {
  const users = await getUsers();
  return NextResponse.json({ users });
}

export async function POST(req: Request) {
  try {
    const { name, email, password, confirmPassword } = await req.json();

    const response = await createUser({
      name,
      email,
      password,
      confirmPassword,
    });

    if (response instanceof NextResponse) {
      const errorData = await response.json();

      return NextResponse.json(
        { error: errorData.error },
        { status: 400 }
      );;
    }

    return NextResponse.json({ user: response });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating user." },
      { status: 500 }
    );
  }
}
