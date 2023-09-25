import dotenv from "dotenv";

dotenv.config();

export default {
  servers: [
    {
      url: `http://localhost:${process.env.PORT}/v1`,
      description: "Local server",
    },
    {
      url: `https://pbl6-server.onrender.com/v1`,
      description: "Hosting",
    },
  ],
};
