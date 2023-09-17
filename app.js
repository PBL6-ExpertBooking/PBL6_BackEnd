import express from "express";
import routes from "./routes/index.js";

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// api routes
app.use("/v1", routes);

export default app;
