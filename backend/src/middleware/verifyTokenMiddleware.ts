import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Need to extend the Express Request Type to allow "user" to be attached to the Request
export interface AuthenticatedRequest extends Request {
  user?: any;
}

// Verify Token Middleware
export const verifyTokenMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // Get the JsonWebToken from the Request Header
  const token = req.headers?.authorization?.split(" ")[1];
  // console.log("verifyToken > token", token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "No JsonWebToken in the req.headers.authorization" });
  }

  const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET}`);
  // console.log("verifyToken > decodedToken", decodedToken);

  if (!decodedToken) {
    return res
      .status(403)
      .json({ message: "Verifying the JsonWebToken Failed" });
  }

  req.user = decodedToken;
  // console.log("verifyToken > req.user", req.user);

  next();
};
