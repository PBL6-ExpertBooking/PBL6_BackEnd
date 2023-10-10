import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { booking_status } from "../config/constant.js";

const bookingSchema = new mongoose.Schema(
  {
    expert: { type: mongoose.Schema.ObjectId, ref: "ExpertInfo" },
    job_request: { type: mongoose.Schema.ObjectId, ref: "JobRequest" },
    time_booking: Date,
    payment_type: String,
    price: Number,
    status: { type: String, enum: Object.values(booking_status) },
    time_of_payment: Date,
  },
  {
    collection: "booking",
    timestamps: true,
  }
);

bookingSchema.plugin(mongoosePaginate);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
