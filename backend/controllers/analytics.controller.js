import User from "../models/user.model.js"
import Product from "../models/product.model.js"

export const getAnalyticsData = async (req, res) => {
    const totalUsers = await User.countDocuments()  
    const totalProducts = await Product.countDocuments()
    // Counts documents matching a query. Can be slower for large collections as it checks indexes.


    const salesData = await Order.aggregate([
    {
        $group: {
            _id: null, // Groups all the documents together
            totalSales: { $sum: 1 }, // Counts the total number of orders
            totalRevenue: { $sum: "$totalAmount" } // Sums up all the totalAmount fields
        }
    }
])


    const {totalSales, totalRevenue} = salesData[0] || {totalSales: 0, totalRevenue: 0}

    return{
        users: totalUsers,
        products: totalProducts,
        totalSales,
        totalRevenue
    }
}

export const getDailySalesData = async (startDate, endDate) => {
    try {
        const dailySalesData = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lt: endDate
                    }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    totalSales: { $sum: 1 },
                    totalRevenue: { $sum: "$totalAmount" }
                },
            },
            {$sort: { _id: 1 }}
        ])
        // Example of dailySalesData
        // [
        //     {
        //         _id: "2025-02-19",
        //         sales: 13,
        //         revenue: 1200.50
        //     }
        // ]
    
        const dateArray = getDatesInRange(startDate, endDate)
        // console.log(dateArray)
    
        // Example of dateArray to get the daily sales data
        return dateArray.map(date => {
            // This will convert the date
            const formattedDate = date.toISOString().split("T")[0]
            const foundData = dailySalesData.find(data => data._id === formattedDate) || {totalSales: 0, totalRevenue: 0}
            return {
                date: formattedDate,
                sales: foundData?.totalSales || 0,
                revenue: foundData?.totalRevenue || 0
            }
        })
    } catch (error) {
        console.log("Error in getDailySalesData controller: ", error.message)
        throw error
    }
}

// Helper function to get all the dates in the range
function getDatesInRange(startDate, endDate) {
    const dates = []
    let currentDate = startDate
    while(currentDate <= endDate) {
        dates.push(currentDate)
        currentDate = new Date(currentDate.getTime() + 24*60*60*1000)
    }
    return dates
}