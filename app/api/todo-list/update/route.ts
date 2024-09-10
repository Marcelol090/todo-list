import {
    updateList,
    UpdateListProps,
  } from "@/src/modules/todo-list/services/todo-list.service";
  import { NextResponse } from "next/server";
  
  export type ListBodyProps = {
    listId: number;
    listName?: string;
    listEmoji?: string;
    priority?: "Alta" | "Media" | "Baixa";
    userId: number;
    finished?: boolean;
  };
  
  export async function POST(req: Request) {
    try {
      const authToken = req.headers.get("Authorization")?.split(" ")[1];
  
      const body: ListBodyProps = await req.json();
  
      const {
        listName,
        priority,
        listId,
        userId,
        finished,
        listEmoji,
      }: ListBodyProps = body;
  
      if (!authToken || !listId) {
        return NextResponse.json(
          { error: "Authorization token or listId is missing" },
          { status: 401 }
        );
      }
  
      const list = await updateList({
        listId,
        listName,
        priority,
        authToken,
        userId,
        finished,
        listEmoji,
      });
  
      return NextResponse.json(list, { status: 200 });
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