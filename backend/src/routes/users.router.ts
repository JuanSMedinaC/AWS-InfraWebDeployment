import express, {Request, Response} from "express";
import  userController from "../controller/user.controller";
import validateSchema from "../middlewares/validate-schema";
import userSchema from  "../schema/user.schema"
import auth from "../middlewares/auth";

export const router =  express.Router();

router.post("/create", validateSchema(userSchema),userController.create);

router.get("/", auth,userController.getAll);
router.post("/login", userController.login);

export default router;

