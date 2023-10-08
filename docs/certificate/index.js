import createCertificate from "./createCertificate.js";
import deleteCertificate from "./deleteCertificate.js";
import verifyCertificate from "./verifyCertificate.js";

export default {
  "/certificates": {
    ...createCertificate,
  },
  "/certificates/{certificateId}": {
    ...deleteCertificate,
  },
  "/certificates/{certificateId}/verify": {
    ...verifyCertificate,
  },
};
