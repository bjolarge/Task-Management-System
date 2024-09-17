import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Desk } from "./desk.entity";

@Entity()
export class Commenters{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    content:string;

    @ManyToOne(()=>Desk,(item)=>item.comments)
    item:Desk;

    constructor(commenters:Partial<Commenters>){
        Object.assign(this,commenters);
    }

}