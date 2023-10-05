import httpStatus from "http-status";
import { Certificate, ExpertInfo, Major } from "../models/index.js";
import imageService from "./imageService.js";
import ApiError from "../utils/ApiError.js";

const createCertificate = async ({
  user_id,
  name,
  major_id,
  descriptions,
  photo,
}) => {
  const expert = await ExpertInfo.findOne({ user: user_id });
  if (!expert) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Expert not found");
  }

  if (!(await Major.exists({ _id: major_id }))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Major not found");
  }

  // upload image
  const response = await imageService.uploadImage(photo);

  const certificate = new Certificate({
    name,
    major: major_id,
    descriptions,
    photo_url: response.url,
    photo_public_id: response.public_id,
    isVerified: false,
  });
  await certificate.save();

  expert.certificates.push(certificate);
  await expert.save();
  return certificate;
};

export default {
  createCertificate,
};
