export default {
  get: {
    tags: ["expert"],
    operationId: "getExpertInfo",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "expertId",
        in: "path",
        schema: {
          type: "string",
        },
        require: true,
      },
    ],
    responses: {},
  },
};
