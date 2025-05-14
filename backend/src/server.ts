import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import { movieRouter } from "./routes/movies.routes";
import { userRouter } from "./routes/users.routes";

dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
  console.error(
    "No ATLAS_URI enviroment variable has been defined in config.env"
  );
  process.exit(1);
}

connectToDatabase(ATLAS_URI)
  .then(() => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use("/movies", movieRouter);
    app.use("/user", userRouter);

    app.listen(5200, () => {
      console.log("Server running at http://localhost:5200");
    });
  })
  .catch((error) => console.error(error));
