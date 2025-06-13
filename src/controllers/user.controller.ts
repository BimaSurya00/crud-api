import { Request, Response } from "express";
import { CreateUserDto } from "../dto/user.dto";
import { UserService } from "../services/user.service";

const userService = new UserService();

export const createUser = async (req: Request, res: Response) => {
  try {
    const userDto: CreateUserDto = req.body;
    const user = await userService.create(userDto);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAll();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userService.getById(+req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userDto: CreateUserDto = req.body;
    const updateUser = await userService.update(+req.params.id, userDto);
    if (!updateUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(updateUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const isDeleted = await userService.delete(+req.params.id);
    if (!isDeleted) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
