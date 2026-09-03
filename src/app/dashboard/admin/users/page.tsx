"use client";

import React, { useEffect, useState } from "react";
import { FiTrash2, FiUserX, FiUserCheck, FiUsers, FiShield } from "react-icons/fi";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // ইউজার ডাটা ফেচ করা
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/users");
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ইউজার স্ট্যাটাস চেঞ্জ (Suspend / Active) করার ফাংশন
  const handleStatusChange = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`User ${newStatus.toLowerCase()} successfully`);
        fetchUsers(); // লিস্ট রিফ্রেশ করা
      } else {
        toast.error(data.message || "Action failed");
      }
    } catch (error) {
      console.error("Status update error:", error);
      toast.error("Something went wrong");
    }
  };

  // ইউজার ডিলিট করার ফাংশন
  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("User deleted successfully");
        setUsers(users.filter((user) => user.id !== id));
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-[#F6F0D7]">Loading users...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] p-6 sm:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-[#F6F0D7] flex items-center gap-2">
              <FiUsers className="text-[#2F8F46]" /> Admin User Management
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-[#F6F0D7]/60 mt-1">
              Total registered users: <span className="font-bold text-[#2F8F46]">{users.length}</span>
            </p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white dark:bg-[#181818] border border-gray-200 dark:border-[#89986D]/20 rounded-3xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-[#89986D]/10 text-gray-500 dark:text-[#F6F0D7]/70 text-[11px] uppercase tracking-wider border-b border-gray-200 dark:border-[#89986D]/20">
                  <th className="py-4 px-6">Name & Email</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Joined Date</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-[#89986D]/10 text-xs">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-[#89986D]/5 transition">
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900 dark:text-[#F6F0D7]">{user.name}</div>
                      <div className="text-gray-400 dark:text-[#F6F0D7]/50 text-[11px]">{user.email}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                        user.role === "ADMIN" 
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300" 
                          : "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                      }`}>
                        <FiShield size={10} /> {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        user.status === "ACTIVE" 
                          ? "bg-[#2F8F46]/10 text-[#2F8F46]" 
                          : "bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400"
                      }`}>
                        {user.status || "ACTIVE"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500 dark:text-[#F6F0D7]/60">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      {/* Suspend / Active Toggle Button */}
                      <button
                        onClick={() => handleStatusChange(user.id, user.status || "ACTIVE")}
                        title={user.status === "SUSPENDED" ? "Activate User" : "Suspend User"}
                        className={`p-2 rounded-xl transition ${
                          user.status === "SUSPENDED"
                            ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-950/50 dark:text-green-300"
                            : "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-950/50 dark:text-amber-300"
                        }`}
                      >
                        {user.status === "SUSPENDED" ? <FiUserCheck size={14} /> : <FiUserX size={14} />}
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        title="Delete User"
                        className="p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-950/50 dark:text-red-400 transition"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-400 dark:text-[#F6F0D7]/50">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}