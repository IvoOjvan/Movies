import * as mongodb from "mongodb";
import { Movie } from "./movie";
import Joi from "joi";

export interface User {
  _id?: mongodb.ObjectId;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  movies: Movie[];
}

/*
  movies - will always be empty array when creating user
  _id - is auto generated
*/
export const userSignUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).alphanum().required(),
  firstname: Joi.string().min(2).max(25).required(),
  lastname: Joi.string().min(2).max(25).required(),
});

export const userSignInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).alphanum().required(),
});
