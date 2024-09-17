import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('dhgk')
export class Management{
@PrimaryGeneratedColumn()
id:number;

@Column()
description:string;

@Column()
rating:number;

constructor(management:Partial<Management>){
    Object.assign(this, management)
}
}