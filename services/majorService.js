import { Major } from "../models/index.js";

const createMajor = async ({ name, descriptions }) => {
  const major = await Major.create({ name, descriptions });
  return major;
};

const fetchAllMajors = async () => {
  const majors = await Major.find();
  return majors;
};

export default {
  createMajor,
  fetchAllMajors,
};
