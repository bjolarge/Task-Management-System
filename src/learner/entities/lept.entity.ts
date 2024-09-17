import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Learner } from "./learner.entity";

@Entity()
export class Lept{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    contact:string;

    @ManyToOne(()=>Learner,(learner)=>learner.learnersclub)
    learnerteach:Learner;

    constructor(lept:Partial<Lept>){
        Object.assign(this,lept)
    }
}