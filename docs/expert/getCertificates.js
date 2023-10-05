export default {
  get: {
    tags: ["expert"],
    operationId: "getCertificates",
    decription: "get all certificates of current expert",
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
