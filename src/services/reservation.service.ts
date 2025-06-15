import { Between, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { AppDataSource } from "../config/database";
import { CreatePaymentDto } from "../dto/payment.dto";
import {
  CreateReservationDto,
  UpdateReservationDto,
} from "../dto/reservation.dto";
import { Payment } from "../entities/payment";
import { Reservation } from "../entities/reservation";

export class ReservationService {
  private reservationRepository = AppDataSource.getRepository(Reservation);
  private paymentRepository = AppDataSource.getRepository(Payment);

  async create(reservationDto: CreateReservationDto): Promise<Reservation> {
    const reservation = this.reservationRepository.create({
      roomId: reservationDto.roomId,
      checkInDate: new Date(reservationDto.checkInDate),
      checkOutDate: new Date(reservationDto.checkOutDate),
      totalAmount: reservationDto.totalAmount,
    });
    return await this.reservationRepository.save(reservation);
  }

  async getAll(): Promise<Reservation[]> {
    return await this.reservationRepository.find({
      relations: ["room", "room.roomType", "payments"],
    });
  }

  async getByDateRange(
    startDate: string,
    endDate: string
  ): Promise<Reservation[]> {
    const queryStartDate = new Date(startDate);
    const queryEndDate = new Date(endDate);

    queryStartDate.setHours(0, 0, 0, 0);
    queryEndDate.setHours(23, 59, 59, 999);

    return await this.reservationRepository.find({
      where: [
        {
          checkInDate: Between(queryStartDate, queryEndDate),
        },
        {
          checkOutDate: Between(queryStartDate, queryEndDate),
        },
        {
          checkInDate: LessThanOrEqual(queryStartDate),
          checkOutDate: MoreThanOrEqual(queryEndDate),
        },
      ],
      relations: ["room", "room.roomType", "payments"],
      order: {
        checkInDate: "ASC",
      },
    });
  }

  async getById(id: string): Promise<Reservation | null> {
    return await this.reservationRepository.findOne({
      where: { id },
      relations: ["room", "room.roomType", "payments"],
    });
  }

  async update(
    id: string,
    reservationDto: UpdateReservationDto
  ): Promise<Reservation | null> {
    const reservation = await this.reservationRepository.findOneBy({ id });
    if (!reservation) return null;

    const updateData: any = {
      ...(reservationDto.totalAmount !== undefined && {
        totalAmount: reservationDto.totalAmount,
      }),
      ...(reservationDto.checkInDate && {
        checkInDate: new Date(reservationDto.checkInDate),
      }),
      ...(reservationDto.checkOutDate && {
        checkOutDate: new Date(reservationDto.checkOutDate),
      }),
      ...(reservationDto.roomId && {
        roomId: reservationDto.roomId,
      }),
    };

    Object.assign(reservation, updateData);
    return await this.reservationRepository.save(reservation);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.reservationRepository.delete(id);
    return result.affected! > 0;
  }

  async addPayment(
    reservationId: string,
    paymentDto: CreatePaymentDto
  ): Promise<Payment | null> {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
      relations: ["payments"],
    });

    if (!reservation) {
      return null;
    }

    const totalPaid = reservation.payments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );
    const remainingAmount = reservation.totalAmount - totalPaid;

    if (paymentDto.amount > remainingAmount) {
      throw new Error(
        `Payment amount (${paymentDto.amount}) exceeds remaining amount (${remainingAmount})`
      );
    }

    if (paymentDto.amount <= 0) {
      throw new Error("Payment amount must be greater than 0");
    }

    const payment = this.paymentRepository.create({
      reservationId: reservationId,
      amount: paymentDto.amount,
      paidAt: new Date(),
    });

    return await this.paymentRepository.save(payment);
  }

  async getPaymentSummary(reservationId: string) {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
      relations: ["payments"],
    });

    if (!reservation) {
      return null;
    }

    const totalPaid = reservation.payments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );
    const remainingAmount = reservation.totalAmount - totalPaid;
    const isPaidFull = remainingAmount === 0;

    return {
      totalAmount: reservation.totalAmount,
      totalPaid,
      remainingAmount,
      isPaidFull,
      paymentCount: reservation.payments.length,
    };
  }
}
