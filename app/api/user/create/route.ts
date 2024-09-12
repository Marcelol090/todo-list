import { createUser } from "@/src/modules/users/services/user.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password, confirmPassword } = await req.json();

    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        {
          error:
            "All fields are required: name, email, password, and confirmPassword",
        },
        { status: 400 }
      );
    }

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
        { status: response.status }
      );
    }

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Error creating user." },
      { status: 500 }
    );
  }
}