export default {
  get: {
    tags: ["user"],
    operationId: "getUserInfo",
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {},
  },
};
