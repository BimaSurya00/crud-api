import { IsNumber, IsString } from "class-validator";

export class CreateRoomDto {
  @IsString()
  roomNumber: string;

  @IsNumber()
  roomTypeId: number;
}

export class UpdateRoomDto {
  @IsString()
  roomNumber?: string;

  @IsNumber()
  roomTypeId?: number;
}

export interface RoomResponseDto {
  id: number;
  roomNumber: string;
  roomTypeId: number;
  roomType?: {
    id: number;
    name: string;
  };
}
