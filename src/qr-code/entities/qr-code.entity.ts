import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class QrCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  qrCodeImage: string;
}
