import fs from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src", "data", "animals.json");

export interface Animal {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  description: string;
  image: string;
  status: string;
  createdAt: string;
}

export async function getAnimals(): Promise<Animal[]> {
  try {
    const data = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function addAnimal(
  animal: Omit<Animal, "id" | "createdAt">,
): Promise<Animal> {
  const animals = await getAnimals();
  const newAnimal: Animal = {
    ...animal,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString().split("T")[0],
  };
  animals.push(newAnimal);
  await fs.writeFile(DATA_PATH, JSON.stringify(animals, null, 2));
  return newAnimal;
}

export async function deleteAnimal(id: string): Promise<boolean> {
  const animals = await getAnimals();
  const filtered = animals.filter((a) => a.id !== id);
  if (filtered.length === animals.length) return false;
  await fs.writeFile(DATA_PATH, JSON.stringify(filtered, null, 2));
  return true;
}

export function getDailyAnimals(animals: Animal[], count = 6): Animal[] {
  const available = animals.filter((a) => a.status === "Disponible");
  if (available.length <= count) return available;

  const today = new Date().toISOString().split("T")[0];
  let seed = 0;
  for (let i = 0; i < today.length; i++) {
    seed = ((seed << 5) - seed + today.charCodeAt(i)) | 0;
  }

  const shuffled = [...available];
  for (let i = shuffled.length - 1; i > 0; i--) {
    seed = ((seed * 1103515245 + 12345) & 0x7fffffff) >>> 0;
    const j = seed % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}

export function getAnimalEmoji(species: string): string {
  const map: Record<string, string> = {
    Perro: "🐕",
    Gato: "🐱",
    Conejo: "🐰",
    Ave: "🐦",
    Tortuga: "🐢",
    Hamster: "🐹",
  };
  return map[species] || "🐾";
}

export function getAnimalGradient(species: string): string {
  const map: Record<string, string> = {
    Perro: "from-sage/20 via-sage-light/20 to-sage/10",
    Gato: "from-coral/20 via-blush to-coral/10",
    Conejo: "from-amber/15 via-blush to-amber-light/15",
    Ave: "from-sage-light/20 via-cream-dark to-amber/10",
  };
  return map[species] || "from-blush to-cream-dark";
}
