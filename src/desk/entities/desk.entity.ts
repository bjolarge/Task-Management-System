import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lest } from "./lest.entity";
import { Commenters } from "./commenters.entity";

@Entity()
export class Desk {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    foreignNumber:string;

    @Column()
    deskDetails:string;

    @OneToOne(()=>Lest, {cascade:true})
    @JoinColumn()
    lesting:Lest;

    @OneToMany(()=>Commenters,(comment)=>comment.item, {cascade:true})
    comments:Commenters[]

    constructor(desk:Partial<Desk>){
    Object.assign(this,desk);
    }
}
