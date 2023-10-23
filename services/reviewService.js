import httpStatus from "http-status";
import { Review, User, Booking, ExpertInfo } from "../models/index.js";
import ApiError from "../utils/ApiError.js";

const createReview = async ({ user_id, booking_id, rating, comment }) => {
  if (!(await User.findById(user_id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }
  const booking = await Booking.findById(booking_id)
    .populate("job_request")
    .lean();
  if (!booking) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Booking not found");
  }
  if (booking.job_request.user.toString() !== user_id.toString()) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You are not the user who requested this job"
    );
  }
  // TODO: check booking status

  const expert = await ExpertInfo.findById(booking.expert);
  if (!expert) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Expert not found");
  }

  if (await Review.exists({ user: user_id, booking: booking_id })) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You already reviewed this booking"
    );
  }

  const review = await Review.create({
    user: user_id,
    expert: expert._id,
    booking: booking_id,
    rating: rating,
    comment: comment,
  });

  // calculate average_rating
  const total_rating = expert.average_rating * expert.rating_count + rating;
  const average_rating = total_rating / (expert.rating_count + 1);

  expert.rating_count = expert.rating_count + 1;
  expert.average_rating = average_rating;
  await expert.save();
  return review;
};

const fetchReviewsPaginationByExpertId = async (
  expert_id,
  page = 1,
  limit = 10
) => {
  const pagination = await Review.paginate(
    { expert: expert_id },
    {
      populate: [
        {
          path: "user",
          select: "first_name last_name",
        },
      ],
      page,
      limit,
      lean: true,
      customLabels: {
        docs: "reviews",
      },
    }
  );
  return pagination;
};

export default {
  createReview,
  fetchReviewsPaginationByExpertId,
};
