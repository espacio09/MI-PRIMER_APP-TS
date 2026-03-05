// crear mascota - test básico


import { describe, it, expect } from 'vitest';
import { crearMascota } from '../../src/domain/mascotas/service.js';

describe('crearMascota', () => {
  it('crea una mascota válida', () => {
    const m = crearMascota({ nombre: 'Luna', especie: 'Perro', edad: 3 });
    expect(m.id).toBeDefined();
    expect(m.nombre).toBe('Luna');
  });
});
