import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Need to extend the Express Request Type to allow "user" to be attached to the Request
export interface AuthenticatedRequest extends Request {
  user?: any;
}

// Verify Token Middleware
export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the JsonWebToken from the Request Header
    const token = req.headers?.authorization?.split(" ")[1];
    console.log("verifyToken > token", token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "No JsonWebToken in the req.headers.authorization" });
    }

    try {
      const decodedToken = jwt.verify(token, "some-secret-key");
      // handle the possible error from here later^ (maybe remove the nested try catch)
      console.log("verifyToken > decodedToken", decodedToken);
      req.user = decodedToken;
      next();
    } catch (error) {
      return res
        .status(403)
        .json({ message: "Verifying the JsonWebToken Failed" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "verifyToken Middleware Function Error" });
  }
};
