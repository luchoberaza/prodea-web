import { NextResponse } from "next/server";
import { getAnimals, getDailyAnimals } from "@/lib/animals";

export const dynamic = "force-dynamic";

export async function GET() {
  const animals = await getAnimals();
  const daily = getDailyAnimals(animals, 6);
  return NextResponse.json(daily);
}
