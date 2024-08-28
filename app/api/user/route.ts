import { NextResponse } from "next/server";
import {
  getUserService,
  createUserService,
} from "@/src/modules/users/services/user.service";

export async function GET() {
  const users = await getUserService();
  return NextResponse.json({ users });
}

export async function POST(req: Request) {
  try {
    const { email, senha, confirmarSenha } = await req.json();
    
    const user = await createUserService(email, senha, confirmarSenha);
  
    if(user === undefined){
      NextResponse.json(
        { error: "Erro ao criar usuário." },
        { status: 500 }
      );
    }
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return NextResponse.json(
      { error: "Erro ao criar usuário." },
      { status: 500 }
    );
  }
}
