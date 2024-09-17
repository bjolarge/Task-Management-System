import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('dwhheaps')
export class Harpner{
@PrimaryGeneratedColumn()
id:number;

@Column()
address:string;

@Column()
pickupLocation:string;

constructor(harpner:Partial<Harpner>){
Object.assign(this, harpner)
}
}