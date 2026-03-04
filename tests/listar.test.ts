
import { describe, it, expect, vi, beforeEach } from "vitest";
import { listarMascotas } from "../src/services/listar";

vi.mock("../src/data/repo", () => ({
  repo: { getAll: vi.fn().mockResolvedValue([{ id: "1", nombre: "Luna", raza: "Beagle" }]) }
}));

describe("listarMascotas", () => {
  it("devuelve todas las mascotas", async () => {
    const res = await listarMascotas();
    expect(res).toHaveLength(1);
    expect(res[0].nombre).toBe("Luna");
  });
});
