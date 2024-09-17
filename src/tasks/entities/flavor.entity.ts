import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './task.entity';

@Entity('flevs')
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name:string;

  @ManyToMany(type=>Task,(task)=>task.flavors)
  coffees:Task[]
}