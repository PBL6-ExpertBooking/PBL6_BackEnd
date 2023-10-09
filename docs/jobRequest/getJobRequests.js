export default {
  get: {
    tags: ["job_request"],
    operationId: "getJobRequests",
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
        description: "The number of job requests in one page",
      },
    ],
    responses: {},
  },
};