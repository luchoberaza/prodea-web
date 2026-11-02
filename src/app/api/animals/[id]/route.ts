import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deleteAnimal } from "@/lib/animals";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (session?.value !== "authenticated") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const success = await deleteAnimal(id);
  if (!success) {
    return NextResponse.json(
      { error: "Animal no encontrado" },
      { status: 404 },
    );
  }
  return NextResponse.json({ success: true });
}
