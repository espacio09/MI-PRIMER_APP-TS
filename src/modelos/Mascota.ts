
export class Mascota {
    nombre: string;
    edad: number;
    raza: string;
    esHembra: boolean;
    personalidad?: string;

    constructor(
        nombre: string,
        edad: number,
        raza: string,
        esHembra: boolean,
        personalidad?: string
    ) {
        this.nombre = nombre;
        this.edad = edad;
        this.raza = raza;
        this.esHembra = esHembra;
        this.personalidad = personalidad;
    }
}
