import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconUser,
  IconShieldCheck,
  IconMail,
  IconPhone,
  IconMapPin,
  IconId,
  IconDeviceLaptop,
  IconDeviceMobile,
  IconHeadset,
  IconCheck,
  IconEdit,
} from "@tabler/icons-react";
import { userData } from "../data/bankingData";

export default function Profile() {
  const [profile, setProfile] = useState(userData);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
    showToast("Profile details updated successfully!");
  };

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* TOAST */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-8 z-50 flex items-center gap-2 rounded-xl bg-neutral-950 px-4 py-3 text-sm font-medium text-white shadow-2xl border border-teal-500/30"
          >
            <IconCheck size={18} className="text-teal-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP USER HERO CARD */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0b0b0b] p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute -right-20 -top-20 h-64 w-64 bg-[#14b8a6]/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-tr from-teal-700 via-teal-600 to-emerald-500 text-2xl sm:text-3xl font-extrabold text-white shadow-lg">
              {profile.initials}
              <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#0b0b0b] bg-emerald-400 text-black">
                <IconCheck size={14} stroke={3} />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{profile.name}</h2>
                <span className="rounded-full bg-teal-500/20 px-3 py-0.5 text-xs font-bold text-[#5eead4] border border-teal-500/30">
                  Verified Account
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Customer ID: <span className="font-mono text-white">{profile.customerId}</span> • Joined {profile.joinedDate}
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400">
                <IconShieldCheck size={16} />
                Full KYC Level 3 Verified & Encrypted
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-neutral-950 shadow-md transition hover:bg-neutral-100 active:scale-95"
          >
            <IconEdit size={16} />
            {isEditing ? "Cancel Edit" : "Edit Profile Info"}
          </button>
        </div>
      </div>

      {/* PROFILE DETAILS GRID */}
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* LEFT: PERSONAL INFORMATION FORM */}
        <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8 shadow-2xs">
          <h3 className="text-lg font-bold text-neutral-950 mb-5">Personal & Identity Information</h3>

          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-700">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-2.5 text-sm font-semibold outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-2.5 text-sm font-semibold outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700">Mobile Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-2.5 text-sm font-semibold outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700">PAN Card Number</label>
                  <input
                    type="text"
                    value={formData.panNumber}
                    onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-2.5 text-sm font-semibold outline-none focus:bg-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700">Registered Residential Address</label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-2.5 text-sm font-medium outline-none focus:bg-white"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="rounded-xl bg-neutral-950 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-neutral-800 transition"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-xl border border-neutral-200 px-4 py-2.5 text-xs font-bold text-neutral-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="rounded-2xl bg-neutral-50 p-4 border border-neutral-100">
                <div className="flex items-center gap-2 text-neutral-400 mb-1">
                  <IconMail size={15} />
                  <span>Primary Email</span>
                </div>
                <p className="font-semibold text-neutral-900 text-sm">{profile.email}</p>
              </div>

              <div className="rounded-2xl bg-neutral-50 p-4 border border-neutral-100">
                <div className="flex items-center gap-2 text-neutral-400 mb-1">
                  <IconPhone size={15} />
                  <span>Verified Phone</span>
                </div>
                <p className="font-semibold text-neutral-900 text-sm font-mono">{profile.phone}</p>
              </div>

              <div className="rounded-2xl bg-neutral-50 p-4 border border-neutral-100">
                <div className="flex items-center gap-2 text-neutral-400 mb-1">
                  <IconId size={15} />
                  <span>PAN Identification</span>
                </div>
                <p className="font-bold text-neutral-900 text-sm font-mono">{profile.panNumber}</p>
              </div>

              <div className="rounded-2xl bg-neutral-50 p-4 border border-neutral-100">
                <div className="flex items-center gap-2 text-neutral-400 mb-1">
                  <IconShieldCheck size={15} />
                  <span>KYC Compliance</span>
                </div>
                <p className="font-bold text-emerald-700 text-sm">Full Verification (Aadhaar + Video)</p>
              </div>

              <div className="sm:col-span-2 rounded-2xl bg-neutral-50 p-4 border border-neutral-100">
                <div className="flex items-center gap-2 text-neutral-400 mb-1">
                  <IconMapPin size={15} />
                  <span>Registered Address</span>
                </div>
                <p className="font-medium text-neutral-800 text-sm">{profile.address}</p>
              </div>
            </div>
          )}

          {/* ACTIVE SESSIONS */}
          <div className="mt-8 pt-6 border-t border-neutral-100">
            <h4 className="font-bold text-neutral-900 text-sm mb-3">Active Login Sessions</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-2xl bg-neutral-50 p-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                    <IconDeviceLaptop size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-neutral-900">Chrome on Windows 11</p>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-800">
                        Current Active
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400">Bengaluru, India • IP 122.179.48.21</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-neutral-50 p-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
                    <IconDeviceMobile size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-900">Quantum Mobile App • iPhone 15 Pro</p>
                    <p className="text-[11px] text-neutral-400">Last active 2 hours ago</p>
                  </div>
                </div>
                <button
                  onClick={() => showToast("Session revoked for iPhone 15 Pro.")}
                  className="text-xs font-bold text-rose-600 hover:underline"
                >
                  Revoke
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: DEDICATED WEALTH MANAGER */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-wider mb-2">
              <IconHeadset size={16} />
              Priority Wealth Concierge
            </div>
            <h4 className="font-bold text-neutral-950 text-base">Dedicated Relationship Manager</h4>
            <p className="text-xs text-neutral-400 mt-0.5">Assigned to your Quantum banking vault</p>

            <div className="mt-5 flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 font-bold text-white text-base">
                SS
              </div>
              <div>
                <h5 className="font-bold text-neutral-900 text-sm">{profile.manager.name}</h5>
                <p className="text-xs text-neutral-500">{profile.manager.title}</p>
              </div>
            </div>

            <div className="mt-5 space-y-2 text-xs">
              <div className="rounded-xl bg-neutral-50 p-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Direct Line:</span>
                <span className="font-mono font-semibold text-neutral-900">{profile.manager.phone}</span>
              </div>
              <div className="rounded-xl bg-neutral-50 p-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Private Email:</span>
                <span className="font-semibold text-teal-700">{profile.manager.email}</span>
              </div>
            </div>

            <button
              onClick={() => showToast("Connecting to Priority Wealth Desk...")}
              className="mt-5 w-full rounded-2xl bg-neutral-950 py-3 text-xs font-bold text-white transition hover:bg-neutral-800"
            >
              Request Callback / Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
