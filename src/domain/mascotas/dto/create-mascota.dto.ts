// ✔️ Luego Nest automáticamente validará este DTO al entrar en el controlador.



import { IsString, IsInt, Min, MaxLength, IsIn } from 'class-validator';
import { isDate } from 'node:util/types';

export class CreateMascotaDto {
  @IsString()
  @MaxLength(50)
  nombre: string;

  @IsInt()
  @Min(0)
  edad: number;

  @IsString()
  @IsIn(['perro', 'gato', 'conejo'])
  especie: string;


  @IsString()
  @IsIn(['labrador', 'siames', 'himalayo', 'pomeranian', 'bulldog', 'beagle', 'persa', 'sphynx'])
  raza: string;

  @IsString()
  @MaxLength(50)
  proprietario: string;

  @IsString()
  @IsIn(['rabia', 'hepatitis', 'garrapatas', 'gusanos', 'parvovirus', 'moquillo'])
  vacunas: string;

 
}
