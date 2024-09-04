import { loginUser } from "@/src/modules/users/services/user.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const token = await loginUser({
      email,
      password,
    });

    if (token instanceof NextResponse) {
      const errorData = await token.json();
      return NextResponse.json({ error: errorData.error }, { status: 400 });
    }

    const responseCookie = NextResponse.json({ token, success: true });

    const sessionTime = process.env.SESSION_TIME
      ? Number(process.env.SESSION_TIME)
      : 60 * 60;

    responseCookie.cookies.set("auth_token", token.toString(), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: sessionTime,
    });

    return responseCookie;
  } catch (error) {
    return NextResponse.json({ error: "Error login user." }, { status: 500 });
  }
}