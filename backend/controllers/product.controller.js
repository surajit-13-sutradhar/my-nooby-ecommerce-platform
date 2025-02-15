import { redis } from "../lib/redis.js"
import cloudinary from "../lib/cloudinary.js"
import Product from "../models/product.model.js"

// Get all products
export const getAllProducts = async(req, res) => {
    // try to fetch all products from mongodb
    try {
        const products = await Product.find({})
        res.json({products})
    } catch (error) {
        console.log("Error in getAllProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message })
    }
}

// Get all featured products
export const getFeaturedProducts = async (req, res) => {
    try {
        // check if the data is in redis 
        let featuredProducts = await redis.get("featured_products")
        if(featuredProducts) {
            return res.json(JSON.parse(featuredProducts))
        }

        // if not in redis, fetch from mongodb
        featuredProducts = await Product.find({isFeatured: true}).lean() // .lean() is gonna return a plain javascript object instead of a mongodb document which is good for performance

        // if no featured products found then return 404
        if (!featuredProducts) {
			return res.status(404).json({ message: "No featured products found" })
		}

        // store in redis for future quick access
        await redis.set("featured_products", JSON.stringify(featuredProducts))
        
        // return the featured products
        res.json(featuredProducts)
    } catch(error) {
        // if any error occurs, return 500
        console.log("Error in getFeaturedProducts controller", error.message)
		res.status(500).json({ message: "Server error", error: error.message })
    }
}

// Create a new product
export const createProduct = async (req, res) => {
    try {
        // Get the product details from the request body
        const { name, description, price, category, image} = req.body
        // Upload the image to cloudinary
        let cloudinaryResponse = null
        // if image is present then upload it to cloudinary
        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, {
                upload_preset: "products"
            })
        }

        // Create a new product in mongodb
        const product = await Product.create({
            name,
            description,
            price,
            category,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : ""
        })
        // return the product
        res.status(201).json(product)
    } catch (error) {
        // if any error occurs, return 500
        console.log("Error in createProduct controller", error.message)
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        // if product not found then return 404
        if(!product) {
            return res.status(404).json({message: "Product not found"})
        }
        if(product.image) {
            const publicId = product.image.split("/").pop().split(".")[0]
            try{
                await cloudinary.uploader.destroy(`products/${publicId}`)
                console.log("Image deleted from cloudinary")
            } catch(error) {
                console.log("Error in deleting image from cloudinary", error)
            }

        }
        await Product.findByIdAndDelete(req.params.id)
        res.json({message: "Product deleted successfully"})
    } catch (error) {
        console.log("Error in deleteProduct controller", error.message)
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

// Recommendations
export const getRecommendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $sample: {size: 3}
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    image: 1,
                    price: 1
                }   
            }
        ])

        res.json(products)
    } catch (error) {
        console.log("Error in getRecommendedProducts controller", error.message)
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

// Get products by category
export const getProductsByCategory = async (req, res) => {
    const {category} = req.params
    try {
        const products = await Product.find({category})
        res.json(products)
    } catch (error) {
        console.log("Error in getProductsByCategory controller", error.message)
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

// Toggle featured product
export const toggleFeaturedProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if(product) {
            product.isFeatured = !product.isFeatured
            const updatedProduct = await product.save()
            await updateFeaturedProductsCache()
            res.json(updatedProduct)
        } else {
            res.status(404).json({message: "Product not found"})
        }
    } catch (error) {
        console.log("Error in toggleFeaturedProduct controller", error.message)
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

async function updateFeaturedProductsCache() {
    try {
        // lean() is gonna return a plain javascript object instead of a mongodb document which is good for performance
        const featuredProducts = await Product.find({isFeatured: true}).lean()
        await redis.set("featured_products", JSON.stringify(featuredProducts))
    } catch (error) {
        console.log("Error in updateFeaturedProductsCache controller", error.message)
        res.status(500).json({ message: "Server error", error: error.message })
    }
}