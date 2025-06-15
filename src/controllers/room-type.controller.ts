import { Request, Response } from "express";
import { CreateRoomTypeDto } from "../dto/room-type.dto";
import { RoomTypeService } from "../services/room-type";
import { ApiResponseUtil } from "../utlis/api-response.util";

const roomTypeService = new RoomTypeService();

export const createRoomType = async (req: Request, res: Response) => {
  try {
    const roomTypeDto: CreateRoomTypeDto = req.body;
    const roomType = await roomTypeService.create(roomTypeDto);

    const response = ApiResponseUtil.created(
      roomType,
      "RoomType created successfully"
    );
    res.status(response.code).json(response);
  } catch (error: any) {
    const response = ApiResponseUtil.error(error.message, 400);
    res.status(response.code).json({ response });
  }
};

export const getAllRoomType = async (req: Request, res: Response) => {
  try {
    const roomType = await roomTypeService.getAll();

    const response = ApiResponseUtil.success(
      roomType,
      "RoomType retrieved successfully"
    );
    res.status(response.code).json(response);
  } catch (error: any) {
    const response = ApiResponseUtil.error(error.message, 500);
    res.status(response.code).json({ response });
  }
};

export const getRoomTypeById = async (req: Request, res: Response) => {
  try {
    const roomType = await roomTypeService.getById(+req.params.id);
    if (!roomType) {
      res.status(404).json({ message: "RoomType not found" });
      return;
    }

    const response = ApiResponseUtil.success(
      roomType,
      "RoomType retrieved successfully"
    );
    res.status(response.code).json(response);
  } catch (error: any) {
    const response = ApiResponseUtil.error(error.message, 400);
    res.status(response.code).json({ response });
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

    const response = ApiResponseUtil.success(
      updateRoomType,
      "RoomType updated successfully"
    );
    res.status(response.code).json(response);
  } catch (error: any) {
    const response = ApiResponseUtil.error(error.message, 400);

    res.status(response.code).json({ response });
  }
};

export const deleteRoomType = async (req: Request, res: Response) => {
  try {
    const isDeleted = await roomTypeService.delete(+req.params.id);
    if (!isDeleted) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const response = ApiResponseUtil.success(
      null,
      "RoomType deleted successfully"
    );
    res.status(response.code).json({ response });
  } catch (error: any) {
    const response = ApiResponseUtil.error(error.message, 400);
    res.status(response.code).json({ response });
  }
};
