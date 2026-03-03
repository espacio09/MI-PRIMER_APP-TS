


// src/modelos/RegistroMascotas.ts
export interface Mascota {
  id: string;
  nombre: string;
  especie: string;
  edad: number;
  duenio: string;
  fecha_registro: string; // ISO
}
