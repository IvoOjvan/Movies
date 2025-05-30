import express from "express";
import { collections } from "../database";
import { userSignInSchema, userSignUpSchema } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userRouter = express.Router();
userRouter.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET as string;

userRouter.post("/signup", async (req, res) => {
  try {
    const user = req.body;

    const validatedUser = await userSignUpSchema.validateAsync(user);

    const saltRounds = 10; //num of rounds for bcrypt hashing
    const hashedPassword = await bcrypt.hash(
      validatedUser.password,
      saltRounds
    );

    const newUser = {
      ...validatedUser,
      password: hashedPassword,
      movies: [],
    };
    const result = await collections?.users?.insertOne(newUser);
    console.log(newUser);

    if (result?.acknowledged) {
      //generating JWT token for immediate login after signup
      const token = jwt.sign(
        {
          email: newUser.email,
          userId: result.insertedId.toString(),
        },
        JWT_SECRET,
        { expiresIn: "6h" }
      );
      res.status(200).send({
        message: "Registration successful.",
        token,
        expiresIn: 6 * 60 * 60,
        user: {
          email: newUser.email,
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          userId: result.insertedId.toString(),
        },
      });
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

userRouter.post("/login", async (req, res) => {
  try {
    const signInData = req.body;

    const validSignInData = await userSignInSchema.validateAsync(signInData);
    const query = {
      email: validSignInData.email,
      //password: validSignInData.password,
    };
    const user = await collections?.users?.findOne(query);

    if (user) {
      // Compare provided password with stored hashed password
      const isPasswordValid = await bcrypt.compare(
        validSignInData.password,
        user.password
      );
      if (isPasswordValid) {
        // Generate JWT token
        const token = jwt.sign(
          { email: user.email, userId: user._id?.toString() },
          JWT_SECRET,
          { expiresIn: "6h" }
        );
        res.status(200).send({
          message: "Login successful.",
          token,
          expiresIn: 6 * 60 * 60,
          user: {
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            userId: user._id?.toString(),
          },
        });
      } else {
        res.status(401).send({ message: "Invalid email address or password." });
      }
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
