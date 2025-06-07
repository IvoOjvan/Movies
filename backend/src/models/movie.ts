import * as mongodb from "mongodb";
import Joi from "joi";

export interface Movie {
  _id?: mongodb.ObjectId;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const movieSchema = Joi.object({
  adult: Joi.boolean().required(),
  backdrop_path: Joi.string().required(),
  genre_ids: Joi.array<number>(),
  id: Joi.number().required(),
  original_language: Joi.string(),
  original_title: Joi.string().required(),
  overview: Joi.string().required(),
  popularity: Joi.number().required(),
  poster_path: Joi.string().required(),
  release_date: Joi.string().required(),
  title: Joi.string().required(),
  video: Joi.boolean().required(),
  vote_average: Joi.number().required(),
  vote_count: Joi.number().required(),
});
