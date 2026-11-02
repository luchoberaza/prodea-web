"use client";

import { useState, useEffect, useCallback } from "react";
import { Trash2, Plus, LogOut, Upload, AlertTriangle, X } from "lucide-react";

interface Animal {
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

const EMPTY_FORM = {
  name: "",
  species: "Perro",
  breed: "",
  age: "",
  description: "",
  status: "Disponible",
};

export default function AdminPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Animal | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadAnimals = useCallback(async () => {
    const res = await fetch("/api/animals");
    setAnimals(await res.json());
  }, []);

  useEffect(() => {
    fetch("/api/admin/check")
      .then((r) => r.json())
      .then((d) => {
        setIsAuth(d.authenticated);
        setLoading(false);
        if (d.authenticated) loadAnimals();
      });
  }, [loadAnimals]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setIsAuth(true);
      loadAnimals();
    } else {
      setError("Contraseña incorrecta");
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    let imageUrl = "";
    if (imageFile) {
      const fd = new FormData();
      fd.append("file", imageFile);
      const upRes = await fetch("/api/upload", { method: "POST", body: fd });
      const upData = await upRes.json();
      imageUrl = upData.url || "";
    }

    await fetch("/api/animals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, image: imageUrl }),
    });

    setForm(EMPTY_FORM);
    setImageFile(null);
    const fileInput = document.getElementById("image-input") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
    setSubmitting(false);
    loadAnimals();
  };

  const handleDelete = (animal: Animal) => {
    setDeleteTarget(animal);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    await fetch(`/api/animals/${deleteTarget.id}`, { method: "DELETE" });
    setDeleting(false);
    setDeleteTarget(null);
    loadAnimals();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFF8F0]">
        <p className="text-[#8C8380]">Cargando...</p>
      </div>
    );
  }

  if (!isAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFF8F0] px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-xl"
        >
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E8725C]">
              <svg viewBox="0 0 200 200" className="h-5 w-5 text-[#FFF8F0]" fill="currentColor">
                <ellipse cx="100" cy="130" rx="40" ry="32" />
                <circle cx="60" cy="80" r="18" />
                <circle cx="100" cy="60" r="18" />
                <circle cx="140" cy="80" r="18" />
              </svg>
            </div>
            <span className="text-xl font-bold text-[#2D2926]">PRODEA Admin</span>
          </div>
          <label className="mb-2 block text-sm font-semibold text-[#2D2926]">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa la contraseña"
            className="mb-4 w-full rounded-2xl border border-[#2D2926]/10 bg-[#FFF8F0]/50 px-5 py-3.5 text-[#2D2926] focus:border-[#E8725C]/30 focus:outline-none focus:ring-2 focus:ring-[#E8725C]/30"
          />
          {error && (
            <p className="mb-4 text-sm text-[#E8725C]">{error}</p>
          )}
          <button
            type="submit"
            className="w-full rounded-2xl bg-[#E8725C] px-6 py-3.5 font-semibold text-[#FFF8F0] transition-colors hover:bg-[#C85A46]"
          >
            Ingresar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <header className="border-b border-[#2D2926]/5 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E8725C]">
              <svg viewBox="0 0 200 200" className="h-4 w-4 text-[#FFF8F0]" fill="currentColor">
                <ellipse cx="100" cy="130" rx="40" ry="32" />
                <circle cx="60" cy="80" r="18" />
                <circle cx="100" cy="60" r="18" />
                <circle cx="140" cy="80" r="18" />
              </svg>
            </div>
            <span className="font-bold text-[#2D2926]">Panel Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-sm text-[#8C8380] hover:text-[#E8725C]">
              Ver sitio
            </a>
            <button
              onClick={() => {
                document.cookie = "admin_session=; max-age=0; path=/";
                setIsAuth(false);
              }}
              className="flex items-center gap-1 text-sm text-[#8C8380] hover:text-[#E8725C]"
            >
              <LogOut className="h-4 w-4" /> Salir
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Add form */}
        <div className="mb-10 rounded-3xl bg-white p-8 shadow-lg shadow-[#2D2926]/5">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-[#2D2926]">
            <Plus className="h-5 w-5 text-[#7BA68C]" />
            Agregar Nuevo Residente
          </h2>
          <form onSubmit={handleAdd}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-semibold text-[#2D2926]">Nombre *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ej: Luna"
                  className="w-full rounded-xl border border-[#2D2926]/10 bg-[#FFF8F0]/50 px-4 py-3 text-sm focus:border-[#E8725C]/30 focus:outline-none focus:ring-2 focus:ring-[#E8725C]/30"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-[#2D2926]">Especie *</label>
                <select
                  value={form.species}
                  onChange={(e) => setForm({ ...form, species: e.target.value })}
                  className="w-full rounded-xl border border-[#2D2926]/10 bg-[#FFF8F0]/50 px-4 py-3 text-sm focus:border-[#E8725C]/30 focus:outline-none focus:ring-2 focus:ring-[#E8725C]/30"
                >
                  <option>Perro</option>
                  <option>Gato</option>
                  <option>Conejo</option>
                  <option>Ave</option>
                  <option>Tortuga</option>
                  <option>Hamster</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-[#2D2926]">Raza</label>
                <input
                  value={form.breed}
                  onChange={(e) => setForm({ ...form, breed: e.target.value })}
                  placeholder="Ej: Mestizo"
                  className="w-full rounded-xl border border-[#2D2926]/10 bg-[#FFF8F0]/50 px-4 py-3 text-sm focus:border-[#E8725C]/30 focus:outline-none focus:ring-2 focus:ring-[#E8725C]/30"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-[#2D2926]">Edad *</label>
                <input
                  required
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                  placeholder="Ej: 2 años"
                  className="w-full rounded-xl border border-[#2D2926]/10 bg-[#FFF8F0]/50 px-4 py-3 text-sm focus:border-[#E8725C]/30 focus:outline-none focus:ring-2 focus:ring-[#E8725C]/30"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-[#2D2926]">Estado</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full rounded-xl border border-[#2D2926]/10 bg-[#FFF8F0]/50 px-4 py-3 text-sm focus:border-[#E8725C]/30 focus:outline-none focus:ring-2 focus:ring-[#E8725C]/30"
                >
                  <option>Disponible</option>
                  <option>En tratamiento</option>
                  <option>En proceso</option>
                  <option>Adoptado</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-[#2D2926]">
                  <Upload className="mr-1 inline h-3.5 w-3.5" /> Foto
                </label>
                <input
                  id="image-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full rounded-xl border border-[#2D2926]/10 bg-[#FFF8F0]/50 px-4 py-2.5 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[#E8725C]/10 file:px-3 file:py-1 file:text-sm file:font-semibold file:text-[#E8725C]"
                />
              </div>
            </div>
            <div className="mt-5">
              <label className="mb-1 block text-sm font-semibold text-[#2D2926]">Descripción *</label>
              <textarea
                required
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Breve descripción del animal..."
                className="w-full resize-none rounded-xl border border-[#2D2926]/10 bg-[#FFF8F0]/50 px-4 py-3 text-sm focus:border-[#E8725C]/30 focus:outline-none focus:ring-2 focus:ring-[#E8725C]/30"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#7BA68C] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#3D5A47] disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
              {submitting ? "Guardando..." : "Agregar Residente"}
            </button>
          </form>
        </div>

        {/* Animals list */}
        <h2 className="mb-4 text-xl font-bold text-[#2D2926]">
          Residentes Actuales ({animals.length})
        </h2>
        {animals.length === 0 ? (
          <p className="py-12 text-center text-[#8C8380]">
            No hay animales registrados aún.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {animals.map((a) => (
              <div
                key={a.id}
                className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-md shadow-[#2D2926]/5"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#FFE4DE]">
                  {a.image ? (
                    <img
                      src={a.image}
                      alt={a.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl">
                      {a.species === "Perro" ? "🐕" : a.species === "Gato" ? "🐱" : a.species === "Conejo" ? "🐰" : "🐾"}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-[#2D2926]">{a.name}</p>
                      <p className="text-xs text-[#8C8380]">
                        {a.species} · {a.breed} · {a.age}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(a)}
                      className="shrink-0 rounded-lg p-1.5 text-[#8C8380] transition-colors hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-[#8C8380]">
                    {a.description}
                  </p>
                  <span
                    className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      a.status === "Disponible"
                        ? "bg-[#7BA68C]/10 text-[#7BA68C]"
                        : a.status === "Adoptado"
                          ? "bg-[#E8725C]/10 text-[#E8725C]"
                          : "bg-[#F2A65A]/10 text-[#F2A65A]"
                    }`}
                  >
                    {a.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal de confirmación personalizado */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-[#2D2926]/50 backdrop-blur-sm"
            onClick={() => !deleting && setDeleteTarget(null)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-md animate-[modalIn_0.2s_ease-out] rounded-3xl bg-white p-8 shadow-2xl">
            {/* Close button */}
            <button
              onClick={() => !deleting && setDeleteTarget(null)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-[#8C8380] transition-colors hover:bg-[#FFF8F0] hover:text-[#2D2926]"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Icon */}
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>

            {/* Content */}
            <div className="mb-6 text-center">
              <h3 className="mb-2 text-xl font-bold text-[#2D2926]">
                Eliminar residente
              </h3>
              <p className="text-[#8C8380]">
                ¿Estás seguro de que quieres eliminar a{" "}
                <strong className="text-[#2D2926]">{deleteTarget.name}</strong> del
                catálogo? Esta acción no se puede deshacer.
              </p>
            </div>

            {/* Animal preview */}
            <div className="mb-6 flex items-center gap-3 rounded-2xl bg-[#FFF8F0] p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#FFE4DE]">
                {deleteTarget.image ? (
                  <img
                    src={deleteTarget.image}
                    alt={deleteTarget.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-xl">
                    {deleteTarget.species === "Perro"
                      ? "🐕"
                      : deleteTarget.species === "Gato"
                        ? "🐱"
                        : deleteTarget.species === "Conejo"
                          ? "🐰"
                          : "🐾"}
                  </span>
                )}
              </div>
              <div>
                <p className="font-semibold text-[#2D2926]">{deleteTarget.name}</p>
                <p className="text-xs text-[#8C8380]">
                  {deleteTarget.species} · {deleteTarget.breed} · {deleteTarget.age}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="flex-1 rounded-2xl border border-[#2D2926]/10 px-5 py-3 font-semibold text-[#2D2926] transition-colors hover:bg-[#F5EDE3] disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-red-500 px-5 py-3 font-semibold text-white transition-colors hover:bg-red-600 disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
                {deleting ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
