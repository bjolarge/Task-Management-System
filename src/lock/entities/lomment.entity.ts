import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lock } from "./lock.entity";

@Entity('dkskas')
export class Lomment{
@PrimaryGeneratedColumn()
id:number;

@Column()
content:string;

@ManyToOne(()=>Lock,(lock)=>lock.lomment)
lock:Lock[];

constructor(lomment:Partial<Lomment>){
    Object.assign(this, lomment)
}
}