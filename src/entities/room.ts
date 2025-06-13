import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reservation } from "./reservation";
import { RoomType } from "./room-type";

@Entity()
export class Room {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  roomNumber: string;

  @Column()
  roomTypeId: number;

  @ManyToOne(() => RoomType, (roomType) => roomType.rooms)
  @JoinColumn({ name: "roomTypeId" })
  roomType: RoomType;

  @OneToMany(() => Reservation, (reservation) => reservation.room)
  reservations: Reservation[];
}
