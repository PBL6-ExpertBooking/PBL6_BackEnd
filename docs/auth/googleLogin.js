export default {
  post: {
    tags: ["auth"],
    operationId: "googleLogin",
    parameters: [],
    requestBody: {
      type: "object",
      properties: {
        redirectUrl: {
          type: "string",
        },
      },
    },
    responses: {},
  },
};
