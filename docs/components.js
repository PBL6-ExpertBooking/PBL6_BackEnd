import authSchemas from "./auth/schemas.js";

export default {
  components: {
    schemas: {
      ...authSchemas,
      user: {
        type: "object",
        properties: {
          _id: {
            type: "string",
          },
          first_name: {
            type: "string",
          },
          last_name: {
            type: "string",
          },
          photo_url: {
            type: "string",
          },
          email: {
            type: "string",
          },
          username: {
            type: "string",
          },
          role: {
            type: "string",
          },
          isRestriced: {
            type: "bool",
          },
        },
      },
    },
  },
};
