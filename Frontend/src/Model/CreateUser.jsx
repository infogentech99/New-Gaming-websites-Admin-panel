import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateUser = ({setCreateUserOpen , fetchUsers}) => {
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    contact: "",
    email: "",
    status: "active",
    role: "user",
    balance : 0,
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setCreateUserOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    try {
      const response = await fetch("http://localhost:4000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        alert("User created successfully!");
        fetchUsers();
      } else {
        alert("Error creating user.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setCreateUserOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
        >
          ✖
        </button>
      <h3 className="text-center text-xl font-bold mb-4">Create User</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          type="text"
          name="username"
          placeholder="Username"
          value={userData.username}
          onChange={handleChange}
          required
        />
        
        <div className="relative">
          <input
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            type={showCreatePassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            required
          />
          <span
            onClick={() => setShowCreatePassword(!showCreatePassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {showCreatePassword ? "🙈" : "👁️"}
          </span>
        </div>
        
        <input
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          type="text"
          name="contact"
          placeholder="Contact"
          value={userData.contact}
          onChange={handleChange}
          required
        />
        
        <input
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
          required
        />
        
        <select
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          name="status"
          value={userData.status}
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        
        <select
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          name="role"
          value={userData.role}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="leader">Leader</option>
        </select>
        
        <input
    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
    type="number"
    name="balance"
    placeholder="Balance"
    value={userData.balance}
    onChange={handleChange}
    required
  />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          type="submit"
        >
          Create Account
        </button>
      </form>
    </div>
    </div>
  );
};

export default CreateUser;
