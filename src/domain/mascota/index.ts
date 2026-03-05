// <-- exportar todo fácilmente


import { FileMascotaRepository } from "./mascota.repository";
import { MascotaService } from "./mascota.service";

const repository = new FileMascotaRepository();
export const mascotaService = new MascotaService(repository);
