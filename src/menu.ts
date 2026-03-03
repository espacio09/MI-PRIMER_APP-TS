//  ← pinta el menú y recoge la opción


// src/menu.ts
import * as readline from "node:readline";

export const OPC_REGISTRAR = "REGISTRAR";
export const OPC_LISTAR = "LISTAR";
export const OPC_SALIR = "SALIR";

function question(query: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(query, answer => { rl.close(); resolve(answer); }));
}

export async function menuInteractivo(): Promise<string> {
  console.clear();
  console.log("=======================================");
  console.log("   🐾  Registro de Mascotas  🐾");
  console.log("=======================================");
  console.log("1) 🐶 Registrar nueva mascota");
  console.log("2) 📋 Listar mascotas");
  console.log("0) ❌ Salir");
  console.log("---------------------------------------");

  const ans = (await question("Elige una opción (0-2): "))
  .normalize("NFC")
  .trim();

  const mapa: Record<string, string> = { 
    "1": OPC_REGISTRAR, 
    "2": OPC_LISTAR, 
    "0": OPC_SALIR };
  return mapa[ans] ?? "";
}
