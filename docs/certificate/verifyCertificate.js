export default {
  put: {
    tags: ["certificate"],
    operationId: "verifyCertificate",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "certificateId",
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
