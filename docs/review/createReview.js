export default {
  post: {
    tags: ["review"],
    operationId: "createReview",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              booking_id: {
                type: "string",
                require: true,
              },
              rating: {
                type: "number",
                require: true,
              },
              comment: {
                type: "string",
              },
            },
          },
        },
      },
    },
    responses: {},
  },
};
