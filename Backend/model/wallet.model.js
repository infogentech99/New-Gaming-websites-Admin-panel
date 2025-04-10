import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, default: 0 },
  expense: { type: Number, default: 0 },
  transactions: [
    {
      type: {
        type: String,
        enum: ["deposit", "withdraw"],
        required: true,
      },
      amount : { type: Number, default: 0 },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const walletModel = mongoose.model("Wallet", walletSchema);
export default walletModel;
