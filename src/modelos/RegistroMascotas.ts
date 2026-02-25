// src/modelos.ts
/* Usa los tipos definidos en tipos.ts para crear lógica del dominio del proyecto.
Ejemplo:

Registrar una mascota
Crear relaciones entre dueño y mascota
Funciones más “inteligentes”*/

import * as fs from "fs";   // ← AQUÍ

import { Mascota, Cuidado, TipoMascota } from '../tipos.js';
const TIPOS_VALIDOS: TipoMascota[] = ["perro", "gato", "hamster", "loro"];

export class RegistroMascotas {
  private mascotas: Mascota[] = [];
  private cuidados: Cuidado[] = [];
  private contadorId: number = 1;


  // Agrega una nueva mascota con validaciones al registro

  agregarMascota(nombre: string, tipo: TipoMascota, edad: number) {
   

 // VALIDACIONES
    if (!nombre || nombre.trim().length === 0) {
      throw new Error("El nombre no puede estar vacío.");
    }

    if (!TIPOS_VALIDOS.includes(tipo)) {
      throw new Error("El tipo de mascota no es válido.");
    }

    if (edad < 0) {
      throw new Error("La edad no puede ser negativa.");
    }

    // Si todo es válido, crea la nueva mascota y la agrega al registro
    const nueva: Mascota = {
      id: this.contadorId++,
      nombre,
      tipo,
      edad,
      vacunada: false
    };

    this.mascotas.push(nueva);
    return nueva;
  }

 
// Registrar cuidado con validaciones
  registrarCuidado(mascotaId: number, descripcion: string) {

    // VALIDACIONES
    const mascota = this.mascotas.find(m => m.id === mascotaId);
    if (!mascota) {
      throw new Error("No existe una mascota con ese ID.");
    }

    if (!descripcion || descripcion.trim().length === 0) {
      throw new Error("La descripción no puede estar vacía.");
    }

    const cuidado: Cuidado = {
      mascotaId,
      descripcion,
      fecha: new Date()
    };

    this.cuidados.push(cuidado);  // 1) Guarda el nuevo cuidado en el array interno        
    return cuidado;               // 2) Devuelve el mismo objeto que se acaba de guardar

  }
//Lista todas las mascotas registradas
  obtenerMascotas() {
    return this.mascotas;
  }
  

  //Obtener cuidados de una mascota por su ID
  obtenerCuidadosDe(mascotaId: number) {
    return this.cuidados.filter(c => c.mascotaId === mascotaId);
  }
}
