
// src/cli/handlers/handleBuscar.ts
import chalk from "chalk";
import { buscarMascotas } from "../../services/buscar";

export async function handleBuscar(rawTerm?: string) {
  const term = (rawTerm ?? "").trim();

  // 1) Si no hay término → ayuda breve + ejemplo
  if (!term) {
    console.log(chalk.yellow("Uso:"));
    console.log("  mascotas buscar <término>");
    console.log("\nEjemplos:");
    console.log(chalk.cyan("  mascotas buscar luna"));
    console.log(chalk.cyan("  mascotas buscar beagle"));
    console.log(chalk.cyan("  mascotas buscar 123")); // ID
    console.log("\nSugerencia:");
    console.log("- Usa nombre, raza, propietario o parte del ID.");
    return;
  }

  // 2) Ejecutar búsqueda
  const resultados = await buscarMascotas(term);

  // 3) Si no hay resultados → mensaje en amarillo
  if (!resultados || resultados.length === 0) {
    console.log(
      chalk.yellow(`No se encontraron mascotas que coincidan con “${term}”.`)
    );
    console.log("Prueba con otro término o sé menos específico.");
    return;
  }

  // 4) Mostrar resultados
  console.log(chalk.green(`✔ ${resultados.length} resultado(s) para “${term}”:`));
  for (const m of resultados) {
    // Ajusta los campos según tu modelo
    console.log(
      `• ${chalk.bold(m.nombre)} ` +
      chalk.gray(`(id: ${m.id}${m.raza ? `, raza: ${m.raza}` : ""})`) +
      (m.propietario ? ` — propietario: ${m.propietario}` : "")
    );
  }
}
