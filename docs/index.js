import basicInfo from "./basicInfo.js";
import servers from "./servers.js";
import tags from "./tags.js";
import components from "./components.js";
import auth from "./auth/index.js";
import user from "./user/index.js";

export default {
  ...basicInfo,
  ...servers,
  ...tags,
  ...components,
  paths: {
    ...auth,
    ...user,
  },
};
