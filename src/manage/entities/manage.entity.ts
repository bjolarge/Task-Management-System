import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Management } from "./management.entity";
import { Comment } from "./comment.entity";

@Entity('dessfgg')
export class Manage {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    rating:number;

    @OneToOne(type=>Management, {cascade:true})
    @JoinColumn()
    management:Management;

    @OneToMany(()=>Comment,(comment)=>comment.item , {cascade:true})
    comments:Comment[];

    constructor(manage:Partial<Manage>){
        Object.assign(this, manage)
    }
}
