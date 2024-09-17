import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Lorry{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    sortCode:string;

    constructor(lorry: Partial<Lorry>){
        Object.assign(this,lorry);
    }
}