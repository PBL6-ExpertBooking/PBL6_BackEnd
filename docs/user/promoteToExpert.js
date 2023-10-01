export default {
  post: {
    tags: ["user"],
    operationId: "promoteToExpert",
    description: "used for user to promote to expert",
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              major_names: {
                type: "array",
                items: {
                  type: "string",
                },
                require: true,
              },
              descriptions: {
                type: "string",
                require: true,
              },
            },
          },
        },
      },
    },
    responses: {},
  },
};
