import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const getAdmins = async (req, res) => {
  try {
    //fetch all the admin information, except passwords
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;
    //combines user Information based on ID with affiliate Stats. - Aggregate Call similar to SQL JOINS
    const userWithStats = await User.aggregate([
      //match current user Id with DB._id
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      //lookup affiliate stats from current user id with the userId IN the affiliateStats TABLE and save in a property name affiliateStats
      { $lookup: { from: "affiliatestats", localField: "_id", foreignField: "userId", as: "affiliateStats" } },
      //flattens returned query array/object
      { $unwind: "$affiliateStats" },
    ]);

    //returns every transaction present within user prop affiliateStats
    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );

    const filteredSaleTransactions = saleTransactions.filter((transaction) => transaction !== null); //removes transactions with null value.

    res.status(200).json({ user: userWithStats[0], sales: filteredSaleTransactions });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
