import React, { useState } from 'react';

const EditUser = ({ editingUser, setEditingUser ,setEditUserOpen ,fetchUsers}) => {
  const [showCreatePassword, setShowCreatePassword] = useState(false);

  const handleEditChange = (e) => {
    setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
  };
  const handleClose = () => {
    setEditUserOpen(false);
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/admin/update-user/${editingUser._id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingUser),
        }
      );
      if (response.ok) {
        alert('User updated successfully!');
        fetchUsers();
      } else {
        alert('Error updating user.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setEditUserOpen(false);
  };

  return (
    
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
        >
          ✖
        </button>
      <h3 className="text-center text-xl font-semibold mb-4">Edit User</h3>
      <form onSubmit={handleEditSubmit} className="space-y-3">
        <input
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          type="text"
          name="username"
          value={editingUser.username}
          onChange={handleEditChange}
          required
        />
        <input
          className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
          type="text"
          name="contact"
          value={editingUser.contact}
          disabled
        />
        <input
          className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
          type="email"
          name="email"
          value={editingUser.email}
          disabled
        />
        <select
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          name="status"
          value={editingUser.status}
          onChange={handleEditChange}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <select
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          name="role"
          value={editingUser.role}
          onChange={handleEditChange}
        >
          <option value="user">User</option>
          <option value="leader">Leader</option>
        </select>

        {/* Password Field with Toggle */}
        <div className="relative">
          <input
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            type={showCreatePassword ? 'text' : 'password'} // Toggle between text and password
            name="password"
            placeholder="New Password"
            value={editingUser.password}
            onChange={handleEditChange}
          />
          <span
            onClick={() => setShowCreatePassword(!showCreatePassword)} // Toggle the password visibility
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {showCreatePassword ? '🙈' : '👁️'}
          </span>
        </div>

        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          type="submit"
        >
          Update User
        </button>
      </form>
    </div>
    </div>
  );
};

export default EditUser;
