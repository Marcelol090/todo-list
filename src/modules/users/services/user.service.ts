import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { randomInt, randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import { env } from "process";

const prisma = new PrismaClient();
export async function getUserService() {
  const users = await prisma.user.findMany();
  return users;
}

export async function createUserService(
    email: string,
    senha: string,
    confirmarSenha: string
  ) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
  
    if (existingUser) {
      return NextResponse.json({ error: "Usuário já existe." }, { status: 400 });
    }
  
    if (senha !== confirmarSenha) {
      return NextResponse.json(
        { error: "Senhas não conferem." },
        { status: 400 }
      );
    }
  
    const hashPassword = env.HASH_PASSWORD;
    if(hashPassword === undefined){
      return NextResponse.json({ error: "Chave inválida." }, { status: 400 });
    }
  
    let senhaHash;
    if (isNaN(Number(hashPassword))) {
      // Use hashPassword as a salt string
      senhaHash = await bcrypt.hash(senha, hashPassword);
    } else {
      // Use hashPassword as the number of salt rounds
      senhaHash = await bcrypt.hash(senha, Number(hashPassword));
    }
  
    // Cria um novo usuário
    const newUser = await prisma.user.create({
      data: {
        email,
        senha: senhaHash,
      },
    });
    return newUser;
  }