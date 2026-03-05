// <-- lógica de buscar


import { Mascota } from "./mascota.model";
import { MascotaRepository } from "./mascota.repository";
import { randomUUID } from "crypto";

export class MascotaService {
  constructor(private repository: MascotaRepository) {}

  crearMascota(
    nombre: string,
    especie: string,
    raza: string,
    edad: number,
    proprietario: string
  ): Mascota {

    const nueva: Mascota = {
      id: randomUUID(),
      nombre,
      especie,
      raza,
      edad,
      proprietario,
      fecha_registro: new Date().toISOString()
    };

    return this.repository.save(nueva);
  }

  listarMascotas(): Mascota[] {
    return this.repository.findAll();
  }
}
