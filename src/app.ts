// nuevo codigo para registrar mascotas y cuidados


import { RegistroMascotas } from "./modelos/RegistroMascotas";

const registro = new RegistroMascotas();


// Función auxiliar para manejar errores de forma bonita
function ejecutarConManejo(accion: () => void) {
  try {
    accion();
  } catch (err: any) {
    console.error("❌ Error:", err.message);
  }
}


//  Ejemplo de uso


// ---------------- EJEMPLOS ----------------

// 1. Crear mascotas válidas
ejecutarConManejo(() => {
  const m1 = registro.agregarMascota("Luna", "gato", 1);
  console.log("✔ Mascota agregada:", m1);
});

ejecutarConManejo(() => {
  const m2 = registro.agregarMascota("Minnie Mouse", "perra", 3);
  console.log("✔ Mascota agregada:", m2);
});




// 2. Probar errores
ejecutarConManejo(() => {
  registro.agregarMascota("", "hamster", 11); // nombre vacío
});

ejecutarConManejo(() => {
  registro.agregarMascota("Bobby", "tigre" as any, 3); // tipo inválido
});

ejecutarConManejo(() => {
  registro.agregarMascota("Mini", "hamster", -1); // edad negativa
});

// 3. Registrar cuidados válidos
ejecutarConManejo(() => {
  registro.registrarCuidado(1, "Vacunación anual");
  console.log("✔ Cuidado registrado para mascota 1");
});

// 4. Probar error de cuidado con ID inexistente
ejecutarConManejo(() => {
  registro.registrarCuidado(999, "Baño general"); // ID no existe
});

// 5. Ver resultados finales
console.log("\n📋 Mascotas registradas:");
console.log(registro.obtenerMascotas());

console.log("\n📋 Cuidados de Luna (ID 1):");
console.log(registro.obtenerCuidadosDe(1));




//  codigo para registrar mascotas y cuidados sin manejo de errores (solo para mostrar funcionalidad básica)

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
