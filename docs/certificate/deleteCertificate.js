export default {
  delete: {
    tags: ["certificate"],
    operationId: "deleteCertificate",
    description: "delete a certificate of current expert",
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
