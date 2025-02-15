import Product from "../models/product.model.js"

// Getting cart products
export const getCartProducts = async (req, res) => {
    try {
        const products = await Product.find({ _id: { $in: req.user.cartItems }})
        // Ass quantity for each product
        const cartItems = products.map(product => {
            const item = req.user.cartItems.find(cartItem => cartItem.id === product.id)
            return {...product.toJSON(), quantity: item.quantity}
        })
        res.json(cartItems)
    } catch (error) {
       console.log("Error in getCartProducts controller", error.message)
       res.status(500).json({message: "Server error", error: error.message})
    }
}

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body
        const user = req.user

        const existingItem = user.cartItems.find(item => item.product == productId)
        if(existingItem) {
            existingItem.quantity += quantity
        } else {
            user.cartItems.push({ product: productId, quantity })
        }

        await user.save()
        res.json(user.cartItems)
    } catch (error) {
        console.log("Error in addToCart controller ", error.message)
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

// delete all items from the cart
export const deleteAllFromCart = async (req, res) => {
    try {
        const {productId} = req.body
        const user = req.user
        if(!productId){
            user.cartItems = []
        } else {
            user.cartItems = user.cartItems.filter((item) => item.product !== productId)
        }
        await user.save()
    } catch (error) {
        console.log("Error in deleteAllFromCart controller ", error.message)
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

export const updateQuantity = async (req, res) => {
    try {
        const {id: productId} = req.params
        const {quantity} = req.body
        const user = req.user
        const existingItem = user.cartItems.find((item) => item.id === productId)

        if(existingItem) {
            if(quantity === 0) {
                user.cartItems = user.cartItems.filter((item) => item.id !== productId)
                await user.save()
                return res.json(user.cartItems)
            }

            existingItem.quantity = quantity
            await user.save()
            res.json(user.cartItems)
        }
    } catch (error) {
        console.log("Error in updateQuantity controller ", error.message)
    }
}