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
