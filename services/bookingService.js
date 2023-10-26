import httpStatus from "http-status";
import { Booking, ExpertInfo, JobRequest } from "../models/index.js";
import ApiError from "../utils/ApiError.js";
import { booking_status, job_request_status } from "../config/constant.js";

const createBooking = async ({ user_id, job_request_id, price }) => {
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
  if (job_request.status === job_request_status.PROCESSING) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This job is being processed");
  }
  // check duplicate
  if (
    await Booking.exists({ job_request: job_request_id, expert: expert._id })
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You already created booking for this job request"
    );
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

  const booking = await Booking.create({
    expert: expert._id,
    job_request: job_request_id,
    time_booking: new Date(),
    price: price,
    status: booking_status.PENDING,
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
              select: "first_name last_name",
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

const fetchBookingsByJobRequestId = async (job_request_id) => {
  const bookings = await Booking.find({ job_request: job_request_id }).populate(
    [
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
            select: "first_name last_name",
          },
          {
            path: "major",
          },
        ],
      },
    ]
  );
  return bookings;
};

const acceptBooking = async ({ user_id, booking_id }) => {
  const booking = await Booking.findById(booking_id);
  if (!booking) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Booking not found");
  }
  if (booking.status !== booking_status.PENDING) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Booking not pending");
  }
  const job_request = await JobRequest.findById(booking.job_request);
  if (!job_request) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Job request not found");
  }
  if (job_request.status !== job_request_status.PENDING) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Job request not pending");
  }
  if (job_request.user.toString() !== user_id.toString()) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Not authorized");
  }
  job_request.status = job_request_status.PROCESSING;
  await job_request.save();
  booking.status = booking_status.PROCESSING;
  await booking.save();
  return booking;
};

export default {
  createBooking,
  fetchBookingsByExpertId,
  fetchBookingsByJobRequestId,
  acceptBooking,
};
