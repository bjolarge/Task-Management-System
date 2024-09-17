import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Slip } from "./slip.entity";

@Entity()
export class Tip{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    creation:string;

    @ManyToOne(()=>Slip,(tip)=>tip.slip)
    tip:Slip;

    constructor(tip:Partial<Tip>){
        Object.assign(this,tip)
    }
}