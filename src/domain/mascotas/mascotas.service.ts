// <-- lógica de buscar


import { Mascota } from "./mascota.model";
import { MascotaRepository } from "./mascotas.repository";
import { randomUUID } from "crypto";

export class MascotaService {
  constructor(private repository: MascotaRepository) {}

  crearMascota(
    nombre: string,
    especie: string,
    raza: string,
    edad: number,
    //vacunas: string,
    proprietario: string
  ): Mascota {


    // Validaciones básicas
    
if (!nombre || nombre.trim() === "") {
      throw new Error("El nombre es obligatorio.");
    }

    if (!especie || especie.trim() === "") {
      throw new Error("La especie es obligatoria.");
    }

    if (!raza || raza.trim() === "") {
      throw new Error("La raza es obligatoria.");
    }

    if (Number.isNaN(edad) || edad < 0) {
      throw new Error("La edad debe ser un número mayor o igual a 0.");
    }

    if (!proprietario || proprietario.trim() === "") {
      throw new Error("El propietario es obligatorio.");
    }

    // ✔️ Construcción segura de la mascota
   const nueva: Mascota = {
      id: randomUUID(),
      nombre,
      especie,
      raza,
      edad,
      proprietario,
      //vacunas: vacunas.split(",").map(v => v.trim()),
      fecha_registro: new Date().toISOString()
    };

    return this.repository.save(nueva);
  }

    
  listarMascotas(): Mascota[] {
    return this.repository.findAll();
  }
}


  buscarMascotaPorNombre(nombre: string): Mascota | null {
  if (!nombre || nombre.trim() === "") {
    throw new Error("El nombre es obligatorio para buscar.");
  }

  const result = this.repository.findByName(nombre);
  return result ?? null;
}



////////////////////////////////////

@Injectable()
export class MascotasService {
  constructor(
    @InjectRepository(Mascota)
    private readonly mascotaRepo: Repository<Mascota>,
  ) {}

  create(dto: CreateMascotaDto) {
    const mascota = this.mascotaRepo.create(dto);
    return this.mascotaRepo.save(mascota);
  }

  update(id: number, dto: UpdateMascotaDto) {
    return this.mascotaRepo.update(id, dto);
  }
}
