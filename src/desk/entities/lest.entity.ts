import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Lest{
@PrimaryGeneratedColumn()
id:number;

@Column()
address:string;

constructor(lest:Partial<Lest>){
Object.assign(this,lest);
}
}