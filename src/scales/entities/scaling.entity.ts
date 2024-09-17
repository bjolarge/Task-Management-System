import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Scaling{
@PrimaryGeneratedColumn()
id:number;

@Column()
color:string;

@Column()
limit:string;

constructor(scaling: Partial<Scaling>){
    Object.assign(this, scaling)
}

}