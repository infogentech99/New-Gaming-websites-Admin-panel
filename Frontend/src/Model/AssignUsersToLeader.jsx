import React, { useState } from 'react';

const AssignUsersToLeader = ({ users , setAssignLeaderOpen, fetchUsers}) => {
  const [selectedLeaderAssign, setSelectedLeaderAssign] = useState("");
  const [selectedUsersAssign, setSelectedUsersAssign] = useState([]);

  const handleAssignLeaderSubmit = async (e) => {
    e.preventDefault();
    if (selectedUsersAssign.length === 0) {
      alert("Please select at least one user.");
      return;
    }
    try {
      const response = await fetch("http://localhost:4000/admin/assign-leader", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leaderId: selectedLeaderAssign,
          userIds: selectedUsersAssign,
        }),
      });
      if (response.ok) {
        alert("Users assigned successfully!");
        fetchUsers();
      } else {
        alert("Error assigning users.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setAssignLeaderOpen(false);
  };
  const handleClose = () => {
    setAssignLeaderOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
        >
          ✖
        </button>
      <h3 className="text-center text-xl font-semibold mb-4">Assign Users to Leader</h3>
      <form onSubmit={handleAssignLeaderSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Select Leader:</label>
          <select
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={selectedLeaderAssign}
            onChange={(e) => setSelectedLeaderAssign(e.target.value)}
            required
          >
            <option value="">-- Select Leader --</option>
            {users
              .filter((user) => user.role === "leader")
              .map((leader) => (
                <option key={leader._id} value={leader._id}>
                  {leader.username}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Select Up to 10 Users:</label>
          <div className="max-h-40 overflow-y-auto border rounded-lg p-2">
            {users
              .filter((user) => user.role === "user" && !user.leaderId)
              .map((user) => (
                <div key={user._id} className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    id={`assign-${user._id}`}
                    checked={selectedUsersAssign.includes(user._id)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      if (checked) {
                        if (selectedUsersAssign.length < 10) {
                          setSelectedUsersAssign((prev) => [...prev, user._id]);
                        } else {
                          alert("You can only select up to 10 users.");
                        }
                      } else {
                        setSelectedUsersAssign((prev) =>
                          prev.filter((id) => id !== user._id)
                        );
                      }
                    }}
                  />
                  <label htmlFor={`assign-${user._id}`} className="text-gray-700 cursor-pointer">
                    {user.username}
                  </label>
                </div>
              ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
        >
          Assign
        </button>
      </form>
    </div>
    </div>
  );
};

export default AssignUsersToLeader;
