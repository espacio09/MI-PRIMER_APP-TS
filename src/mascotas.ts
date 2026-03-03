// ← lógica: registrar y listar mascotas


// src/mascotas.ts
import * as readline from "node:readline";
import { cargarDatos, guardarDatos } from "./storage.js";
import { Mascota } from "./modelos/RegistroMascotas.js";

function question(query: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(query, answer => { rl.close(); resolve(answer); }));
}

function normalizaTexto(s?: string | null): string {
  return (s ?? "").normalize("NFC").trim().replace(/\s+/g, " ");
}

function generarId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export async function registrarMascota(mascotas: Mascota[]): Promise<void> {
  console.log("\n--- Registrar nueva mascota ---");
  const nombre = normalizaTexto(await question("Nombre: "));
  const especie = normalizaTexto(await question("Especie (perro, gato, etc.): "));
  const duenio = normalizaTexto(await question("Nombre del dueño/a: "));

  let edad = 0;
  while (true) {
    const n = Number(normalizaTexto(await question("Edad (en años, número): ")));
    if (Number.isInteger(n) && n >= 0) { edad = n; break; }
    console.log("⚠ Introduce un número entero válido para la edad.");
  }

  const registro: Mascota = {
    id: generarId(),
    nombre, especie, edad, duenio,
    fecha_registro: new Date().toISOString()
  };

  mascotas.push(registro);
  guardarDatos(mascotas);
  console.log("\n✅ Mascota registrada correctamente.");
  await question("\nPulsa Enter para continuar...");
}

export async function listarMascotas(mascotas: Mascota[]): Promise<void> {
  console.log("\n--- Listado de mascotas ---");
  if (mascotas.length === 0) {
    console.log("No hay mascotas registradas todavía.");
    await question("\nPulsa Enter para continuar...");
    return;
  }

  const cols = ["#", "Nombre", "Especie", "Edad", "Dueño/a", "Registro"] as const;
  const filas = mascotas.map((m, i) => [
    String(i + 1),
    m.nombre ?? "",
    m.especie ?? "",
    String(m.edad ?? ""),
    m.duenio ?? "",
    m.fecha_registro ?? ""
  ]);

  const anchos = cols.map((c, idx) => Math.max(c.length, ...filas.map(f => f[idx].length)));
  const fmt = (arr: string[]) => arr.map((c, i) => c.padEnd(anchos[i], " ")).join(" | ");

  console.log(fmt([...cols]));
  console.log("-".repeat(anchos.reduce((a, b) => a + b, 0) + 3 * (cols.length - 1)));
  for (const fila of filas) console.log(fmt(fila));

  await question("\nPulsa Enter para continuar...");
}

export function cargarONuevo(): Mascota[] {
  return cargarDatos();
}
