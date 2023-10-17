import jobRequestService from "../services/jobRequestService.js";

const createJobRequest = async (req, res, next) => {
  try {
    const user_id = req.authData.user._id;
    const { major_id, descriptions, address, budget_min, budget_max } =
      req.body;
    const job_request = jobRequestService.createJobRequest({
      user_id,
      major_id,
      descriptions,
      address,
      budget_min,
      budget_max,
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

export default {
  createJobRequest,
  getJobRequestsPagination,
  getJobRequestById,
};
