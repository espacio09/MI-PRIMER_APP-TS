
export class Mascota {
    nombre: string;
    edad: number;
    raza: string;
    esHembra: boolean;

    constructor(nombre: string, edad: number, raza: string, esHembra: boolean) {
        this.nombre = nombre;
        this.edad = edad;
        this.raza = raza;
        this.esHembra = esHembra;
    }
}
