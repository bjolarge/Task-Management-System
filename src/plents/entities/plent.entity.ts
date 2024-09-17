import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Plent {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    apt:string;

    @Column({default:true})
    current:boolean;

    constructor(plent:Partial<Plent>){
        Object.assign(this,plent)
    }
}
