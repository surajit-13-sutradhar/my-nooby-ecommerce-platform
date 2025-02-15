import express from "express"
import { getAllProducts, getFeaturedProducts, getRecommendedProducts, createProduct, deleteProduct, toggleFeaturedProduct, getProductsByCategory } from "../controllers/product.controller.js"
import { protectRoute, adminRoute } from "../middlewares/auth.middleware.js"

const router = express.Router()

// GET /api/products. These routes are protected and only accessible by admin users
router.get("/", protectRoute, adminRoute, getAllProducts)
router.get("/featured", getFeaturedProducts)
router.get("/category/:category", getProductsByCategory)
router.get("/recommendations", getRecommendedProducts)
// This route is public and accessible by everyone
router.post("/", protectRoute, adminRoute, createProduct)
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct)
router.delete("/:id", protectRoute, adminRoute, deleteProduct)

export default router