// ← punto de entrada (main loop) -6) src/index.ts – bucle principal
// entrada del cli, interacción con el usuario, menú, etc.


// src/cli/index.ts

import readline from "readline";
import { mascotaService } from "../domain/mascota";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

function crearMascotaCLI() {
  rl.question("Nombre: ", nombre => {
    rl.question("Especie: ", especie => {
      rl.question("Raza: ", raza => {
        rl.question("Edad: ", edadInput => {
          rl.question("Propietario: ", proprietario => {
            
            const edad = Number(edadInput);
            const mascota = mascotaService.crearMascota(
              nombre,
              especie,
              raza,
              edad,
              proprietario
            );

            console.log("\n🐶 Mascota creada con éxito:\n", mascota);
            mostrarMenu();
          });
        });
      });
    });
  });
}

function listarMascotasCLI() {
  const todas = mascotaService.listarMascotas();
  console.log("\n📋 Lista de mascotas registradas:\n", todas);
  mostrarMenu();
}

mostrarMenu();

