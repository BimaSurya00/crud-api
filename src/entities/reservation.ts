import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Payment } from "./payment";
import { Room } from "./room";

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  roomId: string;

  @Column({ type: "date" })
  checkInDate: Date;

  @Column({ type: "date" })
  checkOutDate: Date;

  @Column()
  totalAmount: number;

  @ManyToOne(() => Room, (room) => room.reservations)
  @JoinColumn({ name: "roomId" })
  room: Room;

  @OneToMany(() => Payment, (payment) => payment.reservation)
  payments: Payment[];
}
