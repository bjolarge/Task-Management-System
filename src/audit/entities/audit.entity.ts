import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('audit')
export class Audit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  entityName: string;

  @Column()
  entityId: number;

  @Column()
  action: string; // e.g., 'CREATE', 'UPDATE', 'DELETE'

  @Column('json')
  oldValue: any; // Store old value (before change)

  @Column('json')
  newValue: any; // Store new value (after change)

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  userId: number; // You might want to store the ID of the user who made the change
}
