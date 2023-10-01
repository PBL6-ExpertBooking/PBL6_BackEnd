import getAllExperts from "./getAllExperts.js";
import getExpertInfoById from "./getExpertInfoById.js";
import verifyExpert from "./verifyExpert.js";
import addCertificate from "./addCertificate.js";
import getCertificates from "./getCertificates.js";
import getCurrentExpertInfo from "./getCurrentExpertInfo.js";

export default {
  "/expert/all": {
    ...getAllExperts,
  },
  "/expert/info": {
    ...getCurrentExpertInfo,
  },
  "/expert/info/{expertId}": {
    ...getExpertInfoById,
  },
  "/expert/verify/{expertId}": {
    ...verifyExpert,
  },
  "/expert/certificates": {
    ...addCertificate,
  },
  "/expert/certificates/{expertId}": {
    ...getCertificates,
  },
};
