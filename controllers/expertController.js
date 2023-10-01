import expertService from "../services/expertService.js";

const getExpertsPagination = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const pagination = await expertService.fetchExpertsPagination(
      page || 1,
      limit || 10
    );
    res.json({ pagination });
  } catch (error) {
    next(error);
  }
};

const getExpertById = async (req, res, next) => {
  try {
    const expert_id = req.params.id;
    const expert = await expertService.fetchExpertById(expert_id);
    res.json({ expert });
  } catch (error) {
    next(error);
  }
};

const verifyExpertById = async (req, res, next) => {
  try {
    const expert_id = req.params.id;
    const expert = await expertService.verifyExpertById(expert_id);
    res.json({ expert });
  } catch (error) {
    next(error);
  }
};

export default {
  getExpertsPagination,
  getExpertById,
  verifyExpertById,
};
