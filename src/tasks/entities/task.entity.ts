import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Flavor } from './flavor.entity';
@Entity('task-lister')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name:string;

  @Column()
  brand:string;

  // here we try to define the relationships by giving the following part
  // jointable shows the owner side of the relationship
 // @Column('json', {nullable:true})
  @JoinTable()
  @ManyToMany(
    type=>Flavor,
    (flavor)=>flavor.coffees,
    {
      cascade:true, // flavors that belong to the task would be automatically added here
    }
  )
  // change string to Flavor Array.
  flavors: Flavor[];
  // flavors: string[];

  // @PrimaryGeneratedColumn()
  // id: number;

  // @Column()
  // title: string;

  // @Column()
  // description: string;
}