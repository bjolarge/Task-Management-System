import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Lents{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    postOrder:string;

    constructor(lents:Partial<Lents>){
        Object.assign(this,lents)
    }
}