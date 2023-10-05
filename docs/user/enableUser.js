export default {
  put: {
    tags: ["user"],
    operationId: "enableUser",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "userId",
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
