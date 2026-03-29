import {Router} from 'express';
import * as authController from './AuthController.js'

const router = Router();

router.post("/signup",authController.signup);
router.post("/signin",authController.signin);
router.post("/verify",authController.verify);
// router.post("/logout",authController.logout);

export default router;
