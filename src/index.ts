import express from "express";
import type { Application, Request, Response } from "express";
import initializeApp from "./loaders/initializeApp";
import config from "./config";
import userRouter from "./api/routes/userRoutes";

const app: Application = express();
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

void initializeApp();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello! This is the API for MyOnlyPans!");
});

app.use("/user", userRouter);

app.listen(config.PORT, () => {
  console.log(`Server is running on http://localhost:${config.PORT}`);
});
