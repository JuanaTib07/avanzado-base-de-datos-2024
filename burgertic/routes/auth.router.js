import Router from "express";
import AuthController from "../controllers/auth.controller.js";

const router = Router();

router.get("/", AuthController.register);
router.get("/:id", AuthController.login);
router.get("/:email", AuthController.login);


export default router;
