export default {
  get: {
    tags: ["expert"],
    operationId: "getAllExperts",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "page",
        in: "query",
        schema: {
          type: "integer",
        },
      },
      {
        name: "limit",
        in: "query",
        schema: {
          type: "integer",
        },
        description: "The number of experts in one page",
      },
    ],
    responses: {},
  },
};
