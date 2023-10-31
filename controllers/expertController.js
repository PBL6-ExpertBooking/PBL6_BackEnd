import expertService from "../services/expertService.js";
import reviewService from "../services/reviewService.js";
import { roles } from "../config/constant.js";

const getExpertsPagination = async (req, res, next) => {
  try {
    const { page, limit, search, major_id } = req.query;
    const isAdmin = req.authData.user.role === roles.ADMIN;
    const pagination = await expertService.fetchExpertsPagination({
      page: page || 1,
      limit: limit || 10,
      isFull: isAdmin,
      search,
      major_id,
    });
    res.json({ pagination });
  } catch (error) {
    next(error);
  }
};

const getCurrentExpertInfo = async (req, res, next) => {
  try {
    const user_id = req.authData.user._id;
    const expert = await expertService.fetchExpertByUserId(user_id);
    res.json({ expert });
  } catch (error) {
    next(error);
  }
};

const getExpertById = async (req, res, next) => {
  try {
    const expert_id = req.params.id;
    const isAdmin = req.authData.user.role === roles.ADMIN;
    const expert = await expertService.fetchExpertById(expert_id, isAdmin);
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

const getCertificatesByExpertId = async (req, res, next) => {
  try {
    const expert_id = req.params.expert_id;
    const certificates = await expertService.fetchCertificatesByExpertId(
      expert_id
    );
    res.json({ certificates });
  } catch (error) {
    next(error);
  }
};

const getVerifiedMajorsByExpertId = async (req, res, next) => {
  try {
    const expert_id = req.params.expert_id;
    const majors = await expertService.fetchVerifiedMajorsByExpertId(expert_id);
    res.json({ majors });
  } catch (error) {
    next(error);
  }
};

const getReviewsByExpertId = async (req, res, next) => {
  try {
    const expert_id = req.params.expert_id;
    const { page, limit } = req.query;
    const pagination = await reviewService.fetchReviewsPaginationByExpertId(
      expert_id,
      page || 1,
      limit || 10
    );
    res.json({ pagination });
  } catch (error) {
    next(error);
  }
};

const getExpertsHavingUnverifiedCert = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const pagination = await expertService.fetchExpertsHavingUnverifiedCert(
      page || 1,
      limit || 10
    );
    res.json({ pagination });
  } catch (error) {
    next(error);
  }
};

const getRecommendedJobRequestsForCurrentExpert = async (req, res, next) => {
  try {
    const { page, limit, major_id } = req.query;
    const user_id = req.authData.user._id;
    const expert = await expertService.fetchExpertByUserId(user_id);
    const pagination =
      await expertService.fetchRecommendedJobRequestsByExpertId(
        expert._id,
        page || 1,
        limit || 10,
        major_id
      );
    res.json({ pagination });
  } catch (error) {
    next(error);
  }
};

export default {
  getExpertsPagination,
  getExpertById,
  verifyExpertById,
  getCertificatesByExpertId,
  getCurrentExpertInfo,
  getVerifiedMajorsByExpertId,
  getReviewsByExpertId,
  getExpertsHavingUnverifiedCert,
  getRecommendedJobRequestsForCurrentExpert,
};
