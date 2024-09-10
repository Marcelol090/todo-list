import { loginUser } from "@/src/modules/users/services/user.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const token = await loginUser({
      email,
      password,
    });

    if (token instanceof NextResponse) {
      const errorData = await token.json();
      return NextResponse.json(
        { error: errorData.error },
        { status: token.status }
      );
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
    console.error("Error during login:", error);
    return NextResponse.json({ error: "Error login user." }, { status: 500 });
  }
}