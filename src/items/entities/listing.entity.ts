import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('dhlistehr')
export class Listing{
@PrimaryGeneratedColumn()
id:number;

@Column()
description:string;

@Column()
rating:number;

constructor(listing:Partial<Listing>){
Object.assign(this,listing)
}

}