import React, { useEffect, useState } from 'react';

const UserDetailsModal = ({ userId, onClose }) => {
  const [transactions, setTransactions] = useState([]);
  const [bets, setBets] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
        console.log("fetching data.......  ");
        try {
          const response = await fetch(`http://localhost:4000/admin/get-transactions/${userId._id}`, {
            method: 'GET',
            credentials: 'include'
          });
          if (response.ok) {
            const data = await response.json();
            console.log("transactions" ,data?.transactions )
            setTransactions(data?.transactions);
          } else {
            console.log("You have to login");
          }
        } catch (error) {
          console.error("Error fetching wallet:", error);
        }
      };
    const fetchBets = async () => {
      try {
        console.log("fetching data.......  ");
        const response = await fetch(`http://localhost:4000/admin/getBets/${userId._id}`,{
            method: 'GET',
            credentials: 'include'
          });
        const data = await response.json();
        if (response.ok && data.bets) {
            console.log("dagdasgjdbasjdbja",data);
          setBets(data.bets);
        } else {
          console.error(data.message || "Failed to fetch bets");
        }
      } catch (err) {
        console.error("Error fetching bets:", err);
        console.error("Failed to load bets");
      }
    };
    fetchTransactions();
    fetchBets();
  }, [userId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[95%] max-w-5xl max-h-[90vh] overflow-y-auto relative">
        <button className="absolute top-2 right-4 text-red-500 text-xl" onClick={onClose}>✖</button>
        <h2 className="text-2xl font-bold mb-4 text-center">User Bets & Transactions</h2>

        {/* Bets Table */}
        <div className="mb-6 text-nowrap">
  <h3 className="font-semibold mb-2">All Bet Data</h3>
  <div className="overflow-auto max-h-96 border rounded">
    <table className="min-w-full border text-sm">
      <thead className="bg-gray-200 sticky top-0">
        <tr>
          {bets.length > 0 &&
            Object.keys(bets[0]).map((key) => (
              <th key={key} className="border px-4 py-2 capitalize">
                {key.replace(/_/g, ' ')}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {bets.map((bet) => (
          <tr key={bet._id} className="hover:bg-gray-100">
            {Object.values(bet).map((value, idx) => (
              <td key={idx} className="border px-4 py-2">
                {typeof value === 'string' || typeof value === 'number'
                  ? value
                  : JSON.stringify(value)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


        {/* Transactions Table */}
        <div>
          <h3 className="font-semibold mb-2">Transactions</h3>
          <div className="overflow-auto max-h-64 border rounded">
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-200 sticky top-0">
                <tr>
                  <th className="border px-4 py-2">Type</th>
                  <th className="border px-4 py-2">Amount</th>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 10).map((tx) => (
                  <tr key={tx._id} className="hover:bg-gray-100 text-center">
                    <td className="border px-4 py-2">{tx.type}</td>
                    <td className="border px-4 py-2">₹{tx.amount}</td>
                    <td className="border px-4 py-2">{new Date(tx.timestamp).toLocaleString()}</td>
                    <td className="border px-4 py-2">{tx._id || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserDetailsModal;
