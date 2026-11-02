import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAnimals, addAnimal } from "@/lib/animals";

export async function GET() {
  const animals = await getAnimals();
  return NextResponse.json(animals);
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (session?.value !== "authenticated") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await request.json();
  const animal = await addAnimal(body);
  return NextResponse.json(animal, { status: 201 });
}
