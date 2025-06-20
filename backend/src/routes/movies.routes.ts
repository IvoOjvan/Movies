import express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../database";
import { movieSchema } from "../models/movie";

export const movieRouter = express.Router();
movieRouter.use(express.json());

// GET all movies for user
movieRouter.get("/favourites", async (req, res) => {
  try {
    const userId = req.user.userId;
    const query = { _id: new ObjectId(userId) };

    const user = await collections.users?.findOne(query);
    const movies = user?.movies;

    if (movies) {
      res.status(200).send(movies);
    } else {
      res.status(404).send({ message: "No movies marked as favourite." });
    }
  } catch (error) {
    res.status(500).send({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

movieRouter.get("/favourites/:movieId", async (req, res) => {
  try {
    const userId = req.body.userId;
    const movieId = Number(req?.params?.movieId);

    const query = { _id: new ObjectId(userId) };
    const user = await collections?.users?.findOne(query);

    const movie = user?.movies.filter((movie) => movie.id === movieId);

    if (movie) {
      res.status(200).send(movie);
    } else {
      res.status(404).send({ message: "No such movie with id: " + movieId });
    }
  } catch (error) {
    res
      .status(404)
      .send({ message: "Failed to find movie: ID " + req?.params?.movieId });
  }
});

movieRouter.post("/:movieId/favourite", async (req, res) => {
  try {
    const movie = req.body.movie;
    const userId = req.user.userId;

    const user = await collections.users?.findOne({
      _id: new ObjectId(userId),
    });
    const validMovieData = await movieSchema.validateAsync(movie);

    if (user?.movies.some((movie) => movie.id === validMovieData.id)) {
      res
        .status(404)
        .json({ message: "Movie is already marked as favourite." });
      return;
    }

    const query = { _id: new ObjectId(userId) };
    const result = await collections.users?.updateOne(query, {
      $addToSet: { movies: validMovieData },
    });

    if (result?.acknowledged) {
      res
        .status(200)
        .send({ message: "Movie added to favourites successfully." });
    } else {
      res.status(500).send({ message: "Failed to add movie to favourites." });
    }
  } catch (error: any) {
    if (error.isJoi) {
      res.status(422).json({ message: error.details[0].message });
      return;
    }

    console.error(error);
    res.status(400).send({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

movieRouter.delete("/:movieId/favourite", async (req, res) => {
  try {
    const movieId = Number(req?.params?.movieId);
    const userId = req.user.userId;

    const query = { _id: new ObjectId(userId) };
    const result = await collections.users?.updateOne(query, {
      $pull: { movies: { id: movieId } },
    });

    if (result?.acknowledged && result.modifiedCount > 0) {
      res.status(202).send({
        message: `Removed movie with ID: ${movieId} from favourites.`,
      });
    } else if (result?.modifiedCount === 0) {
      res.status(404).send({
        message: `Movie with ID: ${movieId} not found in favourites.`,
      });
    } else {
      res
        .status(500)
        .send({ message: "Failed to remove the movie from favourites." });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(message);
    res.status(400).send({ message });
  }
});
