import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import User from 'src/users/entities/user.entity';

@Entity()
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
  value: number; // Assuming a rating scale of 1-5

  @ManyToOne(() => Product, (product) => product.ratings)
  product: Product;
}
