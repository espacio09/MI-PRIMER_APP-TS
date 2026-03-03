// ← lectura/escritura JSON


// src/storage.ts
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Mascota } from "./modelos/RegistroMascotas.js";

// Compatibilidad ESM para obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_DIR = join(__dirname, "..", "datos");
const DATA_FILE = join(DATA_DIR, "mascotas.json");

function asegurarDirectorio(): void {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function cargarDatos(): Mascota[] {
  asegurarDirectorio();

  if (!existsSync(DATA_FILE)) {
    return [];
  }

  try {
    const raw = readFileSync(DATA_FILE, "utf8");
    if (!raw.trim()) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function guardarDatos(mascotas: Mascota[]): void {
  asegurarDirectorio();

  const json = JSON.stringify(mascotas, null, 2);
  writeFileSync(DATA_FILE, json, "utf8");
}
