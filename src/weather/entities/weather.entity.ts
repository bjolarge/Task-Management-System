import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('lenadhf')
export class Weather {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  temperature: number;

  @Column()
  condition: string;

//   @Column()
//   timestamp: Date;
}
