import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tag{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    content:string;

    constructor(tag:Partial<Tag>){
        Object.assign(this,tag);
    }
}