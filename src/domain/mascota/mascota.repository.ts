// <-- interfaz + implementación


import fs from "fs";
import path from "path";
import { Mascota } from "./mascota.model";

const dataFile = path.join(__dirname, "../../datos/mascotas.json");
const DB_PATH = "./mascotas.json";

export interface MascotaRepository {
  save(mascota: Mascota): Mascota;
  findAll(): Mascota[];
}

export class FileMascotaRepository implements MascotaRepository {

  private leerBD(): Mascota[] {
    if (!fs.existsSync(DB_PATH)) return [];
    const data = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(data) as Mascota[];
  }

  private guardarBD(mascotas: Mascota[]) {
    fs.writeFileSync(DB_PATH, JSON.stringify(mascotas, null, 2));
  }

  save(mascota: Mascota): Mascota {
    const mascotas = this.leerBD();
    mascotas.push(mascota);
    this.guardarBD(mascotas);
    return mascota;
  }

  findAll(): Mascota[] {
    return this.leerBD();
  }
}
