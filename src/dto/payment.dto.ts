export interface CreatePaymentDto {
  reservationId: string;
  amount: number;
}

export interface UpdatePaymentDto {
  amount?: number;
}

export interface PaymentResponseDto {
  id: string;
  reservationId: string;
  amount: number;
  paidAt: string;
  reservation?: {
    id: string;
    checkInDate: string;
    checkOutDate: string;
    totalAmount: number;
  };
}
