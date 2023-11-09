export default {
  get: {
    tags: ["user"],
    operationId: "getTransactions",
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
        description: "The number of transactions in one page",
      },
    ],
    responses: {},
  },
};
