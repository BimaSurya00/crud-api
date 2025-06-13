import { Request, Response } from "express";
import { CreateRoomTypeDto } from "../dto/room-type.dto";
import { RoomTypeService } from "../services/room-type";

const roomTypeService = new RoomTypeService();

export const createRoomType = async (req: Request, res: Response) => {
  try {
    const roomTypeDto: CreateRoomTypeDto = req.body;
    const roomType = await roomTypeService.create(roomTypeDto);
    res.status(201).json(roomType);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllRoomType = async (req: Request, res: Response) => {
  try {
    const roomType = await roomTypeService.getAll();
    res.status(200).json(roomType);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getRoomTypeById = async (req: Request, res: Response) => {
  try {
    const roomType = await roomTypeService.getById(+req.params.id);
    if (!roomType) {
      res.status(404).json({ message: "RoomType not found" });
      return;
    }
    res.status(200).json(roomType);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateRoomType = async (req: Request, res: Response) => {
  try {
    const roomTypeDto: CreateRoomTypeDto = req.body;
    const updateRoomType = await roomTypeService.update(
      +req.params.id,
      roomTypeDto
    );
    if (!updateRoomType) {
      res.status(404).json({ message: "RoomType not found" });
      return;
    }
    res.status(200).json(updateRoomType);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteRoomType = async (req: Request, res: Response) => {
  try {
    const isDeleted = await roomTypeService.delete(+req.params.id);
    if (!isDeleted) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "RoomType deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
