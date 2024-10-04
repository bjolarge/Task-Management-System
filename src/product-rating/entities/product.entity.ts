import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductRating } from './product-rating.entity';

@Entity('fjfjf')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    productId: string;

    @OneToMany(() => ProductRating, (rating) => rating.product)
    ratings: ProductRating[];
}
