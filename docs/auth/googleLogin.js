export default {
  post: {
    tags: ["auth"],
    operationId: "googleLogin",
    parameters: [],
    description: "google auth and store data in 'authData' cookie",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              redirectUrl: {
                type: "string",
                require: false,
              },
            },
          },
        },
      },
    },
    responses: {},
  },
};
