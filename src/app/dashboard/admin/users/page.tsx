"use client";

import React, { useEffect, useState } from "react";
import { FiTrash2, FiUserX, FiUserCheck, FiUsers, FiShield, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import toast from "react-hot-toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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

  const [pagination, setPagination] = useState<any>(null);
  const [page, setPage] = useState(1);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/users?page=${page}&limit=20`, {
        credentials: "include"
      });
      const data = await res.json();
      setUsers(data.users || []);
      setPagination({
        page: data.page,
        totalPages: data.totalPages,
        total: data.total
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  // users status (Suspend / Active) 
  const handleStatusChange = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/users/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        toast.success(`User ${newStatus.toLowerCase()} successfully`);
        setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
      } else {
        toast.error("Action failed");
      }
    } catch (error) {
      console.error("Status update error:", error);
      toast.error("Something went wrong");
    }
  };

  //users delete function
  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this user?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/users/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (res.ok) {
        toast.success("User deleted successfully");
        setUsers(users.filter((user) => user.id !== id));
      } else {
        toast.error("Delete failed");
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
            <Link href="/dashboard/admin" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#2F8F46] mb-3 transition-colors">
              <FiArrowLeft className="mr-2 w-4 h-4" /> Back to Dashboard
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-[#F6F0D7] flex items-center gap-2">
              <FiUsers className="text-[#2F8F46]" /> User Management
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-[#F6F0D7]/60 mt-1">
              Total registered users: <span className="font-bold text-[#2F8F46]">{pagination?.total || users.length}</span>
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
                        title={user.status === "BLOCKED" ? "Activate User" : "Block User"}
                        className={`p-2 rounded-xl transition ${
                          user.status === "BLOCKED"
                            ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-950/50 dark:text-green-300"
                            : "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-950/50 dark:text-amber-300"
                        }`}
                      >
                        {user.status === "BLOCKED" ? <FiUserCheck size={14} /> : <FiUserX size={14} />}
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
          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-[#89986D]/20 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Showing page {pagination.page} of {pagination.totalPages}
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 dark:border-[#89986D]/20 text-gray-700 dark:text-[#F6F0D7] hover:bg-gray-50 dark:hover:bg-[#89986D]/10 disabled:opacity-50 transition-colors"
                >
                  Previous
                </button>
                <button 
                  onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                  disabled={page === pagination.totalPages}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 dark:border-[#89986D]/20 text-gray-700 dark:text-[#F6F0D7] hover:bg-gray-50 dark:hover:bg-[#89986D]/10 disabled:opacity-50 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}