import dotenv from "dotenv";

dotenv.config();

export default {
  servers: [
    {
      url: `http://localhost:${process.env.PORT}/v1`,
      description: "Local server",
    },
  ],
};
