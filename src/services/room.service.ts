import { AppDataSource } from "../config/database";
import { CreateRoomDto, UpdateRoomDto } from "../dto/room.dto";
import { Room } from "../entities/room";

export class RoomService {
  private roomRepository = AppDataSource.getRepository(Room);

  async create(roomDto: CreateRoomDto): Promise<Room> {
    const room = this.roomRepository.create(roomDto);
    return await this.roomRepository.save(room);
  }

  async getAll(): Promise<Room[]> {
    return await this.roomRepository.find({
      relations: ["roomType"],
    });
  }

  async getById(id: number): Promise<Room | null> {
    return await this.roomRepository.findOne({
      where: { id },
      relations: ["roomType"],
    });
  }

  async update(id: number, roomDto: UpdateRoomDto): Promise<Room | null> {
    const room = await this.roomRepository.findOneBy({ id });
    if (!room) return null;

    Object.assign(room, roomDto);
    return await this.roomRepository.save(room);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.roomRepository.delete(id);
    return result.affected! > 0;
  }
}
