import { Router } from "express";

import {
  getCurrentUser,
  updateUser,
  getApplicationStats,
} from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middlewares/validationMiddleware.js";
import {
  authorizePermissions,
  checkForTestUser,
} from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const router = Router();

router.route("/current-user").get(getCurrentUser);
router
  .route("/admin/app-stats")
  .get(authorizePermissions("admin"), getApplicationStats);
router
  .route("/update-user")
  .patch(
    checkForTestUser,
    upload.single("avatar"),
    validateUpdateUserInput,
    updateUser
  );

export default router;

//
