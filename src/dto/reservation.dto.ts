import { PaymentResponseDto } from "./payment.dto";

export interface CreateReservationDto {
  roomId: string;
  checkInDate: string; // Format: YYYY-MM-DD
  checkOutDate: string; // Format: YYYY-MM-DD
  totalAmount: number;
}

export interface UpdateReservationDto {
  roomId?: string;
  checkInDate?: string;
  checkOutDate?: string;
  totalAmount?: number;
}

export interface ReservationResponseDto {
  id: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  room?: {
    id: string;
    roomNumber: string;
    roomType?: {
      id: number;
      name: string;
    };
  };
  payments?: PaymentResponseDto[];
}
