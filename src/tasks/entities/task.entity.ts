import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('task-list')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;
}