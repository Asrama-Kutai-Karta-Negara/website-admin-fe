'use server';

import { cookies } from "next/headers";
import { serialize } from "cookie";

const MAX_AGE = 60 * 60 * 24 * 30;

export async function getCookiesStore() {
  const cookieStore = await cookies();

  const token = cookieStore.get("TOKEN_AUTH");

  if (!token) {
    return null;
  }
  return token.value;
}

export async function postCookiesStore(token: string) {
  const serialized = serialize("TOKEN_AUTH", token, {
    httpOnly: true,
    secure: process.env.NEXT_NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });

  return new Response("", {
    status: 200,
    headers: { "Set-Cookie": serialized },
  });
}

export async function deleteCookiesStore() {
  const serialized = serialize("TOKEN_AUTH", "", {
    httpOnly: true,
    secure: process.env.NEXT_NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });

  return new Response("", {
    status: 200,
    headers: { "Set-Cookie": serialized },
  });
}

export async function getCookiesStoreUserName() {
  const cookieStore = await cookies();

  const username = cookieStore.get("USER_NAME");

  if (!username) {
    return "User Name";
  }
  return username.value;
}

export async function getCookiesStoreEmail() {
  const cookieStore = await cookies();

  const email = cookieStore.get("USER_EMAIL");

  if (!email) {
    return "email@gmail.com";
  }
  return email.value;
}

export async function getCookiesStoreRole() {
  const cookieStore = await cookies();

  const email = cookieStore.get("USER_ROLE");

  if (!email) {
    return "email@gmail.com";
  }
  return email.value;
}