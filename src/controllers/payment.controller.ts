import { Request, Response } from "express";
import { CreatePaymentDto, UpdatePaymentDto } from "../dto/payment.dto";
import { PaymentService } from "../services/payment.service";
import { ApiResponseUtil } from "../utlis/api-response.util";

const paymentService = new PaymentService();

export const createPayment = async (req: Request, res: Response) => {
  try {
    const paymentDto: CreatePaymentDto = req.body;
    const payment = await paymentService.create(paymentDto);

    const response = ApiResponseUtil.created(
      payment,
      "Payment created successfully"
    );
    res.status(response.code).json(payment);
  } catch (error: any) {
    const response = ApiResponseUtil.error(error.message, 400);
    res.status(response.code).json({ response });
  }
};

export const getAllPayment = async (req: Request, res: Response) => {
  try {
    const payment = await paymentService.getAll();

    const response = ApiResponseUtil.success(
      payment,
      "Payment retrieved successfully"
    );
    res.status(response.code).json(response);
  } catch (error: any) {
    const response = ApiResponseUtil.error(error.message, 500);
    res.status(response.code).json({ response });
  }
};

export const getPaymentById = async (req: Request, res: Response) => {
  try {
    const payment = await paymentService.getById(req.params.id);
    if (!payment) {
      res.status(404).json({ message: "Payment not found" });
      return;
    }

    const response = ApiResponseUtil.success(
      payment,
      "Payment retrieved successfully"
    );
    res.status(response.code).json(response);
  } catch (error: any) {
    const response = ApiResponseUtil.error(error.message, 400);

    res.status(response.code).json({ response });
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

    const response = ApiResponseUtil.success(
      updatePayment,
      "Payment updated successfully"
    );
    res.status(response.code).json(response);
  } catch (error: any) {
    const response = ApiResponseUtil.error(error.message, 400);
    res.status(response.code).json({ response });
  }
};

export const deletePayment = async (req: Request, res: Response) => {
  try {
    const isDeleted = await paymentService.delete(req.params.id);
    if (!isDeleted) {
      res.status(404).json({ message: "Payment not found" });
      return;
    }

    const response = ApiResponseUtil.success(
      null,
      "Payment deleted successfully"
    );
    res.status(response.code).json(response);
  } catch (error: any) {
    const response = ApiResponseUtil.error(error.message, 400);
    res.status(response.code).json({ response });
  }
};
