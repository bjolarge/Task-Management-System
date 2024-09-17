import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Scaling } from "./scaling.entity";

@Entity()
export class Scale {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    weight:number;

    @OneToOne(()=>Scaling, {cascade:true})
    @JoinColumn()
    scaling:Scaling;

    constructor(scale: Partial<Scale>){
        Object.assign(this, scale)
    }
}
