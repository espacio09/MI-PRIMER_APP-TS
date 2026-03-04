// ← punto de entrada (main loop) -6) src/index.ts – bucle principal
// entrada del cli, interacción con el usuario, menú, etc.


// src/cli/index.ts
import { handleBuscar } from "./handlers/handleBuscar.js";

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);

  if (cmd === "buscar") {
    const term = rest.join(" "); // soporta multi-palabras: "luna beagle"
    await handleBuscar(term);
    return;
  }

  console.log("Comandos disponibles:");
  console.log("  mascotas buscar <término>");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

