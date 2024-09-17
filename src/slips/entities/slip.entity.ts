import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Flip } from "./flip.entity";
import { Tip } from "./tip.entity";
import { Tag } from "./tag.entity";

@Entity()
export class Slip {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    slipName:string;

    @Column()
    slipDetails:string;

    @OneToOne(()=>Flip,{cascade:true})
    @JoinColumn()
    flip:Flip;

    @OneToMany(()=>Tip,(slip)=>slip.tip, {cascade:true})
    slip:Tip[];

    @ManyToMany(()=>Tag,{cascade:true})
    @JoinTable()
    tags:Tag[];

    constructor(slip:Partial<Slip>){
        Object.assign(this, slip)
    }
}
