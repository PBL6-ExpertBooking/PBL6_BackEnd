export default {
  put: {
    tags: ["user"],
    operationId: "updateUserInfo",
    description: "update current user",
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              first_name: {
                type: "string",
              },
              last_name: {
                type: "string",
              },
              gender: {
                type: "string",
              },
              phone: {
                type: "string",
              },
              address: {
                type: "string",
              },
              DoB: {
                type: "string",
              },
              photo: {
                type: "file",
              },
            },
          },
        },
      },
    },
    responses: {},
  },
};
