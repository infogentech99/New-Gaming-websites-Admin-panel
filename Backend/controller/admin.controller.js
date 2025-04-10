import User from '../model/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Bet from '../model/bet.model.js';

export const assign = async (req, res) => {
    const { leaderId, userIds } = req.body;
    if (!leaderId || !userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ message: "LeaderId and an array of userIds are required" });
    }
    try {
      // Update the users to assign the leaderId
      const result = await User.updateMany(
        { _id: { $in: userIds } },
        { $set: { leaderId: leaderId } }
      );
      res.status(200).json({ message: "Users assigned to leader successfully", result });
    } catch (error) {
      console.error("Error assigning leader:", error);
      res.status(500).json({ message: "Error assigning leader", error: error.message });
    }
  };


// ✅ Update user
export const updateUser =  async (req, res) => {

  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
}

// ✅ Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
}
export const addMoney = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ message: "Invalid or missing amount" });
    }

    const user = await User.findById(id).populate('walletId');

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.walletId) {
      console.log('Wallet not linked');
      return res.status(400).json({ message: "User has no wallet linked" });
    }

    user.walletId.balance += Number(amount);
    user.walletId.transactions.push({
      type: "deposit",
      amount,
    });
    await user.walletId.save();

    res.status(200).json({
      message: "Money deposit successfully",
      newBalance: user.walletId.balance,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const withdrawMoney = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ message: "Invalid or missing amount" });
    }

    const user = await User.findById(id).populate('walletId');

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.walletId) {
      console.log('Wallet not linked');
      return res.status(400).json({ message: "User has no wallet linked" });
    }

    user.walletId.balance -= Number(amount);
    user.walletId.transactions.push({
      type: "withdraw",
      amount,
    });
    await user.walletId.save();

    res.status(200).json({
      message: "Money withdrawal successfully",
      newBalance: user.walletId.balance,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const login = async (req,res)=>{
  try {
  const {email,password} = req.body;

  let user = await User.findOne({email});
  if(!user) return res.status(500).json({ message: 'Something went wrong' });
   
  // Compare the password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ message: 'Something went wrong!' });
  
  if (!user.isAdmin) return res.status(400).json({ message: "You do not have permission to access the admin panel."});


  // Generate a JWT token
  const token = jwt.sign({ email: email, userid: user._id }, 'Screate');
  res.cookie('token', token, { httpOnly: true });

  return res.status(200).json({
    message: 'Login successful',
  });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
  
}; 

export const getUserBet = async (req, res) => {
  console.log("Asfmkamdkamksamklamkldmaskld");

  const { id } = req.params;
  console.log(id);  
  try {
    const bets = await Bet.find({ userId: id});
console.log('bets ' , bets)    ; 
    if (!bets || bets.length === 0) {
      return res.status(200).json({ message: 'No bets found for this user' });
    }
    res.status(200).json({
      message: 'All bets placed by user',
      bets,
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserTransaction = async (req,res)=>{
  const { id } = req.params;
  try {
  const userid = id;
  const user = await User.findOne({ _id: userid}).populate('walletId');
  if (!user) return res.status(404).json({ message: 'User not found' });

  return res.status(200).json({
    message: 'Sending data successful',
    transactions: user.walletId.transactions,
  });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
  
}; 
