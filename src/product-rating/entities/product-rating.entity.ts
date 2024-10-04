import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductRating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rating: number; // Rating value (1-5)

    @Column({ type: 'text' })
    comment: string; // Optional comment

    @ManyToOne(() => Product, (product) => product.ratings)
    product: Product;
}
