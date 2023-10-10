export default {
  get: {
    tags: ["expert"],
    operationId: "getBookings",
    parameters: [
      {
        name: "expert_id",
        in: "path",
        schema: {
          type: "string",
        },
        require: true,
      },
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
        description: "The number of bookings in one page",
      },
    ],
    responses: {},
  },
};
