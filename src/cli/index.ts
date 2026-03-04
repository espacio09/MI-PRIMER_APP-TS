// ← punto de entrada (main loop) -6) src/index.ts – bucle principal
// entrada del cli, interacción con el usuario, menú, etc.

// src/index.ts
import { menuInteractivo, OPC_LISTAR, OPC_REGISTRAR, OPC_SALIR } from "../menu.js";
import { cargarONuevo, listarMascotas, registrarMascota } from "../domain/mascotas.js";

async function main(): Promise<void> {
  const mascotas = cargarONuevo();

  while (true) {
    const opcion = await menuInteractivo();

    if (opcion === OPC_REGISTRAR) {
      await registrarMascota(mascotas);

    } else if (opcion === OPC_LISTAR) {
      await listarMascotas(mascotas);

    } else if (opcion === OPC_SALIR) {
      console.log("\nSaliendo del programa... ¡Hasta pronto! 👋");
      break;

    } else {
      console.log("\n⚠ Opción no válida. Intenta de nuevo.");
      await new Promise(r => setTimeout(r, 800));
    }
  }
}

main().catch(err => {
  console.error("Error inesperado:", err);
  process.exit(1);
});
