import {
    createList,
    CreateListProps,
  getListsByUserId,
  GetListsByUserIdProps,
} from "@/src/modules/lists/services/list.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      // Verifica se o token de autorização existe
      const authToken = req.headers.get("Authorization")?.split(" ")[1];
  
      if (!authToken) {
        return NextResponse.json(
          { error: "Authorization token is missing" },
          { status: 401 } // 401 Unauthorized
        );
      }
  
      // Valida o corpo da requisição
      const { userId, listName, priority }: CreateListProps = await req.json();
  
      if (!userId || !listName) {
        return NextResponse.json(
          { error: "Missing required fields: userId and listName" },
          { status: 400 } // 400 Bad Request
        );
      }
  
      // Chama a função para criar a lista
      const lists = await createList({ userId, listName, priority, authToken });
  
      return NextResponse.json({ lists }, { status: 201 }); // 201 Created
    } catch (error: any) {
      console.error(error);
  
      // Verifica se o erro foi gerado devido a um token inválido
      if (error.message === "Invalid token") {
        return NextResponse.json(
          { error: "Invalid token" },
          { status: 403 } // 403 Forbidden
        );
      }
  
      // Outros erros do servidor
      return NextResponse.json(
        { error: "An error occurred" },
        { status: 500 } // 500 Internal Server Error
      );
    }
  }