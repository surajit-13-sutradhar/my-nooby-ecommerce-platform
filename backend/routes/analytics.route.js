import express from "express"
import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js"
import { getAnalyticsData } from "../controllers/analytics.controller.js"

const router = express.Router()

// This
router.get("/", protectRoute, adminRoute, async (req, res) => {
    try {
        const analyticsData = await getAnalyticsData()

        const startDate = new Date()
        const endDate = new Date(endDate.getTime() - 7*24*60*60*1000)

        const dailySalesData = await getDailySalesData(startDate, endDate)

        res.json({
            analyticsData, 
            dailySalesData
        })
    } catch (error) {
        console.log("Error in analytics route: ", error.message)
        res.status(500).json({message: "Server Error", error: error.message}) 
    }
})

export default router