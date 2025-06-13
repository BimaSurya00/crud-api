import { IsString } from "class-validator";

export class CreateRoomTypeDto {
  @IsString()
  name: string;
}

export class UpdateRoomTypeDto {
  @IsString()
  name?: string;
}
