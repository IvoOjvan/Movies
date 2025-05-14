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
