import createMajor from "./createMajor.js";
import getAllMajors from "./getAllMajors.js";

export default {
  "/majors": {
    ...createMajor,
    ...getAllMajors,
  },
};
