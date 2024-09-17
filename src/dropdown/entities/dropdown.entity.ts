import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('dropa')
export class Dropdown {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @Column()
    value: string;
}
