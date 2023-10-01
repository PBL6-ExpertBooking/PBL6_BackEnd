import majorService from "../services/majorService.js";

const createMajor = async (req, res, next) => {
  try {
    const { name, descriptions } = req.body;
    const major = await majorService.createMajor({ name, descriptions });
    res.json({ major });
  } catch (error) {
    next(error);
  }
};

const getAllMajors = async (req, res, next) => {
  try {
    const majors = await majorService.fetchAllMajors();
    res.json({ majors });
  } catch (error) {
    next(error);
  }
};

export default {
  createMajor,
  getAllMajors,
};
