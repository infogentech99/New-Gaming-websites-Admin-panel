import axios from 'axios';
import User from './model/user.model.js';
import Bet from './model/bet.model.js';

function settleBet(bet, result) {
  const selection = Number(bet.size);      // Your chosen value (e.g. 89)
  const winner = Number(result.winner_name); // API result (e.g. 89)

  if (bet.betType === "lay") {
    return winner !== selection ? { status: "won" } : { status: "lost" };
  } else if (bet.betType === "back") {
    return winner === selection ? { status: "won" } : { status: "lost" };
  } else {
    return { status: "pending" };
  }
}

async function settleBets() {
  try {
    const unsettledBets = await Bet.find({ status: 'pending' });

    for (const bet of unsettledBets) {
      try {
        // Fetch result from API
        const response = await axios.get(`https://diamond-api.scoreswift.xyz/v2/result?gmid=${bet.gmid}&key=scoreswift.in`);
        const matchResult = response.data;

        if (!matchResult) {
          console.warn(`⚠️ No result found for gmid ${bet.gmid}`);
          continue;
        }

        const matchBet = matchResult.find(b => b.market_name === bet.nat);

    
        // Settle the bet
        const result = settleBet(bet, matchBet);

        // Update bet status
        bet.status = result.status;
        await bet.save();

        const user = await User.findById(bet.userId).populate('walletId');
        // Handle wallet update on win
        if (result.status === "won") {
          if (user && user.walletId) {
            const winAmount = Number(bet.profit) + Number(bet.betAmount); // Winnings + initial stake
            user.walletId.balance += winAmount;
            user.walletId.expense -= betAmount;
            await user.walletId.save();
          } else {
            console.warn(`⚠️ Wallet not found for user ${bet.userId}`);
          }
        }
        else if(result.status === "lost") user.walletId.expense -= betAmount;

      } catch (error) {
        console.error(`❌ Error processing bet ID ${bet._id}:`, error.message);
      }
    }
  } catch (error) {
    console.error('❌ Error fetching unsettled bets:', error.message);
  }
}

export default settleBets;
