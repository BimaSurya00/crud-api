import { Request, Response } from "express";
import {
  CreateReservationDto,
  UpdateReservationDto,
} from "../dto/reservation.dto";
import { ReservationService } from "../services/reservation.service";

const reservationService = new ReservationService();

export const createReservation = async (req: Request, res: Response) => {
  try {
    const reservationDto: CreateReservationDto = req.body;
    const reservation = await reservationService.create(reservationDto);
    res.status(201).json(reservation);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllReservation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { startDate, endDate } = req.query;

    if (startDate && endDate) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (
        !dateRegex.test(startDate as string) ||
        !dateRegex.test(endDate as string)
      ) {
        res.status(400).json({
          message: "Invalid date format. Please use YYYY-MM-DD format",
        });
        return;
      }

      if (new Date(startDate as string) > new Date(endDate as string)) {
        res.status(400).json({
          message: "startDate cannot be after endDate",
        });
        return;
      }

      const reservations = await reservationService.getByDateRange(
        startDate as string,
        endDate as string
      );
      res.status(200).json({
        reservations,
        count: reservations.length,
        dateRange: {
          startDate,
          endDate,
        },
      });
      return;
    }

    const reservation = await reservationService.getAll();
    res.status(200).json(reservation);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getReservationById = async (req: Request, res: Response) => {
  try {
    const reservation = await reservationService.getById(req.params.id);
    if (!reservation) {
      res.status(404).json({ message: "Reservation not found" });
      return;
    }
    res.status(200).json(reservation);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateReservation = async (req: Request, res: Response) => {
  try {
    const reservationDto: UpdateReservationDto = req.body;
    const updateReservation = await reservationService.update(
      req.params.id,
      reservationDto
    );
    if (!updateReservation) {
      res.status(404).json({ message: "Reservation not found " });
      return;
    }
    res.status(200).json(updateReservation);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteReservation = async (req: Request, res: Response) => {
  try {
    const isDeleted = await reservationService.delete(req.params.id);
    if (!isDeleted) {
      res.status(404).json({ message: "Reservation not found" });
      return;
    }
    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
