// src/services/listar.ts


import type { Mascota } from "../domain/mascotas.js";
import repo from "../data/repo.js";


export async function listarMascotas(): 
Promise<Mascota[]> {
  return (await repo.getAll()) as Mascota[];
}   
