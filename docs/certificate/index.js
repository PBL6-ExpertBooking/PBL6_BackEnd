import createCertificate from "./createCertificate.js";
import deleteCertificate from "./deleteCertificate.js";
import verifyCertificate from "./verifyCertificate.js";

export default {
  "/certificate": {
    ...createCertificate,
  },
  "/certificate/{certificateId}": {
    ...deleteCertificate,
  },
  "/certificate/verify/{certificateId}": {
    ...verifyCertificate,
  },
};
