import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Harpner } from "./harpner.entity";
import { Lept } from "./lept.entity";

@Entity('djwleapsfj')
 export class Learner {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    learnerAge:number;

    @OneToOne(()=>Harpner, {cascade:true})
    @JoinColumn()
    learnersApt:Harpner;

    @OneToMany(()=>Lept,(learners)=>learners.learnerteach, {cascade:true})
    learnersclub:Lept[];

    constructor(learner:Partial<Learner>){
        Object.assign(this, learner)
    }
 }
