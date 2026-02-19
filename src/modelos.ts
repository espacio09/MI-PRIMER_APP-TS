// src/modelos.ts
/* Usa los tipos definidos en tipos.ts para crear lógica del dominio del proyecto.
Ejemplo:

Registrar una mascota
Crear relaciones entre dueño y mascota
Funciones más “inteligentes”*/


import { Mascota, Duenio, Especie, crearMascotaBase } from './tipos.js';

export function registrarMascotaInicial(duenio: Duenio, nombre: string, especie: Especie) {
  const m = crearMascotaBase(nombre, especie);
  return { duenio, mascota: m };
}
