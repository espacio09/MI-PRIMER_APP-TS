//tipos.ts
/* Contiene definiciones de tipos, interfaces, enums, alias…
No hace “acciones”. Solo describe cómo son las cosas.
Ejemplo:

Cómo es una Mascota
Tipos auxiliares: Especie, Vacuna, Duenio
Funciones simples para crear objetos base */

//Excurso: tipos en TypeScript (primitivos, objetos, uniones, genéricos, etc.)


export type TipoMascota = "perro" | "perra" | "gato" | "hamster" | "loro";
export type Sexo = "macho" | "hembra";


export type Mascota = {
  id: number;
  nombre: string;
  tipo: TipoMascota;
  edad: number;
  sexo?: Sexo;          // opcional
  vacunada: boolean;
};


export interface Cuidado {
  mascotaId: number;
  descripcion: string;
  fecha: Date;
}

