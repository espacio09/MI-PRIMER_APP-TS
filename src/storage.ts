// ← lectura/escritura JSON


// src/storage.ts

import fs from "fs";
import path from "path";

const basePath = path.join(__dirname, "../datos");

export function leerArchivo(nombre: string) {
  const ruta = path.join(basePath, nombre);

  if (!fs.existsSync(ruta)) return null;

  const data = fs.readFileSync(ruta, "utf-8");
  return JSON.parse(data);
}

export function guardarArchivo(nombre: string, contenido: any) {
  const ruta = path.join(basePath, nombre);
  fs.writeFileSync(ruta, JSON.stringify(contenido, null, 2), "utf-8");
}
