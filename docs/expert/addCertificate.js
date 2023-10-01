export default {
  post: {
    tags: ["expert"],
    operationId: "addCertificate",
    description: "add certificate to current expert",
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              photo: {
                type: "file",
              },
            },
          },
        },
      },
    },
    responses: {},
  },
};
