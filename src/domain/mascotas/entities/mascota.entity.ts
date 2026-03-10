// src/mascotas/entities/mascota.entity.ts


import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Mascota {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  edad: number;

  @Column()
  especie: string;

   @Column()
  raza: string;

  @Column()
  vacunas: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  fechaRegistro: Date;
}
