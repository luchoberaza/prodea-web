import { NextResponse } from "next/server";
import { getAnimals } from "@/lib/animals";

export const dynamic = "force-dynamic";

export async function GET() {
  const animals = await getAnimals();
  const adopted = animals.filter((a) => a.status === "Adoptado");
  return NextResponse.json(adopted);
}
