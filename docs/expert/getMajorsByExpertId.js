export default {
  get: {
    tags: ["expert"],
    operationId: "getMajorsByExpertId",
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
