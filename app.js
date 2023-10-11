import express from "express";
import session from "express-session";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import docs from "./docs/index.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: process.env.SESSION_COOKIE_MAXAGE_DAYS * 24 * 60 * 60 * 1000,
      sameSite: "lax", //"none"
      secure: false,
    },
  })
);

// parse json request body
app.use(express.json({ limit: "10mb" }));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// api routes
app.use("/v1", routes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));

app.use(errorHandler.converter);
app.use(errorHandler.notFound);

export default app;
