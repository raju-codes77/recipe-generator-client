"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiUsers, FiShield, FiActivity, FiServer, FiAlertCircle } from "react-icons/fi";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Admin Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-3xl bg-gradient-to-r from-[#176B35] to-[#2F8F46] text-white shadow-xl relative overflow-hidden"
      >
        <div className="absolute right-4 -bottom-6 opacity-10 text-9xl">🛡️</div>
        <div className="flex items-center space-x-3 mb-2">
          <FiShield className="text-3xl text-[#B7E35F]" />
          <h1 className="text-2xl lg:text-3xl font-bold">Admin Control Center</h1>
        </div>
        <p className="text-white/90 max-w-xl text-sm lg:text-base">
          Monitor platform users, AI recipe metrics, system performance, and security settings safely from one place.
        </p>
      </motion.div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm">
          <div className="flex items-center justify-between mb-3 text-[#2F8F46] dark:text-[#B7E35F] text-xl">
            <FiUsers />
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#EAF7E8] dark:bg-[#2F8F46]/20 text-[#2F8F46] dark:text-[#B7E35F]">+12%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-[#F6F0D7]">1,420</h3>
          <p className="text-sm text-gray-500 dark:text-[#F6F0D7]/60">Total Users</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm">
          <div className="flex items-center justify-between mb-3 text-[#FF9F43] text-xl">
            <FiActivity />
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#FFF0DD] dark:bg-[#FF9F43]/20 text-[#FF9F43]">Active</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-[#F6F0D7]">8,390</h3>
          <p className="text-sm text-gray-500 dark:text-[#F6F0D7]/60">Recipes Generated</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm">
          <div className="flex items-center justify-between mb-3 text-[#176B35] dark:text-[#B7E35F] text-xl">
            <FiServer />
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#EAF7E8] dark:bg-[#2F8F46]/20 text-[#2F8F46] dark:text-[#B7E35F]">Stable</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-[#F6F0D7]">99.9%</h3>
          <p className="text-sm text-gray-500 dark:text-[#F6F0D7]/60">API Uptime</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm">
          <div className="flex items-center justify-between mb-3 text-red-500 text-xl">
            <FiAlertCircle />
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400">Action</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-[#F6F0D7]">2 Reports</h3>
          <p className="text-sm text-gray-500 dark:text-[#F6F0D7]/60">Pending Review</p>
        </div>
      </div>

      {/* User Management Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-[#89986D]/20 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-[#F6F0D7] mb-6">Recent Registered Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700 dark:text-[#F6F0D7]/80">
            <thead className="bg-[#EAF7E8] dark:bg-[#89986D]/10 text-[#2F8F46] dark:text-[#B7E35F] uppercase text-xs">
              <tr>
                <th className="p-3 rounded-l-xl">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3 rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#89986D]/10">
              {[
                { name: "Rahim Ahmed", email: "rahim@flavorai.com", role: "User", status: "Active" },
                { name: "Sadia Islam", email: "sadia@flavorai.com", role: "User", status: "Active" },
                { name: "Tanvir Hossain", email: "tanvir@flavorai.com", role: "Admin", status: "Active" },
              ].map((user, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-[#89986D]/5 transition">
                  <td className="p-3 font-semibold text-gray-900 dark:text-[#F6F0D7]">{user.name}</td>
                  <td className="p-3 text-gray-500 dark:text-[#F6F0D7]/60">{user.email}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full bg-[#EAF7E8] dark:bg-[#2F8F46]/20 text-[#2F8F46] dark:text-[#B7E35F] text-xs font-medium">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-xs font-medium">
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}