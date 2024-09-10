import { NextResponse } from "next/server";
import { getUsers } from "@/src/modules/users/services/user.service";

export async function GET() {
  try {
    const users = await getUsers();
    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Error fetching users." },
      { status: 500 }
    );
  }
}