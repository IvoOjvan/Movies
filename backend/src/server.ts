import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import { movieRouter } from "./routes/movies.routes";
import { userRouter } from "./routes/users.routes";
import { authenticateToken } from "./middleware/auth";

const { ATLAS_URI } = process.env;
const JWT_SECRET = process.env.JWT_SECRET;

if (!ATLAS_URI) {
  console.error(
    "No ATLAS_URI enviroment variable has been defined in config.env"
  );
  process.exit(1);
}

if (!JWT_SECRET) {
  console.error("No JWT_SECRET environment variable has been defined!");
  process.exit(1);
}

connectToDatabase(ATLAS_URI)
  .then(() => {
    const app = express();
    app.use(
      cors({
        origin: "http://localhost:4200",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        credentials: true,
      })
    );
    app.use(express.json());

    app.use("/movies", authenticateToken, movieRouter);
    app.use("/user", userRouter);

    app.listen(5200, () => {
      console.log("Server running at http://localhost:5200");
    });
  })
  .catch((error) => console.error(error));
