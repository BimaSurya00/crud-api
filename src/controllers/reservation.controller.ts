import { Request, Response } from "express";
import { CreatePaymentDto } from "../dto/payment.dto";
import {
  CreateReservationDto,
  UpdateReservationDto,
} from "../dto/reservation.dto";
import { ReservationService } from "../services/reservation.service";
import { ApiResponseUtil } from "../utlis/api-response.util";

const reservationService = new ReservationService();

export const createReservation = async (req: Request, res: Response) => {
  try {
    const reservationDto: CreateReservationDto = req.body;
    const reservation = await reservationService.create(reservationDto);

    const response = ApiResponseUtil.created(
      reservation,
      "Reservation created successfully"
    );
    res.status(response.code).json(response);
  } catch (error: any) {
    const response = ApiResponseUtil.error(error.message, 400);
    res.status(response.code).json(response);
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
        const response = ApiResponseUtil.error(
          "Invalid date format. Please use YYYY-MM-DD format",
          400
        );
        res.status(response.code).json(response);
        return;
      }

      if (new Date(startDate as string) > new Date(endDate as string)) {
        const response = ApiResponseUtil.error(
          "startDate cannot be after endDate",
          400
        );
        res.status(response.code).json(response);
        return;
      }

      const reservations = await reservationService.getByDateRange(
        startDate as string,
        endDate as string
      );

      const result = {
        reservations,
        count: reservations.length,
        dateRange: {
          startDate: startDate as string,
          endDate: endDate as string,
        },
      };

      const response = ApiResponseUtil.success(
        result,
        "Reservations retrieved successfully"
      );
      res.status(response.code).json(response);
      return;
    }

    const reservations = await reservationService.getAll();
    const response = ApiResponseUtil.success(
      reservations,
      "All reservations retrieved successfully"
    );
    res.status(response.code).json(response);
  } catch (error: any) {
    const response = ApiResponseUtil.error(error.message, 500);
    res.status(response.code).json(response);
  }
};

export const getReservationById = async (req: Request, res: Response) => {
  try {
    const reservation = await reservationService.getById(req.params.id);
    if (!reservation) {
      const response = ApiResponseUtil.notFound("Reservation not found");
      res.status(response.code).json(response);
      return;
    }

    const response = ApiResponseUtil.success(
      reservation,
      "Reservation retrieved successfully"
    );
    res.status(response.code).json(response);
  } catch (error: any) {
    const response = ApiResponseUtil.error(error.message, 400);
    res.status(response.code).json(response);
  }
};

export const updateReservation = async (req: Request, res: Response) => {
  try {
    const reservationDto: UpdateReservationDto = req.body;
    const updatedReservation = await reservationService.update(
      req.params.id,
      reservationDto
    );

    if (!updatedReservation) {
      const response = ApiResponseUtil.notFound("Reservation not found");
      res.status(response.code).json(response);
      return;
    }

    const response = ApiResponseUtil.success(
      updatedReservation,
      "Reservation updated successfully"
    );
    res.status(response.code).json(response);
  } catch (error: any) {
    const response = ApiResponseUtil.error(error.message, 400);
    res.status(response.code).json(response);
  }
};

export const deleteReservation = async (req: Request, res: Response) => {
  try {
    const isDeleted = await reservationService.delete(req.params.id);
    if (!isDeleted) {
      const response = ApiResponseUtil.notFound("Reservation not found");
      res.status(response.code).json(response);
      return;
    }

    const response = ApiResponseUtil.success(
      null,
      "Reservation deleted successfully"
    );
    res.status(response.code).json(response);
  } catch (error: any) {
    const response = ApiResponseUtil.error(error.message, 400);
    res.status(response.code).json(response);
  }
};

export const addPaymentToReservation = async (req: Request, res: Response) => {
  try {
    const reservationId = req.params.id;
    const paymentDto: CreatePaymentDto = req.body;

    const payment = await reservationService.addPayment(
      reservationId,
      paymentDto
    );

    if (!payment) {
      const response = ApiResponseUtil.notFound("Reservation not found");
      res.status(response.code).json(response);
      return;
    }

    const paymentSummary = await reservationService.getPaymentSummary(
      reservationId
    );

    const result = {
      payment,
      paymentSummary,
    };

    const response = ApiResponseUtil.created(
      result,
      "Payment added successfully"
    );
    res.status(response.code).json(response);
  } catch (error: any) {
    const response = ApiResponseUtil.error(error.message, 400);
    res.status(response.code).json(response);
  }
};

export const getReservationPaymentSummary = async (
  req: Request,
  res: Response
) => {
  try {
    const reservationId = req.params.id;
    const summary = await reservationService.getPaymentSummary(reservationId);

    if (!summary) {
      const response = ApiResponseUtil.notFound("Reservation not found");
      res.status(response.code).json(response);
      return;
    }

    const response = ApiResponseUtil.success(
      summary,
      "Payment summary retrieved successfully"
    );
    res.status(response.code).json(response);
  } catch (error: any) {
    const response = ApiResponseUtil.error(error.message, 400);
    res.status(response.code).json(response);
  }
};
