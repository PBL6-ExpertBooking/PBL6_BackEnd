import createBooking from "./createBooking.js";
import acceptBooking from "./acceptBooking.js";

export default {
  "/bookings": {
    ...createBooking,
  },
  "/bookings/{booking_id}/accept": {
    ...acceptBooking,
  },
};
