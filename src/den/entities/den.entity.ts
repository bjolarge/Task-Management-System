import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lents } from "./lents.entity";
import { Commentator } from "./commentator.entity";

@Entity('dhqqdenhy')
export class Den {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    detailedAddress:string;

    @Column()
    age:number;

    @Column({default:true})
    public:boolean;

    @OneToOne(()=>Lents, {cascade:true})
    @JoinColumn()
    lentDents:Lents;

    @OneToMany(()=>Commentator, (commentato)=>commentato.item, {cascade:true})
    // This is an array of commentators because this is a one to many and many to one relationship
    
    comments:Commentator[]

    constructor(den:Partial<Den>){
        Object.assign(this,den)
    }
}
