// ← punto de entrada (main loop) -6) src/index.ts – bucle principal
// entrada del cli, interacción con el usuario, menú, etc.


// src/cli/index.ts

import readline from "readline";
import { mascotaService } from "../domain/mascota";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ----------------------------
//   CREAR MASCOTA
// ----------------------------

function crearMascotaCLI() {
  
 function preguntarNombre() {
    rl.question("Nombre: ", nombre => {

      if (!nombre.trim()) {
        console.log("❌ El nombre es obligatorio.\n");
        return preguntarNombre();  // <- repetir la pregunta
      }

 preguntarEspecie(nombre);
    });
  }


  function preguntarEspecie(nombre: string) {
    rl.question("Especie: ", especie => {

      if (!especie.trim()) {
        console.log("❌ La especie es obligatoria.\n");
        return preguntarEspecie(nombre); // repetir
      }

     
 function preguntarRaza(nombre: string, especie: string) {
    rl.question("Raza: ", raza => {

      if (!raza.trim()) {
        console.log("❌ La raza es obligatoria.\n");
        return preguntarRaza(nombre, especie); // repetir
      }

      preguntarEdad(nombre, especie, raza);
    });
  }

  function preguntarEdad(nombre: string, especie: string, raza: string) {
    rl.question("Edad: ", edadInput => {
      const edad = edadInput.trim() === "" ? NaN : Number(edadInput);

      if (Number.isNaN(edad) || edad < 0) {
        console.log("❌ La edad debe ser mayor o igual a 0.\n");
        return preguntarEdad(nombre, especie, raza);  // repetir
      }

      preguntarPropietario(nombre, especie, raza, edad);
    });
  }

  function preguntarPropietario(
    nombre: string,
    especie: string,
    raza: string,
    edad: number
  ) {
    rl.question("Propietario: ", proprietario => {

      if (!proprietario.trim()) {
        console.log("❌ El propietario es obligatorio.\n");
        return preguntarPropietario(nombre, especie, raza, edad);  // repetir
      }

      try {
        const mascota = mascotaService.crearMascota(
          nombre,
          especie,
          raza,
          edad,
          proprietario
        );

        console.log("\n🐶 Mascota creada con éxito:\n");
        console.log(mascota);
      } catch (error: any) {
        console.log("❌ Error al crear mascota:", error.message);
      }
      mostrarMenu();
    });
  }

  // arrancamos preguntando por nombre
  preguntarNombre();
}
      )  };
    }
    

mostrarMenu();
    rl.on("close", () => {
      console.log("\n👋 ¡Hasta luego!");
      process.exit(0);
  });



// ----------------------------
//   LISTAR MASCOTAS
// ----------------------------
function listarMascotasCLI() {
  const todas = mascotaService.listarMascotas();
  console.log("\n📋 Lista de mascotas registradas:\n");
  console.log(todas);
  mostrarMenu();
}

  

// ----------------------------
//   MENU
// ----------------------------
function mostrarMenu() {
  console.log("\n🐾 MENU");
  console.log("1 - Crear mascota");
  console.log("2 - Listar mascotas");
  console.log("0 - Salir");

  rl.question("\nElige una opción: ", opcion => {
    if (opcion === "1") return crearMascotaCLI();
    if (opcion === "2") return listarMascotasCLI();
    if (opcion === "0") return rl.close();

    console.log("❌ Opción no válida.");
    mostrarMenu();
  });
}

// ----------------------------
//   CLI CLOSE EVENT
// ----------------------------
rl.on("close", () => {
  console.log("\n👋 ¡Hasta luego!");
  process.exit(0);
});

// ----------------------------
//   ARRANCAR
// ----------------------------
mostrarMenu();
