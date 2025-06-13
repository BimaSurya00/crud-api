import { AppDataSource } from "../config/database";
import { CreatePaymentDto, UpdatePaymentDto } from "../dto/payment.dto";
import { Payment } from "../entities/payment";
import { Reservation } from "../entities/reservation";

export class PaymentService {
  private paymentRepository = AppDataSource.getRepository(Payment);
  private reservationRepository = AppDataSource.getRepository(Reservation);

  async create(paymentDto: CreatePaymentDto): Promise<Payment> {
    const reservation = await this.reservationRepository.findOneBy({
      id: paymentDto.reservationId,
    });

    if (!reservation) {
      throw new Error("Reservation not found");
    }

    const totalPaid = await this.getTotalPaidByReservation(
      paymentDto.reservationId
    );
    const remainingAmount = reservation.totalAmount - totalPaid;

    if (paymentDto.amount > remainingAmount) {
      throw new Error(
        `Payment amount exceeds remaining balance. Remaining: ${remainingAmount}`
      );
    }

    const payment = this.paymentRepository.create(paymentDto);
    return await this.paymentRepository.save(payment);
  }

  async getAll(): Promise<Payment[]> {
    return await this.paymentRepository.find({
      relations: [
        "reservation",
        "reservation.room",
        "reservation.room.roomType",
      ],
    });
  }

  async getById(id: string): Promise<Payment | null> {
    return await this.paymentRepository.findOne({
      where: { id },
      relations: [
        "reservation",
        "reservation.room",
        "reservation.room.roomType",
      ],
    });
  }

  async getByReservationId(reservationId: string): Promise<Payment[]> {
    return await this.paymentRepository.find({
      where: { reservationId },
      relations: ["reservation"],
      order: { paidAt: "ASC" },
    });
  }

  async update(
    id: string,
    paymentDto: UpdatePaymentDto
  ): Promise<Payment | null> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: ["reservation"],
    });

    if (!payment) return null;

    if (paymentDto.amount !== undefined) {
      const totalPaidOther = await this.getTotalPaidByReservation(
        payment.reservationId,
        id
      );
      const remainingAmount = payment.reservation.totalAmount - totalPaidOther;

      if (paymentDto.amount > remainingAmount) {
        throw new Error(
          `Payment amount exceeds remaining balance. Remaining: ${remainingAmount}`
        );
      }
    }

    Object.assign(payment, paymentDto);
    return await this.paymentRepository.save(payment);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.paymentRepository.delete(id);
    return result.affected! > 0;
  }

  async getTotalPaidByReservation(
    reservationId: string,
    excludePaymentId?: string
  ): Promise<number> {
    const queryBuilder = this.paymentRepository
      .createQueryBuilder("payment")
      .select("SUM(payment.amount)", "total")
      .where("payment.reservationId = :reservationId", { reservationId });

    if (excludePaymentId) {
      queryBuilder.andWhere("payment.id != :excludePaymentId", {
        excludePaymentId,
      });
    }

    const result = await queryBuilder.getRawOne();
    return parseFloat(result.total) || 0;
  }

  async getPaymentSummary(reservationId: string): Promise<{
    totalAmount: number;
    totalPaid: number;
    remainingAmount: number;
    paymentCount: number;
    isFullyPaid: boolean;
  }> {
    const reservation = await this.reservationRepository.findOneBy({
      id: reservationId,
    });

    if (!reservation) {
      throw new Error("Reservation not found");
    }

    const totalPaid = await this.getTotalPaidByReservation(reservationId);
    const remainingAmount = reservation.totalAmount - totalPaid;
    const paymentCount = await this.paymentRepository.count({
      where: { reservationId },
    });

    return {
      totalAmount: reservation.totalAmount,
      totalPaid,
      remainingAmount,
      paymentCount,
      isFullyPaid: remainingAmount <= 0,
    };
  }

  async getAllWithSummary(): Promise<{
    payments: Payment[];
    summary: {
      totalPayments: number;
      totalAmount: number;
    };
  }> {
    const payments = await this.getAll();
    const totalAmount = payments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

    return {
      payments,
      summary: {
        totalPayments: payments.length,
        totalAmount,
      },
    };
  }
}
