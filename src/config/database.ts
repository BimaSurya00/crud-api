import { DataSource } from "typeorm";
import { Payment } from "../entities/payment";
import { Reservation } from "../entities/reservation";
import { Room } from "../entities/room";
import { RoomType } from "../entities/room-type";
import { User } from "../entities/user";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "testDB",
  synchronize: true,
  logging: true,
  entities: [User, RoomType, Room, Reservation, Payment],
  migrations: [],
  subscribers: [],
});
