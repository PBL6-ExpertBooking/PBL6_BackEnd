export default {
  post: {
    tags: ["job_request"],
    operationId: "createJobRequest",
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
              major_id: {
                type: "string",
                require: true,
              },
              title: {
                type: "string",
                require: true,
              },
              descriptions: {
                type: "string",
                require: true,
              },
              address: {
                type: "string",
              },
              budget_min: {
                type: "number",
                require: true,
              },
              budget_max: {
                type: "number",
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
