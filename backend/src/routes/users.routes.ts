import express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../database";
import { userSignInSchema, userSignUpSchema } from "../models/user";

export const userRouter = express.Router();
userRouter.use(express.json());

userRouter.post("/sign-up", async (req, res) => {
  try {
    const user = req.body;

    const validatedUser = await userSignUpSchema.validateAsync(user);
    console.log(validatedUser);

    const newUser = {
      ...validatedUser,
      movies: [],
    };
    const result = await collections?.users?.insertOne(newUser);

    if (result?.acknowledged) {
      res.status(200).send({ message: "Registration successful." });
    } else {
      res.status(500).send({ message: "Registration failed." });
    }
  } catch (error: any) {
    if (error.isJoi) {
      res.status(422).json({ message: error.details[0].message });
      return;
    }

    if (error.code === 11000) {
      res.status(409).json({ message: "This email is already registered." });
      return;
    }

    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

userRouter.post("/sign-in", async (req, res) => {
  try {
    const signInData = req.body;

    const validSignInData = await userSignInSchema.validateAsync(signInData);
    const query = {
      email: validSignInData.email,
      password: validSignInData.password,
    };
    const user = await collections?.users?.findOne(query);

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: "Invalid email address or password." });
    }
  } catch (error: any) {
    if (error.isJoi) {
      res.status(422).json({ message: error.details[0].message });
      return;
    }

    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/*

userRouter.get("/:id/favourite", async (req, res) => {
  try {
    const userId = req?.params?.id;
    const user = await collections?.users?.findOne({
      _id: new ObjectId(userId),
    });

    if (!user) {
      res.status(404).send("There is no user with ID: " + userId);
    } else {
      const movies = user.movies;
      res.status(200).send(movies);
    }
  } catch (error) {
    res.status(404).send("Failed to find user with ID: " + req?.body?.id);
  }
});*/

userRouter.post("/:id/favourite", async (req, res) => {
  try {
    const userId = req?.params?.id;
    const movie = req.body;

    const result = await collections?.users?.updateOne(
      { _id: new ObjectId(userId) },
      { $addToSet: { movies: movie } }
    );

    if (result?.matchedCount === 0) {
      res.status(404).send({ error: "User not found" });
    }

    console.log(result);

    if (result?.acknowledged && result?.modifiedCount === 0) {
      res.status(409).send({ error: "This movie is already in favourites." });
    } else {
      res.status(200).send("Movie added to favourites!");
    }
  } catch (error) {
    console.error("Error adding movie to favourites:", error);
    res.status(500).json("Error adding movie to favourites");
  }
});

userRouter.delete("/:id/favourite", async (req, res) => {
  try {
    const userId = req?.params?.id;
    const movieId = req.body.movieId;

    const result = await collections?.users?.updateOne(
      { _id: new ObjectId(userId) },
      { $pull: { movies: { id: movieId } } }
    );

    if (result?.matchedCount === 0) {
      res.status(404).send({ error: "User not found" });
    }

    console.log(result);

    if (result?.acknowledged && result?.modifiedCount === 0) {
      res.status(409).send({ error: "This movie is not in the favourites." });
    } else {
      res.status(200).send("Movie removed from favourites!");
    }
  } catch {
    res
      .status(404)
      .send(
        "Failed to remove movie with ID: " +
          req?.body?.movieId +
          " from favourites."
      );
  }
});
