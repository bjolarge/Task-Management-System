import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('rehk')
export class Production{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    productionAddress:string;

    constructor(production: Partial<Production>){
        Object.assign(this, production);
    }
}