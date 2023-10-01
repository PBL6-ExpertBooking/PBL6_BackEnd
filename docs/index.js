import basicInfo from "./basicInfo.js";
import servers from "./servers.js";
import tags from "./tags.js";
import components from "./components.js";
import auth from "./auth/index.js";
import user from "./user/index.js";
import expert from "./expert/index.js";
import major from "./major/index.js";

export default {
  ...basicInfo,
  ...servers,
  ...tags,
  ...components,
  paths: {
    ...auth,
    ...user,
    ...expert,
    ...major,
  },
};
