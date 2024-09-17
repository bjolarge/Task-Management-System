import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Chanters } from "./chanters.entity";

@Entity('fepanelq')
export class Panel {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    panelDescription:string;

    @OneToOne(()=>Chanters, {cascade:true})
    chanters:Chanters;

    constructor(panel:Partial<Panel>){
    Object.assign(this,panel)
    }

}
