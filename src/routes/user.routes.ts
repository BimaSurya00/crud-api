import { Router } from "express";
import {
  createPayment,
  deletePayment,
  getAllPayment,
  getPaymentById,
  updatePayment,
} from "../controllers/payment.controller";
import {
  addPaymentToReservation,
  createReservation,
  deleteReservation,
  getAllReservation,
  getReservationById,
  getReservationPaymentSummary,
  updateReservation,
} from "../controllers/reservation.controller";
import {
  createRoomType,
  deleteRoomType,
  getAllRoomType,
  getRoomTypeById,
  updateRoomType,
} from "../controllers/room-type.controller";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
} from "../controllers/room.controller";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller";

const router = Router();

// User routes
router.post("/users", createUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// Room Type routes
router.post("/room-types", createRoomType);
router.get("/room-types", getAllRoomType);
router.get("/room-types/:id", getRoomTypeById);
router.put("/room-types/:id", updateRoomType);
router.delete("/room-types/:id", deleteRoomType);

// Room routes
router.post("/room", createRoom);
router.get("/room", getAllRooms);
router.get("/room/:id", getRoomById);
router.put("/room/:id", updateRoom);
router.delete("/room/:id", deleteRoom);

// Reservation routes
router.post("/reservation", createReservation);
router.get("/reservation", getAllReservation);
router.get("/reservation/:id", getReservationById);
router.put("/reservation/:id", updateReservation);
router.delete("/reservation/:id", deleteReservation);
// Payment routes for reservations
router.post("/reservation/:id/payments", addPaymentToReservation);
router.get("/reservation/:id/payments", getReservationPaymentSummary);
router.get("/reservation/:id/payments/summary", getReservationPaymentSummary);

// Payment routes
router.post("/payment", createPayment);
router.get("/payment", getAllPayment);
router.get("/payment/:id", getPaymentById);
router.put("/payment/:id", updatePayment);
router.delete("/payment/:id", deletePayment);

export default router;
