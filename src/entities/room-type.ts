import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room";

@Entity()
export class RoomType {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Room, (room) => room.roomType)
  rooms: Room[];
}
