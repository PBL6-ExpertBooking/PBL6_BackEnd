import httpStatus from "http-status";
import { ExpertInfo, Certificate } from "../models/index.js";
import ApiError from "../utils/ApiError.js";
import imageService from "./imageService.js";

const fetchExpertsPagination = async (page = 1, limit = 10) => {
  const pagination = await ExpertInfo.paginate(
    {},
    {
      populate: [
        {
          path: "user",
          select:
            "first_name last_name gender phone address photo_url DoB email username role isRestricted",
        },
        {
          path: "majors",
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
    .populate("majors")
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
    .populate("majors")
    .lean();
  if (!expert) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Expert not found");
  }
  return expert;
};

const verifyExpertById = async (expert_id) => {
  let expert = await ExpertInfo.findById(expert_id);
  if (!expert) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Expert not found");
  }
  await expert.updateOne({ isVerified: true });
  return expert;
};

const addCertificate = async ({ user_id, name, photo }) => {
  const expert = await ExpertInfo.findOne({ user: user_id });
  if (!expert) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Expert not found");
  }

  // upload image
  const response = await imageService.uploadImage(photo);

  const certificate = new Certificate({
    name,
    photo_url: response.url,
    photo_public_id: response.public_id,
  });
  await certificate.save();

  expert.certificates.push(certificate);
  await expert.save();
  return certificate;
};

const fetchCertificatesByExpertId = async (expert_id) => {
  const expert = await ExpertInfo.findById(expert_id)
    .populate("certificates")
    .lean();
  return expert.certificates;
};

export default {
  fetchExpertsPagination,
  fetchExpertById,
  verifyExpertById,
  addCertificate,
  fetchCertificatesByExpertId,
  fetchExpertByUserId,
};
