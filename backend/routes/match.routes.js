import express from "express";
import { protectRoute } from "../middleware/auth";

const router = express.Router();

router.post("/swipe-right/:likedUserId", protectRoute,);
router.post("/swipe-left/:dislikedUserId", protectRoute,);

router.get("/", protectRoute);
router.get("/user-profiles", protectRoute);

export default router;