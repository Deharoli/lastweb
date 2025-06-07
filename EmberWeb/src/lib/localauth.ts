import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { createSession } from "./session";

const prisma = new PrismaClient();

export async function register(formData: FormData) {
  'use server'

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  if (!email || !password || !firstName || !lastName) {
    return { error: "All fields are required" };
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: "User already exists with that email" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    },
  });

  //NE PAS faire createSession ici
  return {
    email: user.email,
    firstName,
    lastName
  };
}


export async function login(formData: FormData) {
  'use server'
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { error: "Invalid email or password" };
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return { error: "Invalid email or password" };
  }

  // Découpe le nom pour slugifier
  const [firstName, ...rest] = user.name.split(" ");
  const lastName = rest.join(" ");
  return {
    email: user.email,
    firstName,
    lastName
  };
}