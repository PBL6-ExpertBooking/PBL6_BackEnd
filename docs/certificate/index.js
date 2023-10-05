import createCertificate from "./createCertificate.js";
import deleteCertificate from "./deleteCertificate.js";

export default {
  "/certificate": {
    ...createCertificate,
  },
  "/certificate/{certificateId}": {
    ...deleteCertificate,
  },
};
