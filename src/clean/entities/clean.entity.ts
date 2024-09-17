import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Clean {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    amount:number;

    @Column()
    discount:number;

    @Column()
    Balance:number;
}
