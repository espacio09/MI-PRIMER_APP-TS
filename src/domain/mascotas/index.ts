// <-- exportar todo fácilmente


import { FileMascotaRepository } from "./mascotas.repository";
import { MascotaService } from "./mascotas.service";

const repository = new FileMascotaRepository();
export const mascotaService = new MascotaService(repository);
