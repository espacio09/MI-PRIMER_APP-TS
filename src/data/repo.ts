// acceso a datos (leer/escribir JSON/DB)


import fs from "fs/promises";
import path from "path";
const dataFile = path.join(__dirname, "../../datos/mascotas.json");


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