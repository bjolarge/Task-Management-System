import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Testimony {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    testimony:string;
}
