import { Router } from "express";
const router = Router();
import { login, logout, register } from "../controllers/authController.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middlewares/validationMiddleware.js";
import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    msg: "Too many requests from this IP, please try again after 15 minutes",
  },
});

router.route("/register").post(apiLimiter, validateRegisterInput, register);
router.route("/login").post(apiLimiter, validateLoginInput, login);
router.route("/logout").get(logout);

export default router;
