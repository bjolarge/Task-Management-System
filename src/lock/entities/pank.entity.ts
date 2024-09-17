import { object } from "joi";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pank{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    clank:string;

    constructor(pank:Partial<Pank>){
        Object.assign(this,pank)
    }
}