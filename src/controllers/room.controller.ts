import { Request, Response } from "express";
import { CreateRoomDto } from "../dto/room.dto";
import { RoomService } from "../services/room.service";

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
    res.status(201).json(room);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await roomService.getAll();
    res.status(200).json(rooms);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getRoomById = async (req: Request, res: Response) => {
  try {
    const room = await roomService.getById(+req.params.id);
    if (!room) {
      res.status(404).json({ message: "Room not found" });
      return;
    }
    res.status(200).json(room);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
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

    res.status(200).json(updatedRoom);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const isDeleted = await roomService.delete(+req.params.id);
    if (!isDeleted) {
      res.status(404).json({ message: "Room not found" });
      return;
    }
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
