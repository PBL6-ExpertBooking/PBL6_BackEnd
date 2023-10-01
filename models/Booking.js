import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    expert: { type: mongoose.Schema.ObjectId, ref: "User" },
    time_booking: Date,
    payment_type: String,
    price: Number,
    status: { type: String, enum: ["PROCESSING", "CANCELED", "DONE"] },
    time_of_payment: Date,
  },
  { collection: "booking" }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
