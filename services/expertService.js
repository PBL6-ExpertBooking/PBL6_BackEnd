import httpStatus from "http-status";
import { ExpertInfo, Certificate } from "../models/index.js";
import ApiError from "../utils/ApiError.js";

const fetchExpertsPagination = async (page = 1, limit = 10) => {
  const pagination = await ExpertInfo.paginate(
    {},
    {
      populate: [
        {
          path: "user",
          select:
            "first_name last_name gender phone address photo_url DoB email username role isRestricted isConfirmed",
        },
        {
          path: "certificates",
        },
      ],
      page,
      limit,
      lean: true,
      customLabels: {
        docs: "experts",
      },
    }
  );
  return pagination;
};

const fetchExpertById = async (expert_id) => {
  const expert = await ExpertInfo.findById(expert_id)
    .populate(
      "user",
      "first_name last_name gender phone address photo_url DoB email username role isRestricted"
    )
    .populate({
      path: "certificates",
      populate: {
        path: "major",
      },
    })
    .lean();
  if (!expert) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Expert not found");
  }
  return expert;
};

const fetchExpertByUserId = async (user_id) => {
  const expert = await ExpertInfo.findOne({ user: user_id })
    .populate(
      "user",
      "first_name last_name gender phone address photo_url DoB email username role isRestricted"
    )
    .populate({
      path: "certificates",
      populate: {
        path: "major",
      },
    })
    .lean();
  if (!expert) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Expert not found");
  }
  return expert;
};

const fetchCertificatesByExpertId = async (expert_id) => {
  const expert = await ExpertInfo.findById(expert_id, {
    select: "certificates",
  })
    .populate({
      path: "certificates",
      populate: {
        path: "major",
      },
    })
    .lean();
  return expert.certificates;
};

const fetchUnverifiedCertificatesByExpertId = async (expert_id) => {
  const expert = await ExpertInfo.findById(expert_id)
    .populate({ path: "certificates", match: { isVerified: false } })
    .lean();
  return expert.certificates;
};

const fetchVerifiedMajorsByExpertId = async (expert_id) => {
  const expert = await ExpertInfo.findById(expert_id, {
    select: "certificates",
  }).populate({
    path: "certificates",
    populate: {
      path: "major",
    },
    match: { isVerified: true },
  });

  if (!expert) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Expert not found");
  }

  const majors = expert.certificates.map((certificate) => certificate.major);
  return majors;
};

export default {
  fetchExpertsPagination,
  fetchExpertById,
  fetchCertificatesByExpertId,
  fetchExpertByUserId,
  fetchUnverifiedCertificatesByExpertId,
  fetchVerifiedMajorsByExpertId,
};
