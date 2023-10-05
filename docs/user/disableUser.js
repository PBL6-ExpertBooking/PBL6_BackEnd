export default {
  put: {
    tags: ["user"],
    operationId: "disableUser",
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
