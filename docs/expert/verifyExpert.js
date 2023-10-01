export default {
  put: {
    tags: ["expert"],
    operationId: "veriryExpert",
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
