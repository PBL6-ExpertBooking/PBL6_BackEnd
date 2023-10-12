import bookingService from "../services/bookingService.js";

const createBooking = async (req, res, next) => {
  try {
    const user_id = req.authData.user._id;
    const { job_request_id } = req.body;
    const booking = await bookingService.createBooking({
      user_id,
      job_request_id,
    });
    res.json({ booking });
  } catch (error) {
    next(error);
  }
};

export default {
  createBooking,
};
