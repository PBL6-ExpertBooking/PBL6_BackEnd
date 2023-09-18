import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// api routes
app.use("/v1", routes);

app.use(errorHandler.converter);
app.use(errorHandler.notFound);

export default app;
