
import { describe, it, expect, vi } from "vitest";
import { buscarMascotas, buscarPorCriterios } from "../src/services/buscar";

const DATA = [
  { id: "1", nombre: "Luna", raza: "Beagle", propietario: "Tatjana", edad: 5 },
  { id: "2", nombre: "Toby", raza: "Mestizo", propietario: "Thomas", edad: 2 },
];

vi.mock("../src/data/repo", () => ({
  repo: { getAll: vi.fn().mockResolvedValue(DATA) }
}));

describe("buscarMascotas (término)", () => {
  it("encuentra por nombre", async () => {
    const res = await buscarMascotas("luna");
    expect(res.map(r => r.id)).toEqual(["1"]);
  });

  it("encuentra por raza", async () => {
    const res = await buscarMascotas("beagle");
    expect(res).toHaveLength(1);
  });

  it("retorna vacío con término vacío", async () => {
    const res = await buscarMascotas("   ");
    expect(res).toEqual([]);
  });
});

describe("buscarPorCriterios", () => {
  it("filtra por propietario", async () => {
    const res = await buscarPorCriterios({ propietario: "tatj" });
    expect(res.map(r => r.id)).toEqual(["1"]);
  });

  it("filtra por rango de edad", async () => {
    const res = await buscarPorCriterios({ rangoEdad: { min: 3 } });
    expect(res.map(r => r.id)).toEqual(["1"]);
  });
});
