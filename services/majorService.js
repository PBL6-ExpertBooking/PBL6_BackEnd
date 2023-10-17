import { Major } from "../models/index.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";

const createMajor = async ({ name, descriptions }) => {
  if (await Major.exists({ name: name })) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Major's name already exists");
  }
  const major = await Major.create({ name, descriptions });
  return major;
};

const fetchAllMajors = async () => {
  const majors = await Major.find();
  return majors;
};

const fetchMajorById = async (major_id) => {
  const major = await Major.findById(major_id);
  if (!major) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Major not found");
  }
  return major;
};

const updateMajor = async ({ major_id, name, descriptions }) => {
  const major = await Major.findById(major_id);
  if (!major) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Major not found");
  }
  major.name = name || major.name;
  major.descriptions = descriptions || major.descriptions;
  await major.save();
  return major;
};

const deleteMajorById = async (major_id) => {
  await Major.deleteById(major_id);
};

export default {
  createMajor,
  fetchAllMajors,
  fetchMajorById,
  updateMajor,
  deleteMajorById,
};
