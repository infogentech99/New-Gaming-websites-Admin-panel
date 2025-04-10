import React, { useEffect, useState } from "react";

const CreateUser = () => {
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password:"",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    try {
      const response = await fetch("http://localhost:4000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
         credentials: 'include'
      });
      if (response.ok) {
        alert("User Login successfully!");
        const data = await response.json();
      } else {
        alert("Error creating user.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handle = async (e) => {
    e.preventDefault();
     
    try {
      const response = await fetch('http://localhost:4000/user/get-wallet', {
        method: 'GET',
        credentials: 'include' 
      });
      if (response.ok) {
        alert("get user wallet sucessfully");
        const data = await response.json();
      } else {
        alert("Error creating user.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
      <h3 className="text-center text-xl font-bold mb-4">Login User</h3>
      <form onSubmit={handleSubmit} className="space-y-3">  

      <input
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
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

        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          type="submit"
        >
          Sumbit
        </button>
      </form>
    </div>
    <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          type="submit"
          onClick={handle}
        >
          wallet
        </button>
    </div>
  );
};

export default CreateUser;
