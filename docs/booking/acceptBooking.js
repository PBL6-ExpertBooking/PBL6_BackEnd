export default {
  post: {
    tags: ["booking"],
    operationId: "acceptBooking",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "booking_id",
        in: "path",
        schema: {
          type: "string",
        },
        require: true,
      },
    ],
    responses: {},
  },
};
