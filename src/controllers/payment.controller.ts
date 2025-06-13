import { Request, Response } from "express";
import { CreatePaymentDto, UpdatePaymentDto } from "../dto/payment.dto";
import { PaymentService } from "../services/payment.service";

const paymentService = new PaymentService();

export const createPayment = async (req: Request, res: Response) => {
  try {
    const paymentDto: CreatePaymentDto = req.body;
    const reservation = await paymentService.create(paymentDto);
    res.status(201).json(reservation);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllPayment = async (req: Request, res: Response) => {
  try {
    const payment = await paymentService.getAll();
    res.status(200).json(payment);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getPaymentById = async (req: Request, res: Response) => {
  try {
    const payment = await paymentService.getById(req.params.id);
    if (!payment) {
      res.status(404).json({ message: "Payment not found" });
      return;
    }
    res.status(200).json(payment);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePayment = async (req: Request, res: Response) => {
  try {
    const paymentDto: UpdatePaymentDto = req.body;
    const updatePayment = await paymentService.update(
      req.params.id,
      paymentDto
    );
    if (!updatePayment) {
      res.status(404).json({ message: "Payment not found " });
      return;
    }
    res.status(200).json(updatePayment);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePayment = async (req: Request, res: Response) => {
  try {
    const isDeleted = await paymentService.delete(req.params.id);
    if (!isDeleted) {
      res.status(404).json({ message: "Payment not found" });
      return;
    }
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
