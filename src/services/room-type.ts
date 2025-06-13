import { AppDataSource } from "../config/database";
import { CreateRoomTypeDto, UpdateRoomTypeDto } from "../dto/room-type.dto";
import { RoomType } from "../entities/room-type";

export class RoomTypeService {
  private roomTypeRepository = AppDataSource.getRepository(RoomType);

  async create(roomTypeDto: CreateRoomTypeDto): Promise<RoomType> {
    const roomType = this.roomTypeRepository.create(roomTypeDto);
    return await this.roomTypeRepository.save(roomType);
  }

  async getAll(): Promise<RoomType[]> {
    return await this.roomTypeRepository.find();
  }

  async getById(id: number): Promise<RoomType | null> {
    return await this.roomTypeRepository.findOneBy({ id });
  }

  async update(
    id: number,
    roomTypeDto: UpdateRoomTypeDto
  ): Promise<RoomType | null> {
    const roomType = await this.getById(id);
    if (!roomType) return null;
    Object.assign(roomType, roomTypeDto);
    return await this.roomTypeRepository.save(roomType);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.roomTypeRepository.delete(id);
    return true;
  }
}
