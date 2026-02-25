import { RegistroMascota } from "./modelos";
import { Mascota } from "./modelos/Mascota";


const minnie = new Mascota("Minnie Mouse", 7, "Zwergspitz", true, "juguetona");

console.log("Información de Minnie:");
console.log(minnie);



// nuevo codigo para registrar mascotas y cuidados


import { RegistroMascotas } from "./modelos/RegistroMascotas.js";

const registro = new RegistroMascotas();

// Agregamos mascotas
const m1 = registro.agregarMascota("Luna", "gato", 3);
const m2 = registro.agregarMascota("Toby", "perro", 5);

// Registramos cuidados
registro.registrarCuidado(m1.id, "Vacunación anual");
registro.registrarCuidado(m2.id, "Baño y corte de uñas");

// Mostrar resultados
console.log("Mascotas registradas:");
console.log(registro.obtenerMascotas());

console.log("\nCuidados de Luna:");
console.log(registro.obtenerCuidadosDe(m1.id));
