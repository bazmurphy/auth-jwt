import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { database } from "../database/database";

export const registerUser = async (req: Request, res: Response) => {
  const userEmail = req.body.email;
  // console.log("registerUser > userEmail", userEmail);
  const userPassword = req.body.password;
  // console.log("registerUser > userPassword", userPassword);

  if (!userEmail) {
    return res.status(400).json({ message: "You did not provide an email" });
  }
  if (!userPassword) {
    return res.status(400).json({ message: "You did not provide a password" });
  }

  const hashedPassword = await bcrypt.hash(userPassword, 10);
  // console.log("registerUser > hashedPassword", hashedPassword);

  try {
    const createUser = await database.query(
      `INSERT INTO users (email, password) 
        VALUES ($1, $2)
        ON CONFLICT (email) DO NOTHING
        RETURNING id, email`,
      [userEmail, hashedPassword]
    );
    // console.log("registerUser > createUser", createUser);

    if (createUser.rows.length === 0) {
      return res
        .status(409)
        .json({ message: "User with that email already exists" });
    }

    const user = createUser.rows[0];
    // console.log("registerUser > user", user);

    const payload = {
      userId: user.id,
      userEmail: user.email,
    };
    // console.log("registerUser > payload", payload);

    const token = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Registration Successful",
      token,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const userEmail = req.body.email;
  // console.log("loginUser > userEmail", userEmail);
  const userPassword = req.body.password;
  // console.log("loginUser > userPassword", userPassword);

  if (!userEmail) {
    return res.status(400).json({ message: "You did not provide an email" });
  }
  if (!userPassword) {
    return res.status(400).json({ message: "You did not provide a password" });
  }

  try {
    const findUser = await database.query(
      `SELECT * FROM users WHERE email = $1`,
      [userEmail]
    );
    // console.log("loginUser > findUser", findUser);

    const user = findUser.rows[0];
    // console.log("loginUser > user", user);

    if (!user) {
      return res
        .status(404)
        .json({ message: `No user with the email ${userEmail} was found` });
    }

    const validPassword = await bcrypt.compare(userPassword, user.password);
    // console.log("loginUser > validPassword", validPassword);

    if (!validPassword) {
      return res.status(401).json({ message: `The password was incorrect` });
    }

    // Create the JsonWebToken Payload
    const payload = {
      userId: user.id,
      userEmail: user.email,
    };
    // console.log("loginUser > payload", payload);

    // Sign the JsonWebToken
    const token = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Login Successful",
      token,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export interface DecodedToken extends JwtPayload {
  userId: string;
  userEmail: string;
}

export const verifyToken = (req: Request, res: Response) => {
  // Get the JsonWebToken from the Request Header
  const token = req.headers?.authorization?.split(" ")[1];
  // console.log("verifyToken > token", token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "No JsonWebToken in the req.headers.authorization" });
  }

  const decodedToken = jwt.verify(
    token,
    `${process.env.JWT_SECRET}`
  ) as DecodedToken; // this typing is a bit hacky
  // console.log("verifyToken > decodedToken", decodedToken);

  if (!decodedToken) {
    return res.status(401).json({ message: "JsonWebToken was not Verified" });
  }

  return res.status(200).json({ message: "JsonWebToken was Verified" });
};
