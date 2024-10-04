import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dhfhwdhwi')
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  item: string;

  @Column('decimal')
  amount: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
