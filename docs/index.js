import basicInfo from "./basicInfo.js";
import servers from "./servers.js";
import tags from "./tags.js";
import components from "./components.js";
import auth from "./auth/index.js";

export default {
  ...basicInfo,
  ...servers,
  ...tags,
  ...components,
  ...auth,
};
