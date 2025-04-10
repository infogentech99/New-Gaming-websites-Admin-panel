import mongoose from "mongoose";

const betSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    m_name: {
      type: String,
      trim: true,
    },
    gmid: {
      type: Number,
      required: true,
    },
    profit: {
      type: Number,
      required: true,
      min: 1,
    },
    nat: {
      type: String,
      required: true,
      trim: true,
    },
    betType: {
      type: String,
      required: true,
      trim: true,
    },
    betAmount: {
      type: Number,
      required: true,
      min: 1,
    },
    size: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["pending", "won", "lost"],
      default: "pending",
      required: true,
    },
    match_id: {
      type: String,
      required: true,
      trim: true,
    },
    match_name: {
      type: String,
      required: true,
      trim: true,
    },
    ipAddress: {
      type: String,
      required: true,
      trim: true,
    },
    browserDetails: {
      type: String,
      required: true,
      trim: true,
    },
    odds:{
      type: Number,
      required: true,
    },
    
    timestamp: { type: Date, default: Date.now },
  },  
  { timestamps: true }
);

const Bet = mongoose.model("Bet", betSchema);
export default Bet;