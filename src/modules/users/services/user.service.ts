import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { env } from "process";
import * as jwt from "jsonwebtoken";

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
  try {
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
      return NextResponse.json({ error: "Invalid hash salt configuration." }, { status: 500 });
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
  } catch (error: any) {
    console.error("Error creating user:", error);

    return NextResponse.json(
      { error: "Error creating user." },
      { status: 500 }
    );
  }
}

type LoginProps = {
  email: string;
  password: string;
};

export async function loginUser({ email, password }: LoginProps) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      return NextResponse.json(
        { error: "Internal server error." },
        { status: 500 }
      );
    }

    const sessionTime = process.env.SESSION_TIME
      ? Number(process.env.SESSION_TIME)
      : 60 * 60;

    const token = jwt.sign(
      {
        userId: user.userId,
        email: user.email,
        name: user.name,
      },
      secretKey,
      { expiresIn: sessionTime }
    );

    return token;
  } catch (error: any) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}