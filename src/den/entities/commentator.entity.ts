import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Den } from "./den.entity";

@Entity('lapcmeenwrtdsq')
export class Commentator{
@PrimaryGeneratedColumn()
id:number;

@Column()
content:string; 

@ManyToOne(()=>Den,(item)=>item.comments)
item:Den;
//den:Den;


constructor(commentator:Partial<Commentator>){
Object.assign(this, commentator)
}
}