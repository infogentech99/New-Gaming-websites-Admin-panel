import React, { useState } from 'react';

const DepositWithdrawModal = ({ user, actionType, onClose, fetchUsers }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) {
      alert('Please enter a valid amount');
      return;
    }

    const endpoint =
      actionType === 'deposit'
        ? `http://localhost:4000/admin/add-money/${user._id}`
        : `http://localhost:4000/admin/withdraw-money/${user._id}`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(amount) }),
      });

      if (response.ok) {
        alert(`${actionType === 'deposit' ? 'Deposit' : 'Withdrawal'} successful!`);
        fetchUsers();
        onClose();
      } else {
        alert('Something went wrong!');
      }
    } catch (error) {
      console.error('Transaction error:', error);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl'
        >
          ✖
        </button>
        <h3 className='text-center text-xl font-semibold mb-4'>
          {actionType === 'deposit' ? 'Deposit Money' : 'Withdraw Money'} for {user.username}
        </h3>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
            placeholder='Enter amount'
            min={1}
            required
          />
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'
          >
            {actionType === 'deposit' ? 'Deposit' : 'Withdraw'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DepositWithdrawModal;
