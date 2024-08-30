import { NextResponse } from "next/server";
import { loginUser } from "@/src/modules/users/services/user.service";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const response = loginUser({
      email,
      password,
    });

    if (response instanceof NextResponse) {
      const errorData = await response.json();

      return NextResponse.json({ error: errorData.error }, { status: 400 });
    }

    return NextResponse.json({ token: response });
  } catch (error) {
    return NextResponse.json(
      { error: "Error logging in user." },
      { status: 500 }
    );
  }
}
