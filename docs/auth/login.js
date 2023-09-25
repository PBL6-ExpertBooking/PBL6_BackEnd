export default {
  post: {
    tag: ["auth"],
    operationId: "login",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/LoginPayload",
          },
        },
      },
    },
    responses: {
      200: {
        description: "login successfully",
      },
    },
  },
};
