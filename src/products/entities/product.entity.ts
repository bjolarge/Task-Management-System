import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Production } from "./production.entity";

@Entity('asety')
export class Product {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    color:string;

    @Column()
    rating:number;

    @Column()
    price:number;

    @Column()
    shape:string;

    @OneToOne(()=>Production,{cascade:true})
    @JoinColumn()
    production:Production;

    constructor(product: Partial<Product>){
        Object.assign(this, product);
    }
}
