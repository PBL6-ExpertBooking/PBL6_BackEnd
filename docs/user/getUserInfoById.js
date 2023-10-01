export default {
  get: {
    tags: ["user"],
    operationId: "getUserInfoById",
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
