import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reservation } from "./reservation";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  reservationId: string;

  @Column()
  amount: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  paidAt: Date;

  @ManyToOne(() => Reservation, (reservation) => reservation.payments)
  @JoinColumn({ name: "reservationId" })
  reservation: Reservation;
}
