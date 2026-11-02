import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "prodea2024";

export async function POST(request: Request) {
  const { password } = await request.json();

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Contraseña incorrecta" },
      { status: 401 },
    );
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_session", "authenticated", {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return NextResponse.json({ success: true });
}
