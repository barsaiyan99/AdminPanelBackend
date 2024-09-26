import express from "express";
import Protect from "../middleware/authMiddleware.js";
import * as userController from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.post("/signup", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/verify",Protect,userController.verifyUser);
userRouter.post("/checkemail", userController.checkUserEmail);
userRouter.post("/reset/:id", userController.resetPassword);
userRouter.post("/dashboard/create",userController.createInvoice);
userRouter.get("/dashboard/list",userController.getList);
userRouter.get("/dashboard/edit/:id",userController.editList);
userRouter.post("/dashboard/edit/:id",userController.editForm);
userRouter.delete("/dashboard/list/delete/:id",userController.deleteList);