import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pank } from "./pank.entity";
import { Lomment } from "./lomment.entity";

@Entity()
export class Lock {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    lockApp:string;

    @Column()
    clearNap:string;

    @OneToOne(()=>Pank,{cascade:true})
    @JoinColumn()
    pank:Pank;

    @OneToMany(()=>Lomment,(lomment)=>lomment.lock, {cascade:true})
    lomment:Lomment[];

    constructor(lock:Partial<Lock>){
        Object.assign(this, lock)
    }
}
