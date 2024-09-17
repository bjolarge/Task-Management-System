import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lorry } from "./lorry.entity";

@Entity()
export class Frozen {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    phoneNumber:string;

    @Column()
    address:string;

    @OneToOne(()=>Lorry,{cascade:true})
    @JoinColumn()
    lorry:Lorry;

    constructor(frozen: Partial<Frozen>){
        Object.assign(this,frozen);
    }
}
