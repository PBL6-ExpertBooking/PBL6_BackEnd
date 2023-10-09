export default {
  post: {
    tags: ["booking"],
    operationId: "createBooking",
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
              job_request_id: {
                type: "string",
                require: true,
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "register successfully",
      },
    },
  },
};
