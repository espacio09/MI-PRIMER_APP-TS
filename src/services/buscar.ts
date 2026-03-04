// lógica de "buscar" (por término o criterios)
// src/services/buscar.ts

import type { Mascota } from "../domain/mascotas.js";
import { repo } from "../data/repo.js";

/*

import type { Mascota } from "../domain/mascotas.js";
import { repo } from "../data/repo.js";

export async function buscarMascotas(termino: string): 
Promise<Mascota[]> {
  
    const t = termino.trim().toLowerCase();
  if (!t) return [];
 
  const mascotas = await repo.getAll();
  return mascotas.filter((m) =>

    (m.id && m.id.toLowerCase().includes(t)) ||
    (m.nombre && m.nombre.toLowerCase().includes(t)) ||
    (m.especie && m.especie.toLowerCase().includes(t)) ||
    (m.raza && m.raza.toLowerCase().includes(t)) ||
    (m.edad && m.edad.toString().toLowerCase().includes(t)) ||
    (m.fecha_registro && m.fecha_registro.toLowerCase().includes(t))
  );
}
*/


// src/services/buscar.ts (opcional)
export interface CriteriosBusqueda {
  id?: string;
  nombre?: string;
  raza?: string;
  proprietario?: string;
  rangoEdad?: { min?: number; max?: number };
}

export async function buscarPorCriterios(c: CriteriosBusqueda): Promise<Mascota[]> {
  const mascotas = (await repo.getAll()) as Mascota[];

  return mascotas.filter((m: Mascota) => {
    if (c.id && m.id !== c.id) return false;
    if (c.nombre && !m.nombre?.toLowerCase().includes(c.nombre.toLowerCase())) return false;
    if (c.raza && !m.raza?.toLowerCase().includes(c.raza.toLowerCase())) return false;
    if (c.proprietario && !m.proprietario?.toLowerCase().includes(c.proprietario.toLowerCase())) return false;
    if (c.rangoEdad) {
      const e = m.edad ?? Number.POSITIVE_INFINITY;
      if (c.rangoEdad.min != null && e < c.rangoEdad.min) return false;
      if (c.rangoEdad.max != null && e > c.rangoEdad.max) return false;
    }
    return true;
  });
}

