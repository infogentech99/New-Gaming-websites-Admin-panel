import Bet from '../model/bet.model.js';
import userModel from '../model/user.model.js';
import walletModel from '../model/wallet.model.js';


export const betPlace = async (req, res) => {

  const email = req.user.email;
  const { gmid,profit,nat,betType,betAmount,size,m_name, match_id,match_name,odds,ipAddress,browserDetails} = req.body;

  if(!gmid || !profit || !nat  || !betType || !betAmount || !size){
    return res.status(400).json({ message: "All fields are required!" });
  }

  const user = await userModel.findOne({ email }).populate('walletId');

  if (user.walletId.balance < betAmount) {
    return res.status(400).send('Insufficient balance');
  }

  // Deduct amount from user's wallet
  user.walletId.balance -= betAmount;

  user.walletId.expense += betAmount;
  await user.walletId.save();
  await user.save();

  const bet = new Bet({
    userId:user._id,
    gmid,
    profit,
    nat,
    betType,
    betAmount,
    size,
    m_name,
    match_id,
    match_name,
    odds,
    ipAddress,
    browserDetails
  });

  await bet.save();

  res.status(200).send('Bet placed successfully');
}
export const getBet = async (req, res) => {

  try {
    const email = req.user.email;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const bets = await Bet.find({ userId:user._id });

    if (!bets || bets.length === 0) {
      return res.status(404).json({ message: 'No bets found for this user' });
    }
    res.status(200).json({
      message: 'All bets placed by user',
      bets,
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
