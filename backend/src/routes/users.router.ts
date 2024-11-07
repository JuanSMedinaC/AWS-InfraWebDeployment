import express, {Request, Response} from "express";
import  userController from "../controller/user.controller";

export const router =  express.Router();

router.post("/create", userController.create);

export default router;
