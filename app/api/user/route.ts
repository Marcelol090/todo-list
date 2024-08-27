import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json({ users });
}

export async function POST(req: Request) {
  try {
    const { email, senha } = await req.json();
    console.log(email, senha);

    // Verifica se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Usuário já existe." },
        { status: 400 }
      );
    }

    // Cria um novo usuário
    const newUser = await prisma.user.create({
      data: {
        email,
        senha,
      },
    });

    return NextResponse.json({ user: newUser });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return NextResponse.json(
      { error: "Erro ao criar usuário." },
      { status: 500 }
    );
  }
}
