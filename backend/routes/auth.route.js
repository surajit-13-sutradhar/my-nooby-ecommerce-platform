import express from "express"
import { signin, signup, logout, refreshToken, getProfile } from "../controllers/auth.controller.js"
import { protectRoute } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/logout", logout)
router.post("/refresh-token", refreshToken)
router.get("/profile", protectRoute, getProfile)

export default router