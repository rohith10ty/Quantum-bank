import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconShieldLock,
  IconBell,
  IconEye,
  IconGlobe,
  IconLock,
  IconDownload,
  IconAlertTriangle,
  IconCheck,
  IconDeviceMobile,
  IconMoon,
} from "@tabler/icons-react";

export default function Settings() {
  const [twoFactor, setTwoFactor] = useState(true);
  const [biometrics, setBiometrics] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);
  const [currency, setCurrency] = useState("INR");
  const [sessionTimeout, setSessionTimeout] = useState("15");
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
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

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-950">Settings & Security Vault</h2>
        <p className="text-xs sm:text-sm text-neutral-400">
          Configure multi-factor authentication, notifications, base currencies, and privacy controls
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 1. SECURITY & AUTHENTICATION */}
        <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-7 shadow-2xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
              <IconShieldLock size={20} />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-base">Security & Authentication</h3>
              <p className="text-xs text-neutral-400">Protect your funds with multi-layer defense</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-neutral-900">Two-Factor Authentication (2FA)</h4>
                <p className="text-xs text-neutral-400">Require authenticator code on every login</p>
              </div>
              <button
                onClick={() => {
                  setTwoFactor(!twoFactor);
                  showToast(!twoFactor ? "2FA has been enabled." : "2FA has been disabled.");
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  twoFactor ? "bg-[#14b8a6]" : "bg-neutral-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    twoFactor ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
              <div>
                <h4 className="text-sm font-bold text-neutral-900">Biometric Login (FaceID / TouchID)</h4>
                <p className="text-xs text-neutral-400">Instant biometric key authorization</p>
              </div>
              <button
                onClick={() => {
                  setBiometrics(!biometrics);
                  showToast(!biometrics ? "Biometrics enabled." : "Biometrics disabled.");
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  biometrics ? "bg-[#14b8a6]" : "bg-neutral-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    biometrics ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
              <div>
                <h4 className="text-sm font-bold text-neutral-900">Auto-Logout Inactivity Timer</h4>
                <p className="text-xs text-neutral-400">Automatically ends session when inactive</p>
              </div>
              <select
                value={sessionTimeout}
                onChange={(e) => {
                  setSessionTimeout(e.target.value);
                  showToast(`Session timeout set to ${e.target.value} minutes.`);
                }}
                className="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-bold text-neutral-800 outline-none"
              >
                <option value="5">5 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                onClick={() => showToast("Password reset link sent to your verified email!")}
                className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2 text-xs font-bold text-neutral-800 hover:bg-neutral-100 transition"
              >
                Change Master Password
              </button>
            </div>
          </div>
        </div>

        {/* 2. PREFERENCES & DISPLAY */}
        <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-7 shadow-2xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <IconGlobe size={20} />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-base">Regional & Preferences</h3>
              <p className="text-xs text-neutral-400">Customize currency, formatting, and appearance</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-neutral-900">Primary Display Currency</h4>
                <p className="text-xs text-neutral-400">All dashboard summaries convert to this base</p>
              </div>
              <select
                value={currency}
                onChange={(e) => {
                  setCurrency(e.target.value);
                  showToast(`Base currency updated to ${e.target.value}.`);
                }}
                className="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-bold text-neutral-800 outline-none"
              >
                <option value="INR">INR (₹) - Indian Rupee</option>
                <option value="USD">USD ($) - US Dollar</option>
                <option value="EUR">EUR (€) - Euro</option>
                <option value="GBP">GBP (£) - British Pound</option>
              </select>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
              <div>
                <h4 className="text-sm font-bold text-neutral-900">Language</h4>
                <p className="text-xs text-neutral-400">Interface localization</p>
              </div>
              <span className="text-xs font-bold text-neutral-800 bg-neutral-100 px-3 py-1 rounded-lg">
                English (International)
              </span>
            </div>
          </div>
        </div>

        {/* 3. NOTIFICATION PREFERENCES */}
        <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-7 shadow-2xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
              <IconBell size={20} />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-base">Notifications & Alerts</h3>
              <p className="text-xs text-neutral-400">Instant push notifications and SMS updates</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-neutral-900">Instant SMS on Debits & Credits</h4>
                <p className="text-xs text-neutral-400">Real-time alerts on all transactions</p>
              </div>
              <button
                onClick={() => setSmsAlerts(!smsAlerts)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  smsAlerts ? "bg-[#14b8a6]" : "bg-neutral-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    smsAlerts ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
              <div>
                <h4 className="text-sm font-bold text-neutral-900">Weekly Wealth & Spending Digest</h4>
                <p className="text-xs text-neutral-400">Comprehensive summary delivered every Sunday</p>
              </div>
              <button
                onClick={() => setEmailDigest(!emailDigest)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  emailDigest ? "bg-[#14b8a6]" : "bg-neutral-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    emailDigest ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* 4. PRIVACY & DANGER ZONE */}
        <div className="rounded-3xl border border-rose-200/80 bg-rose-50/30 p-6 sm:p-7 shadow-2xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-rose-100">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
              <IconAlertTriangle size={20} />
            </div>
            <div>
              <h3 className="font-bold text-rose-950 text-base">Account Protection & Controls</h3>
              <p className="text-xs text-rose-400">Emergency lockdown and data export</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-neutral-900">Export Complete Banking Archive</h4>
                <p className="text-xs text-neutral-400">Download all KYC records, statements, and receipts</p>
              </div>
              <button
                onClick={() => showToast("Preparing complete encrypted banking data archive (.zip)...")}
                className="flex items-center gap-1.5 rounded-xl border border-neutral-300 bg-white px-3 py-1.5 text-xs font-bold text-neutral-800 hover:bg-neutral-50 shadow-2xs"
              >
                <IconDownload size={14} />
                Download
              </button>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-rose-100">
              <div>
                <h4 className="text-sm font-bold text-rose-900">Emergency Account Lockdown</h4>
                <p className="text-xs text-rose-500">Temporarily suspends all outgoing cards and online transfers</p>
              </div>
              <button
                onClick={() => showToast("Emergency security protocol initiated.")}
                className="rounded-xl bg-rose-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-rose-700"
              >
                Lock Vault
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
