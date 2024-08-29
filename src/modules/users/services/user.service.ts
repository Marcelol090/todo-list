import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { env } from "process";


const prisma = new PrismaClient();
export async function getUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export type CreateUserProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export async function createUser({
  name,
  email,
  password,
  confirmPassword,
}: CreateUserProps) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "User already exists." },
      { status: 409 }
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      { error: "Passwords don't match." },
      { status: 400 }
    );
  }

  const hashSalt = env.HASH_SALT;

  if (hashSalt === undefined || isNaN(Number(hashSalt))) {
    return NextResponse.json({ error: "Invalid hash key." }, { status: 400 });
  }

  const senhaHash = await bcrypt.hash(password, Number(hashSalt));

  const newUser = await prisma.user.create({
    data: {
      email,
      password: senhaHash,
      name,
    },
  });

  return newUser;
}

type LoginProps = {
  email: string;
  password: string;
};

