// acceso a datos (leer/escribir JSON/DB)
import fs from "fs/promises";
import { fileURLToPath } from "url";

const dataFile = fileURLToPath(new URL("../../datos/mascotas.json", import.meta.url));

export const repo = {
	async getAll(): Promise<unknown[]> {
		const raw = await fs.readFile(dataFile, "utf8");
		try {
			return JSON.parse(raw) as unknown[];
		} catch (e) {
			return [];
		}
	},

	async saveAll(items: unknown[]): Promise<void> {
		await fs.writeFile(dataFile, JSON.stringify(items, null, 2), "utf8");
	},
};

export default repo;