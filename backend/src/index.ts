import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { authRouter } from "./routes/authRoutes";
import { userRouter } from "./routes/userRoutes";

export const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Auth JWT API Root Route</h1>");
});

const port = process.env.PORT || 4000;

export const server = app.listen(port, () => {
  console.log(`Server listening on Port ${port}`);
});
