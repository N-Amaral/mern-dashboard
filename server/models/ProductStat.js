import { Schema, model } from "mongoose";

const ProductStatSchema = new Schema(
  {
    productId: {
      type: String,
      // required: true,
    },
    yearlySalesTotal: {
      type: Number,
      // required: true,
    },
    yearlyTotalSoldUnits: {
      type: Number,
      // required: true,
    },
    year: {
      type: Number,
      // required: true,
    },
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
  },
  { timestamps: true }
);

const ProductStat = model("ProductStat", ProductStatSchema);
export default ProductStat;
