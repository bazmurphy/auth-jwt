import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { authRouter } from "./routes/authRoutes";
import { userRouter } from "./routes/userRoutes";

export const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Root Route");
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

const port = process.env.PORT || 4000;

export const server = app.listen(port, () => {
  console.log(`Server listening on Port ${port}`);
});
