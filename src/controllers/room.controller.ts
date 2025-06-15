import { Request, Response } from "express";
import { CreateRoomDto } from "../dto/room.dto";
import { RoomService } from "../services/room.service";
import { ApiResponseUtil } from "../utlis/api-response.util";

const roomService = new RoomService();

export const createRoom = async (req: Request, res: Response) => {
  try {
    const roomDto: CreateRoomDto = req.body;

    if (!roomDto.roomNumber || !roomDto.roomTypeId) {
      res.status(400).json({
        message: "roomNumber and roomTypeId are required",
      });
      return;
    }
    const room = await roomService.create(roomDto);

    const response = ApiResponseUtil.created(room, "Room created successfully");
    res.status(response.code).json(response);
  } catch (error: any) {
    const response = ApiResponseUtil.error(error.message, 400);
    res.status(response.code).json({ response });
  }
};

export const getAllRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await roomService.getAll();

    const response = ApiResponseUtil.success(
      rooms,
      "Room retrieved successfully"
    );
    res.status(response.code).json(response);
  } catch (error: any) {
    const response = ApiResponseUtil.error(error.message, 500);
    res.status(response.code).json({ response });
  }
};

export const getRoomById = async (req: Request, res: Response) => {
  try {
    const room = await roomService.getById(+req.params.id);
    if (!room) {
      res.status(404).json({ message: "Room not found" });
      return;
    }

    const response = ApiResponseUtil.success(
      room,
      "Room retrieved successfully"
    );
    res.status(response.code).json(response);
  } catch (error: any) {
    const response = ApiResponseUtil.error(error.message, 400);
    res.status(response.code).json({ response });
  }
};

export const updateRoom = async (req: Request, res: Response) => {
  try {
    const roomDto: CreateRoomDto = req.body;
    const updatedRoom = await roomService.update(+req.params.id, roomDto);

    if (!updatedRoom) {
      res.status(404).json({ message: "Room not found" });
      return;
    }

    const response = ApiResponseUtil.success(
      updateRoom,
      "Room updated successfully"
    );

    res.status(response.code).json(response);
  } catch (error: any) {
    const response = ApiResponseUtil.error(error.message, 400);
    res.status(response.code).json({ response });
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const isDeleted = await roomService.delete(+req.params.id);
    if (!isDeleted) {
      res.status(404).json({ message: "Room not found" });
      return;
    }

    const response = ApiResponseUtil.success(null, "Room deleted successfully");
    res.status(response.code).json({ response });
  } catch (error: any) {
    const response = ApiResponseUtil.error(error.message, 400);
    res.status(response.code).json({ response });
  }
};
