import jobRequestService from "../services/jobRequestService.js";
import reviewService from "../services/reviewService.js";

const createJobRequest = async (req, res, next) => {
  try {
    const user_id = req.authData.user._id;
    const { major_id, title, descriptions, address, price } = req.body;
    const job_request = await jobRequestService.createJobRequest({
      user_id,
      major_id,
      title,
      descriptions,
      address,
      price,
    });
    res.json({ job_request });
  } catch (error) {
    next(error);
  }
};

const getJobRequestsPagination = async (req, res, next) => {
  try {
    const { page, limit, major_id } = req.query;
    const pagination = await jobRequestService.fetchJobRequestsPagination(
      page || 1,
      limit || 10,
      major_id
    );
    res.json({ pagination });
  } catch (error) {
    next(error);
  }
};

const getJobRequestById = async (req, res, next) => {
  try {
    const job_request_id = req.params.job_request_id;
    const job_request = await jobRequestService.fetchJobRequestById(
      job_request_id
    );
    res.json({ job_request });
  } catch (error) {
    next(error);
  }
};

const acceptJobRequest = async (req, res, next) => {
  try {
    const user_id = req.authData.user._id;
    const { job_request_id } = req.params;
    const job_request = await jobRequestService.acceptJobRequestByExpert({
      user_id,
      job_request_id,
    });
    res.json({ job_request });
  } catch (error) {
    next(error);
  }
};

const cancelJobRequest = async (req, res, next) => {
  try {
    const user_id = req.authData.user._id;
    const { job_request_id } = req.params;
    const job_request = await jobRequestService.cancelJobRequestByExpert({
      user_id,
      job_request_id,
    });
    res.json({ job_request });
  } catch (error) {
    next(error);
  }
};

const updateJobRequest = async (req, res, next) => {
  try {
    const user_id = req.authData.user._id;
    const { job_request_id } = req.params;
    const { major_id, title, descriptions, address, price } = req.body;
    const job_request = await jobRequestService.updateJobRequest({
      user_id,
      job_request_id,
      major_id,
      title,
      descriptions,
      address,
      price,
    });
    res.json({ job_request });
  } catch (error) {
    next(error);
  }
};

const completeJobRequest = async (req, res, next) => {
  try {
    const user_id = req.authData.user._id;
    const { job_request_id } = req.params;
    const job_request = await jobRequestService.completeJobRequest({
      user_id,
      job_request_id,
    });
    res.json({ job_request });
  } catch (error) {
    next(error);
  }
};

const getReviewByJobRequestId = async (req, res, next) => {
  try {
    const { job_request_id } = req.params;
    const review = await reviewService.fetchReviewByJobRequestId(
      job_request_id
    );
    res.json(review);
  } catch (error) {
    next(error);
  }
};

export default {
  createJobRequest,
  getJobRequestsPagination,
  getJobRequestById,
  acceptJobRequest,
  cancelJobRequest,
  updateJobRequest,
  completeJobRequest,
  getReviewByJobRequestId,
};
