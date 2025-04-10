import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';
import wallet from '../model/wallet.model.js';
import { updateUser } from './admin.controller.js';

export const register = async (req, res)=>{
  try {
    const { username, password, email, contact, role, status ,balance=0} = req.body;
    if (!username || !password || !email || !contact || !role || !status ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

      let user = await User.findOne({ email });
      if (user) return res.status(300).json({ message: 'User already registered' });


    
    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({ username, password:hash, email, contact, role, status });
    await newUser.save();

    const newWallet  = await wallet.create({
      userId: newUser._id,
      balance: balance,
    });
    
    // Add the wallet reference to user
    newUser.walletId = newWallet._id;
    
    // Add transaction
    newWallet.transactions.push({
      type: "deposit",
      amount: balance,
    });
    
    // ✅ Save both updated models
    await newWallet.save();
    await newUser.save();
      res.status(201).json({ message: "User created successfully!"});
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};





export const userdata = async (req, res) => {
  try {
    const users = await User.find({}).populate('walletId');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
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

  // Generate a JWT token
  const token = jwt.sign({ email: email, userid: user._id }, 'Screate');
  res.cookie('token', token, { httpOnly: true });

  const Updateduser = await User.findOne({ email }).populate('walletId');

  return res.status(200).json({
    message: 'Login successful',
    // token, 
    user: {
        // _id: user._id,
        // username: user.username,
        // name: user.name,
        // email: user.email,
        // age: user.age,
        // profilepic: user.profilepic,
        // posts : Updateduser.posts,
        // savePost: user.savePost
        Updateduser,
    }
  });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
  
}; 

export const logout = (req,res)=>{
  res.cookie('token' , '');
  return res.status(200).json({ message: 'Logout successful' });
};

// export const like = async (req,res)=>{
//     const post = await postModel.findOne({_id : req.params.id }).populate('user');

//   if(post.likes.indexOf(req.user.userid) === -1){
//      post.likes.push(req.user.userid); 
//   }
//   else{
//       post.likes.splice(post.likes.indexOf(req.user.userid) , 1);
//   }
//     await post.save();
//     return res.status(200).json({ message: 'Like successful' });
//   };
//   export const ForgetPassword = async (req, res) => {
//     try {
//       const { email, password } = req.body;
//       let user = await userModel.findOne({ email });
//       if (!user) return res.status(500).json({ message: 'Something went wrong' });
  
//       const salt = await bcrypt.genSalt(10);
//       const hash = await bcrypt.hash(password, salt);
//       await userModel.findOneAndUpdate({ email }, { password: hash });
  
//       return res.status(200).json({ message: 'Password update successful' });
//     } catch (error) {
//       res.status(500).json({ message: 'Server error', error });
//     }
//   };


export const walletData = async (req,res)=>{
  try {

  const userid = req.user.email;

  const user = await User.findOne({ email: userid}).populate('walletId');
  if (!user) return res.status(404).json({ message: 'User not found' });


  return res.status(200).json({
    message: 'Sending data successful',
    wallet: user.walletId,
  });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
  
}; 