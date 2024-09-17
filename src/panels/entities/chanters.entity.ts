import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Chanters{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    channelCode:string;
    
    constructor(chanters:Partial<Chanters>){
        Object.assign(this, chanters)
    }
}