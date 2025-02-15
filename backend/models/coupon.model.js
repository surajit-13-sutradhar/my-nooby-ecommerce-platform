import mongoose from "mongoose";

// Creating a new mongoose schema for coupons
const couponSchema = new mongoose.Schema(
	{
		code: {
			type: String,
			required: true,
			unique: true,
		},
		discountPercentage: {
			type: Number,
			required: true,
			min: 0,
			max: 100,
		},
		expirationDate: {
			type: Date,
			required: true,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			unique: true,
		},
	},
	{
		timestamps: true, // To get the created at and updated at timestamps
	}
);

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;