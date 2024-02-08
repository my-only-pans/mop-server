import express from "express";
import registerUser from "../controllers/registerUser";
import loginUser from "../controllers/loginUser";

const userRouter = express.Router();

userRouter.post("/", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
