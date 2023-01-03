import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    price: {
      type: Number,
      // required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    category: {
      type: String,
      // required: true,
    },
    rating: {
      type: Number,
      // required: true,
    },
    supply: {
      type: Number,
      // required: true,
    },
  },
  { timestamps: true }
);

const Product = model("Product", ProductSchema);
export default Product;
