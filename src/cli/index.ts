// ← punto de entrada (main loop) -6) src/index.ts – bucle principal
// entrada del cli, interacción con el usuario, menú, etc.



// src/cli/index.ts

import readline from "readline";
import { mascotaService } from "../domain/mascotas";

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
        return preguntarNombre();
      }
      preguntarEspecie(nombre);
    });
  }

  function preguntarEspecie(nombre: string) {
    rl.question("Especie: ", especie => {
      if (!especie.trim()) {
        console.log("❌ La especie es obligatoria.\n");
        return preguntarEspecie(nombre);
      }
      preguntarRaza(nombre, especie);
    });
  }

  function preguntarRaza(nombre: string, especie: string) {
    rl.question("Raza: ", raza => {
      if (!raza.trim()) {
        console.log("❌ La raza es obligatoria.\n");
        return preguntarRaza(nombre, especie);
      }
      preguntarEdad(nombre, especie, raza);
    });
  }

  function preguntarEdad(nombre: string, especie: string, raza: string) {
    rl.question("Edad: ", edadInput => {
      const edad = edadInput.trim() === "" ? NaN : Number(edadInput);

      if (Number.isNaN(edad) || edad < 0) {
        console.log("❌ La edad debe ser mayor o igual a 0.\n");
        return preguntarEdad(nombre, especie, raza);
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
        return preguntarPropietario(nombre, especie, raza, edad);
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
        console.log("\n❌ Error al crear mascota:", error.message);
      }

      mostrarMenu();
    });
  }

  // Start
  preguntarNombre();
}

// ----------------------------
//   LISTAR MASCOTAS
// ----------------------------

function listarMascotasCLI() {
  const todas = mascotaService.listarMascotas();
  console.log("\n📋 Lista de mascotas registradas:\n");
  console.log(todas);
  mostrarMenu();
}



//----------------------------
//   BUSCAR MASCOTA POR NOMBRE
// ----------------------------

function buscarMascotaPorNombreCLI(): void {
  rl.question("Nombre a buscar: ", nombre => {
    if (!nombre.trim()) {
      console.log("❌ El nombre es obligatorio.\n");
      return buscarMascotaPorNombreCLI();
    }

    try {
      const mascota = mascotaService.buscarMascotaPorNombre(nombre);

      if (!mascota) {
        console.log(`\n🔍 No se encontró ninguna mascota con el nombre "${nombre}".`);
      } else {
        console.log("\n🔍 Mascota encontrada:\n");
        console.log(mascota);
      }
    } catch (error: any) {
      console.log("\n❌ Error al buscar mascota:", error.message);
    }

    mostrarMenu();
  });
}

// ----------------------------
//   MENU
// ----------------------------

function mostrarMenu() {
  console.log("\n🐾 MENU");
  console.log("1 - Crear mascota");
  console.log("2 - Listar mascotas");
  console.log("3 - Buscar mascota por nombre");
  console.log("0 - Salir");

  rl.question("\nElige una opción: ", opcion => {
    if (opcion === "1") return crearMascotaCLI();
    if (opcion === "2") return listarMascotasCLI();
    if (opcion === "3") return buscarMascotaPorNombreCLI();
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

/
