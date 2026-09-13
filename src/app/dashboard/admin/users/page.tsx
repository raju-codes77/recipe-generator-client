"use client";

import React, { useEffect, useState } from "react";
import { FiTrash2, FiUserX, FiUserCheck, FiUsers, FiShield, FiChevronLeft, FiChevronRight, FiUserPlus } from "react-icons/fi";
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Users fetched data
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

  const totalPages = Math.max(1, Math.ceil(users.length / itemsPerPage));
  const firstUserIndex = (currentPage - 1) * itemsPerPage;
  const visibleUsers = users.slice(firstUserIndex, firstUserIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  // users status (Suspend / Active) 
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
        fetchUsers(); // refreshing our list
      } else {
        toast.error(data.message || "Action failed");
      }
    } catch (error) {
      console.error("Status update error:", error);
      toast.error("Something went wrong");
    }
  };

  //users delete function
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
    <div className="min-h-screen bg-[#f6f8f3] p-4 font-sans text-slate-900 dark:bg-[#101611] dark:text-[#F6F0D7] sm:p-6 lg:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#2F8F46] dark:text-[#b7df86]">Admin workspace</p>
            <h1 className="flex items-center gap-2 text-2xl font-black tracking-tight text-gray-900 dark:text-[#F6F0D7] sm:text-3xl">
              <FiUsers className="text-[#2F8F46]" /> User management
            </h1>
            <p className="mt-1 text-xs text-gray-500 dark:text-[#F6F0D7]/60 sm:text-sm">
              Review account access and activity. <span className="font-bold text-[#2F8F46]">{users.length} total users</span>
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-[#dce8d6] bg-white px-4 py-3 text-xs font-semibold text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white/65">
            <FiUserPlus className="text-[#e6923b]" /> Live directory
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-hidden rounded-[26px] border border-[#e1e7dc] bg-white shadow-xl shadow-slate-900/5 dark:border-[#89986D]/20 dark:bg-[#181818]">
          <div className="flex flex-col justify-between gap-2 border-b border-[#edf0e9] px-5 py-4 dark:border-white/10 sm:flex-row sm:items-center sm:px-6">
            <div><h2 className="text-sm font-bold">Directory</h2><p className="mt-0.5 text-[11px] text-slate-400">{users.length === 0 ? "No accounts" : `Showing ${firstUserIndex + 1}-${Math.min(firstUserIndex + itemsPerPage, users.length)} of ${users.length}`}</p></div>
            <span className="w-fit rounded-full bg-[#f0f8e9] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#2F8F46] dark:bg-[#2F8F46]/15 dark:text-[#b7df86]">Protected actions</span>
          </div>
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
                {visibleUsers.map((user) => (
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
          {users.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-[#edf0e9] px-5 py-4 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-[11px] text-slate-400 dark:text-white/45">Page <span className="font-bold text-slate-700 dark:text-white">{currentPage}</span> of {totalPages}</p>
              <div className="flex items-center gap-1.5">
                <button type="button" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} disabled={currentPage === 1} aria-label="Previous page" className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#dfe7da] text-slate-500 transition hover:border-[#9ec47a] hover:text-[#2F8F46] disabled:cursor-not-allowed disabled:opacity-35 dark:border-white/10"><FiChevronLeft size={16} /></button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button type="button" key={page} onClick={() => setCurrentPage(page)} aria-label={`Go to page ${page}`} aria-current={currentPage === page ? "page" : undefined} className={`h-9 min-w-9 rounded-xl px-2 text-xs font-bold transition ${currentPage === page ? "bg-[#2F8F46] text-white shadow-md shadow-[#2F8F46]/20" : "border border-transparent text-slate-500 hover:border-[#dfe7da] hover:text-[#2F8F46] dark:text-white/55 dark:hover:border-white/10"}`}>{page}</button>
                ))}
                <button type="button" onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} disabled={currentPage === totalPages} aria-label="Next page" className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#dfe7da] text-slate-500 transition hover:border-[#9ec47a] hover:text-[#2F8F46] disabled:cursor-not-allowed disabled:opacity-35 dark:border-white/10"><FiChevronRight size={16} /></button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}