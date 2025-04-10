import React, { useEffect, useState } from 'react';
import AssignUsersToLeader from '../../Model/AssignUsersToLeader';
import EditUser from '../../Model/EditUser';
import CreateUser from '../../Model/CreateUser';
import DepositWithdrawModal from '../../Model/DepositWithdrawModal';
import UserDetailsModal from '../../Model/UserDetailsModal';


const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [isEditUserOpen, setEditUserOpen] = useState(false);
    const [isCreateUserOpen, setCreateUserOpen] = useState(false);
    const [isAssignLeaderOpen, setAssignLeaderOpen] = useState(false);
    const [expandedLeader, setExpandedLeader] = useState(null);
    const [modalUser, setModalUser] = useState(null);
    const [actionType, setActionType] = useState(null);
      const [selectedUserId, setSelectedUserId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const leaderList = users.filter((user) => user.role === "leader");
    const indexOfLastLeader = currentPage * itemsPerPage;
    const indexOfFirstLeader = indexOfLastLeader - itemsPerPage;
    const currentLeaders = leaderList.slice(indexOfFirstLeader, indexOfLastLeader);
    const totalPages = Math.ceil(leaderList.length / itemsPerPage);

    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;
        try {
            const response = await fetch(`http://localhost:4000/admin/delete-user/${userId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                alert("User deleted successfully!");
                fetchUsers();
            } else {
                alert("Error deleting user.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const toggleExpandedLeader = (leaderId) => {
        setExpandedLeader(expandedLeader === leaderId ? null : leaderId);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:4000/user/get-users");
            const data = await response.json();
            console.log(data)
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
    const handleEditChange = (e) => {
        setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
    };

    return (

        <div className='p-4'>
            {/* Navbar */}
            <div>
                <h2 className="text-center text-blue-600 mb-4 font-bold text-3xl">Admin Dashboard</h2>

                <div className="flex justify-center gap-3 mb-4">
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                        onClick={() => setCreateUserOpen(true)}
                    >
                        Create User
                    </button>
                    {/* <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={() => setLoginOpen(true)}
        >
          User/Leader Login
        </button> */}
                    <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                        onClick={() => setAssignLeaderOpen(true)}
                    >
                        Assign Users to Leader
                    </button>
                </div>
            </div>
            {/* Table Section  */}
            <div className="container mx-auto p-4">
                <h3 className="text-center text-lg font-semibold mt-4">Leaders List</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 shadow-md">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="px-4 py-2 border">Username</th>
                                <th className="px-4 py-2 border">Email</th>
                                <th className="px-4 py-2 border">Contact</th>
                                <th className="px-4 py-2 border">Role</th>
                                <th className="px-4 py-2 border">Status</th>
                                <th className="px-4 py-2 border">Amount</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentLeaders.map((leader) => {
                                const assignedUsers = users.filter(
                                    (u) => u.leaderId === leader._id && u.role === "user"
                                );
                                return (
                                    <React.Fragment key={leader._id}>
                                        <tr
                                            onClick={() => toggleExpandedLeader(leader._id)}
                                            className="cursor-pointer hover:bg-gray-100"
                                        >
                                            <td className="px-4 py-2 border">
                                                {leader.username} {assignedUsers.length > 0 && "🔽"}
                                            </td>
                                            <td className="px-4 py-2 border">{leader.email}</td>
                                            <td className="px-4 py-2 border">{leader.contact}</td>
                                            <td className="px-4 py-2 border">{leader.role}</td>
                                            <td className="px-4 py-2 border">{leader.status}</td>
                                            <th className="px-4 py-2 border">{leader.walletId.balance}</th>
                                            <td className="px-4 py-2 border flex gap-4">
                                                <span
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setEditingUser(leader);
                                                        setEditUserOpen(true);
                                                    }}
                                                    className="cursor-pointer text-blue-500 mr-2"
                                                >
                                                    ✏️
                                                </span>
                                                <span
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(leader._id);
                                                    }}
                                                    className="cursor-pointer text-red-500"
                                                >
                                                    🗑️
                                                </span>
                                                <span
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setModalUser(leader);
                                                        setActionType('deposit');
                                                    }}
                                                    className="cursor-pointer text-green-600 ml-2"
                                                >
                                                    <img className='w-5 h-5' src="/deposit.png" alt="deposit-logo" />
                                                </span>

                                                <span
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setModalUser(leader);
                                                        setActionType('withdraw');
                                                    }}
                                                    className="cursor-pointer text-yellow-600 ml-2"
                                                >
                                                    <img className='w-5 h-5' src="/withdraw.png" alt="withdraw-logo" />
                                                </span>
                                                <span
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedUserId(leader);
                                                    }}
                                                    className="cursor-pointer text-blue-700 underline ml-2"
                                                >
                                                    📄 View Details
                                                </span>
                                            </td>
                                        </tr>
                                        {expandedLeader === leader._id && assignedUsers.length > 0 && (
                                            <tr>
                                                <td colSpan="6" className="px-4 py-2 border bg-gray-50">
                                                    <h5 className="text-gray-600 font-semibold">Assigned Users</h5>
                                                    <div className="overflow-x-auto">
                                                        <table className="w-full border border-gray-300 bg-white">
                                                            <thead>
                                                                <tr className="bg-gray-200">
                                                                    <th className="px-4 py-2 border">Username</th>
                                                                    <th className="px-4 py-2 border">Email</th>
                                                                    <th className="px-4 py-2 border">Contact</th>
                                                                    <th className="px-4 py-2 border">Status</th>
                                                                    <th className="px-4 py-2 border">Amount</th>
                                                                    <th className="px-4 py-2 border">Actions</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {assignedUsers.map((assignedUser) => (
                                                                    <tr key={assignedUser._id} className="hover:bg-gray-100">
                                                                        <td className="px-4 py-2 border">{assignedUser.username}</td>
                                                                        <td className="px-4 py-2 border">{assignedUser.email}</td>
                                                                        <td className="px-4 py-2 border">{assignedUser.contact}</td>
                                                                        <td className="px-4 py-2 border">{assignedUser.status}</td>
                                                                        <th className="px-4 py-2 border">{assignedUser.walletId.balance}</th>
                                                                        <td className="px-4 py-2 border flex gap-2">
                                                                            <span
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    setEditingUser(assignedUser);
                                                                                    setEditUserOpen(true);
                                                                                }}
                                                                                className="cursor-pointer text-blue-500 mr-2"
                                                                            >
                                                                                ✏️
                                                                            </span>
                                                                            <span
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    handleDelete(assignedUser._id);
                                                                                }}
                                                                                className="cursor-pointer text-red-500"
                                                                            >
                                                                                🗑️
                                                                            </span>
                                                                            <span
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    setModalUser(assignedUser);
                                                                                    setActionType('deposit');
                                                                                }}
                                                                                className="cursor-pointer text-green-600 ml-2"
                                                                            >
                                                                                <img className='w-5 h-5' src="/deposit.png" alt="deposit-logo" />
                                                                            </span>

                                                                            <span
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    setModalUser(assignedUser);
                                                                                    setActionType('withdraw');
                                                                                }}
                                                                                className="cursor-pointer text-yellow-600 ml-2"
                                                                            >
                                                                                <img className='w-5 h-5' src="/withdraw.png" alt="withdraw-logo" />
                                                                            </span>
                                                                            <span
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedUserId(leader);
                                                    }}
                                                    className="cursor-pointer text-blue-700 underline ml-2"
                                                >
                                                    📄 View Details
                                                </span>

                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls for Leaders */}
                <div className="flex justify-center mt-3">
                    <nav>
                        <ul className="flex space-x-2">
                            <li>
                                <button
                                    className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
                                        }`}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                            </li>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <li key={index}>
                                    <button
                                        className={`px-4 py-2 rounded ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                                            }`}
                                        onClick={() => setCurrentPage(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li>
                                <button
                                    className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
                                        }`}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div>
                    {isAssignLeaderOpen && <AssignUsersToLeader users={users} setAssignLeaderOpen={setAssignLeaderOpen} fetchUsers={fetchUsers} />}
                    {isEditUserOpen && <EditUser editingUser={editingUser} setEditingUser={setEditingUser} setEditUserOpen={setEditUserOpen} fetchUsers={fetchUsers} />}
                    {isCreateUserOpen && <CreateUser setCreateUserOpen={setCreateUserOpen} fetchUsers={fetchUsers} />}
                    {modalUser && actionType && (
                        <DepositWithdrawModal
                            user={modalUser}
                            actionType={actionType}
                            onClose={() => {
                                setModalUser(null);
                                setActionType(null);
                            }}
                            fetchUsers={fetchUsers}
                        />
                    )}
                    {selectedUserId && (
                <UserDetailsModal
                    userId={selectedUserId}
                    onClose={() => setSelectedUserId(null)}
                />
                )}

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
