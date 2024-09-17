import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Manage } from "./manage.entity";

@Entity('newscommentsa')
export class Comment{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    content:string;

    @ManyToOne(()=>Manage, (item)=>item.comments)
    item:Manage[]

    constructor(comment:Partial<Comment>){
        Object.assign(this,comment)
    }
}