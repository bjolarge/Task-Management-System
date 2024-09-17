import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Yent {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
   lept:string;

    constructor(yent:Partial<Yent>){
        Object.assign(this,yent)
    }
}
