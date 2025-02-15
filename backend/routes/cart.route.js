import express from "express"
import { getCartProducts, deleteAllFromCart, addToCart, updateQuantity } from "../controllers/cart.controller.js"
import { protectRoute } from "../middlewares/auth.middleware.js"

const router = express.Router()

// 
router.get("/", protectRoute, getCartProducts)
router.post("/", protectRoute, addToCart)
router.delete("/", protectRoute, deleteAllFromCart)
router.put("/:id", protectRoute, updateQuantity)  //update quantity of a product in the cart

export default router
