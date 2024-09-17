import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TransactionStatus, TransactionType } from "../enums/transaction.enum";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    amount: number

    @Column({ enum: TransactionStatus, default: TransactionStatus.PENDING })
    status: TransactionStatus

    @Column()
    customer_code: string

    @Column()
    customer_name: string

    @Column()
    reference: string

    @Column()
    transaction_type: TransactionType

    @Column()
    description: string
}
