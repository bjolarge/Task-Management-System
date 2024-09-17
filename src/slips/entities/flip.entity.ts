import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Flip{
@PrimaryGeneratedColumn()
id:number;

@Column()
fonts:string;

constructor(flip:Partial<Flip>){
Object.assign(this,flip)
}
}