import {
    getListsByUserId,
    GetListsByUserIdProps,
  } from "@/src/modules/lists/services/list.service";
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
  
      const lists = await getListsByUserId({ userId, authToken });
  
      return NextResponse.json({ lists });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
  }