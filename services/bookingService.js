import httpStatus from "http-status";
import { Booking, ExpertInfo, JobRequest } from "../models/index.js";
import ApiError from "../utils/ApiError.js";
import { booking_status } from "../config/constant.js";

const createBooking = async ({ user_id, job_request_id }) => {
  const expert = await ExpertInfo.findOne({ user: user_id })
    .populate({
      path: "certificates",
      match: { isVerified: true },
    })
    .lean();
  if (!expert) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Expert not found");
  }

  const job_request = await JobRequest.findById(job_request_id).lean();
  if (!job_request) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Job request not found");
  }
  // check expert majors
  const expert_majors = expert.certificates.map((certificate) =>
    certificate.major.toString()
  );
  if (!expert_majors.includes(job_request.major.toString())) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You don't have the major for this job request"
    );
  }
  //check booking's existence
  const isDuplicate = await Booking.exists({
    job_request: job_request_id,
    status: booking_status.PROCESSING,
  });
  if (isDuplicate) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "This job request is already taken"
    );
  }

  const booking = await Booking.create({
    expert: expert._id,
    job_request: job_request_id,
    time_booking: new Date(),
    status: booking_status.PROCESSING,
  });
  return booking;
};

const fetchBookingsByExpertId = async (expert_id, page = 1, limit = 10) => {
  const pagination = await Booking.paginate(
    { expert: expert_id },
    {
      populate: [
        {
          path: "expert",
          populate: [
            {
              path: "user",
              select: "first_name last_name",
            },
          ],
        },
        {
          path: "job_request",
          populate: [
            {
              path: "user",
              select: "first_name, last_name",
            },
            {
              path: "major",
            },
          ],
        },
      ],
      page,
      limit,
      lean: true,
      customLabels: {
        docs: "bookings",
      },
    }
  );
  return pagination;
};

export default {
  createBooking,
  fetchBookingsByExpertId,
};
