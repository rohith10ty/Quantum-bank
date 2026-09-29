import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconSend,
  IconReceipt,
  IconClock,
  IconCheck,
  IconUsers,
  IconStar,
  IconStarFilled,
  IconPlus,
  IconTrash,
  IconSearch,
  IconBolt,
  IconWifi,
  IconDeviceMobile,
  IconCreditCard,
  IconDroplet,
  IconFlame,
  IconX,
  IconChevronDown,
} from "@tabler/icons-react";
import { beneficiaries as initialBeneficiaries, billersList, accountsData } from "../data/bankingData";

const quickAmounts = [500, 1000, 2000, 5000, 10000, 25000];

export default function Payments() {
  const primaryAccount = accountsData.find((a) => a.id === "acc_1") || accountsData[0];
  const [activeTab, setActiveTab] = useState("send"); // 'send' | 'beneficiaries' | 'bills' | 'scheduled'
  const [tabDropdownOpen, setTabDropdownOpen] = useState(false);
  const tabDropdownRef = useRef(null);
  const [beneficiariesList, setBeneficiariesList] = useState(initialBeneficiaries);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [customUpi, setCustomUpi] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastPaymentDetails, setLastPaymentDetails] = useState(null);
  const [billers, setBillers] = useState(billersList);
  const [benSearch, setBenSearch] = useState("");
  const [showAddBenModal, setShowAddBenModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [newBen, setNewBen] = useState({
    name: "",
    nickname: "",
    accountNo: "",
    bank: "HDFC Bank",
    ifsc: "",
    upiId: "",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tabDropdownRef.current && !tabDropdownRef.current.contains(event.target)) {
        setTabDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const paymentTabs = [
    { id: "send", label: "Send Money", icon: IconSend, count: null, badgeColor: "bg-teal-500" },
    { id: "beneficiaries", label: "Beneficiaries", icon: IconUsers, count: beneficiariesList.length, badgeColor: "bg-purple-500" },
    { id: "bills", label: "Pay Bills", icon: IconReceipt, count: billers.length, badgeColor: "bg-blue-500" },
    { id: "scheduled", label: "Auto-Pay", icon: IconClock, count: 3, badgeColor: "bg-amber-500" },
  ];

  const currentTabObj = paymentTabs.find((t) => t.id === activeTab) || paymentTabs[0];
  const CurrentIcon = currentTabObj.icon;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleSendPayment = (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      showToast("Please enter a valid transfer amount");
      return;
    }

    if (!customUpi.trim() && !selectedRecipient) {
      showToast("Please select a recipient or enter a UPI ID / Account Number");
      return;
    }

    const recipientName = customUpi.trim() ? customUpi : selectedRecipient?.name || "Beneficiary";
    setLastPaymentDetails({
      recipient: recipientName,
      amount: parseFloat(amount),
      note: note.trim() || "Quantum Instant Transfer",
      ref: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });

    setShowSuccessModal(true);
  };

  const handlePayBill = (billId, billName, billAmount) => {
    setBillers((prev) => prev.filter((b) => b.id !== billId));
    showToast(`Paid ${billName} of ${billAmount} successfully via Quantum Instant BillPay!`);
  };

  const toggleFavorite = (id) => {
    setBeneficiariesList((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isFavorite: !b.isFavorite } : b))
    );
  };

  const deleteBeneficiary = (id, name) => {
    setBeneficiariesList((prev) => prev.filter((b) => b.id !== id));
    showToast(`Removed ${name} from beneficiaries.`);
  };

  const handleAddBeneficiary = (e) => {
    e.preventDefault();
    if (!newBen.name) return;

    const initials = newBen.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const colors = ["bg-purple-600", "bg-teal-600", "bg-blue-600", "bg-rose-600", "bg-amber-600"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const created = {
      id: `ben_${Date.now()}`,
      name: newBen.name,
      nickname: newBen.nickname || newBen.name.split(" ")[0],
      accountNo: `•••• ${newBen.accountNo.slice(-4) || "1029"}`,
      bank: newBen.bank,
      ifsc: newBen.ifsc || "QNTM0009912",
      upiId: newBen.upiId || `${newBen.nickname.toLowerCase() || "user"}@upi`,
      avatar: initials,
      color: randomColor,
      isFavorite: false,
      lastSent: "Just added",
    };

    setBeneficiariesList([created, ...beneficiariesList]);
    setShowAddBenModal(false);
    setNewBen({
      name: "",
      nickname: "",
      accountNo: "",
      bank: "HDFC Bank",
      ifsc: "",
      upiId: "",
    });
    showToast(`Beneficiary ${created.name} added successfully!`);
  };

  const filteredBeneficiaries = beneficiariesList.filter(
    (b) =>
      b.name.toLowerCase().includes(benSearch.toLowerCase()) ||
      b.nickname.toLowerCase().includes(benSearch.toLowerCase()) ||
      b.bank.toLowerCase().includes(benSearch.toLowerCase()) ||
      b.upiId.toLowerCase().includes(benSearch.toLowerCase())
  );

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

      {/* HEADER TABS */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950">Payments & Beneficiaries Hub</h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Instant UPI transfers, saved payees directory, utility bills, and auto-debit mandates
          </p>
        </div>

        {/* MOBILE DROPDOWN SELECTOR (VISIBLE ON MOBILE ONLY) */}
        <div ref={tabDropdownRef} className="relative w-full sm:hidden">
          <button
            type="button"
            onClick={() => setTabDropdownOpen((prev) => !prev)}
            className="flex w-full items-center justify-between gap-2.5 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-left shadow-xs transition hover:border-neutral-300 cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <CurrentIcon size={16} stroke={2.2} />
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-neutral-900">
                  {currentTabObj.label} {currentTabObj.count !== null ? `(${currentTabObj.count})` : ""}
                </p>
                <p className="text-[10px] text-neutral-500">
                  {activeTab === "send"
                    ? "Instant Transfer & UPI"
                    : activeTab === "beneficiaries"
                    ? "Saved Payees & Accounts"
                    : activeTab === "bills"
                    ? "Utilities & Due Bills"
                    : "Recurring & SIPs"}
                </p>
              </div>
            </div>
            <IconChevronDown
              size={18}
              className={`shrink-0 text-neutral-500 transition-transform duration-200 ${
                tabDropdownOpen ? "rotate-180 text-neutral-900" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {tabDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 right-0 top-full z-40 mt-1.5 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-1.5 shadow-xl"
              >
                {paymentTabs.map((tab) => {
                  const isSelected = tab.id === activeTab;
                  const TabIcon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(tab.id);
                        setTabDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition cursor-pointer ${
                        isSelected
                          ? "bg-neutral-100 text-neutral-950 font-bold"
                          : "text-neutral-700 hover:bg-neutral-50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl ${
                            isSelected
                              ? "bg-teal-600 text-white"
                              : "bg-neutral-100 text-neutral-600"
                          }`}
                        >
                          <TabIcon size={16} stroke={isSelected ? 2.4 : 1.8} />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-bold text-neutral-900">
                            {tab.label} {tab.count !== null ? `(${tab.count})` : ""}
                          </p>
                          <p className="text-[10px] text-neutral-500">
                            {tab.id === "send"
                              ? "Instant Transfer & UPI"
                              : tab.id === "beneficiaries"
                              ? "Saved Payees Directory"
                              : tab.id === "bills"
                              ? "Utility Bills & Utilities"
                              : "Recurring Payments & SIP"}
                          </p>
                        </div>
                      </div>
                      {isSelected && (
                        <IconCheck size={16} className="shrink-0 text-teal-600" />
                      )}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 4 TABS (DESKTOP / TABLET ONLY) */}
        <div className="hidden sm:flex items-center gap-1.5 rounded-2xl bg-neutral-200/70 p-1.5 overflow-x-auto no-scrollbar">
          {paymentTabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? "bg-white text-neutral-950 shadow-xs"
                    : "text-neutral-600 hover:text-neutral-950"
                }`}
              >
                <TabIcon size={15} />
                {tab.label} {tab.count !== null ? `(${tab.count})` : ""}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: SEND MONEY FORM */}
      {activeTab === "send" && (
        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8 shadow-2xs">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">Transfer Details</h3>

            {/* RECENT BENEFICIARIES QUICK SELECT */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-neutral-600">
                  Quick Select Saved Beneficiary
                </label>
                <button
                  type="button"
                  onClick={() => setActiveTab("beneficiaries")}
                  className="text-xs font-bold text-teal-700 hover:underline"
                >
                  Manage All →
                </button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                {beneficiariesList.map((b) => {
                  const isSelected = selectedRecipient?.id === b.id && !customUpi;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => {
                        if (selectedRecipient?.id === b.id) {
                          setSelectedRecipient(null);
                        } else {
                          setSelectedRecipient(b);
                          setCustomUpi("");
                        }
                      }}
                      className={`flex flex-col items-center p-3 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#14b8a6] bg-teal-50/70 ring-2 ring-[#14b8a6]/30 shadow-xs"
                          : "border-neutral-200 hover:bg-neutral-50"
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl text-white font-bold text-xs shadow-xs ${b.color}`}
                      >
                        {b.avatar}
                      </div>
                      <span className="mt-2 text-xs font-bold text-neutral-800 truncate w-full text-center">
                        {b.nickname}
                      </span>
                      <span className="text-[10px] text-neutral-400 truncate w-full text-center">
                        {b.bank}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSendPayment} className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-neutral-700">
                    Recipient UPI ID / Bank Account
                  </label>
                  {selectedRecipient && !customUpi && (
                    <button
                      type="button"
                      onClick={() => setSelectedRecipient(null)}
                      className="text-[11px] font-semibold text-neutral-400 hover:text-rose-600 transition cursor-pointer"
                    >
                      Clear Selection
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. name@okhdfcbank or 9823489102"
                    value={
                      customUpi ||
                      (selectedRecipient ? `${selectedRecipient.name} (${selectedRecipient.upiId})` : "")
                    }
                    onChange={(e) => {
                      setCustomUpi(e.target.value);
                      setSelectedRecipient(null);
                    }}
                    className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs sm:text-sm font-semibold text-neutral-900 outline-none focus:border-neutral-950 focus:bg-white transition"
                  />
                  {(customUpi || selectedRecipient) && (
                    <button
                      type="button"
                      onClick={() => {
                        setCustomUpi("");
                        setSelectedRecipient(null);
                      }}
                      className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                    >
                      <IconX size={16} />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1.5">
                  Transfer Amount (INR ₹)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-xl font-bold text-neutral-400 font-mono">₹</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="w-full rounded-2xl border border-neutral-200 bg-white py-3 pl-10 pr-4 font-mono text-2xl font-bold text-neutral-950 outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-200"
                    required
                  />
                </div>

                <div className="flex flex-wrap gap-2 mt-2.5">
                  {quickAmounts.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setAmount(q.toString())}
                      className={`rounded-lg px-2.5 py-1 text-xs font-mono font-semibold transition ${
                        amount === q.toString()
                          ? "bg-neutral-950 text-white"
                          : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                      }`}
                    >
                      +₹{q.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1.5">
                  Remarks / Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Add a remark / note (optional)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-medium outline-none focus:border-neutral-950"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-neutral-900 to-neutral-950 py-3.5 text-sm font-bold text-white shadow-lg transition hover:shadow-xl active:scale-[0.99] cursor-pointer"
              >
                <IconSend size={18} />
                Send {amount && parseFloat(amount) > 0 ? `₹${parseFloat(amount).toLocaleString("en-IN")}` : "Money"} Now
              </button>
            </form>
          </div>

          {/* RIGHT: SUMMARY CARD */}
          <div className="space-y-4">
            {/* Beneficiary Details (Only visible when a recipient is selected) */}
            <AnimatePresence>
              {selectedRecipient && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-3xl border border-teal-500/30 bg-teal-50/40 p-5 sm:p-6 shadow-2xs"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800">
                      Beneficiary Details
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedRecipient(null)}
                      className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition cursor-pointer"
                    >
                      Deselect
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl text-white font-bold text-sm shadow-xs ${selectedRecipient.color}`}
                    >
                      {selectedRecipient.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-neutral-950">{selectedRecipient.name}</p>
                      <p className="text-xs text-neutral-500">{selectedRecipient.bank}</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 rounded-2xl bg-white p-3.5 border border-teal-100 text-xs">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Account No:</span>
                      <span className="font-mono font-semibold text-neutral-900">{selectedRecipient.accountNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">UPI ID:</span>
                      <span className="font-mono font-semibold text-teal-700">{selectedRecipient.upiId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">IFSC Code:</span>
                      <span className="font-mono font-semibold text-neutral-900">{selectedRecipient.ifsc}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-2xs">
              <h4 className="font-bold text-neutral-900 text-sm mb-3">Debit Source Account</h4>
              <div className="rounded-2xl bg-neutral-50 p-4 border border-neutral-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500 font-medium">{primaryAccount.name}</span>
                  <span className="rounded bg-teal-100 px-2 py-0.5 text-[10px] font-bold text-teal-800">Primary</span>
                </div>
                <p className="mt-2 text-xl font-bold font-mono text-neutral-950">
                  ₹{primaryAccount.balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </p>
                <p className="text-[11px] text-neutral-400 font-mono mt-0.5">Acc: {primaryAccount.accountNumber}</p>
              </div>

              <div className="mt-5 space-y-2 text-xs text-neutral-500">
                <div className="flex justify-between">
                  <span>Transfer Mode:</span>
                  <span className="font-bold text-neutral-900">Quantum FastIMPS (0.2s)</span>
                </div>
                <div className="flex justify-between">
                  <span>Transfer Fee:</span>
                  <span className="font-bold text-emerald-600">₹0.00 (Zero Fee)</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily Limit Remaining:</span>
                  <span className="font-bold text-neutral-900 font-mono">₹4,95,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BENEFICIARIES DIRECTORY */}
      {activeTab === "beneficiaries" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full max-w-md">
              <IconSearch size={18} className="absolute left-3.5 top-3 text-neutral-400" />
              <input
                type="text"
                placeholder="Search beneficiaries by name, bank, or UPI..."
                value={benSearch}
                onChange={(e) => setBenSearch(e.target.value)}
                className="w-full rounded-2xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm font-medium outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-200"
              />
            </div>

            <button
              onClick={() => setShowAddBenModal(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-neutral-950 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-neutral-800 transition"
            >
              <IconPlus size={16} />
              Add Beneficiary
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBeneficiaries.map((b) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group flex flex-col justify-between rounded-3xl border border-neutral-200/80 bg-white p-5 shadow-2xs hover:shadow-md transition-all hover:border-neutral-300"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white font-bold text-base shadow-sm ${b.color}`}
                      >
                        {b.avatar}
                      </div>

                      <div>
                        <h4 className="font-bold text-neutral-900 text-base">{b.name}</h4>
                        <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-bold text-neutral-600">
                          {b.nickname}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleFavorite(b.id)}
                      className="text-amber-400 hover:scale-110 transition p-1"
                    >
                      {b.isFavorite ? <IconStarFilled size={20} /> : <IconStar size={20} className="text-neutral-300" />}
                    </button>
                  </div>

                  <div className="mt-4 space-y-1.5 rounded-2xl bg-neutral-50 p-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Bank:</span>
                      <span className="font-semibold text-neutral-800">{b.bank}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Account:</span>
                      <span className="font-mono font-semibold text-neutral-800">{b.accountNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">UPI ID:</span>
                      <span className="font-mono font-semibold text-teal-700">{b.upiId}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 pt-2">
                  <button
                    onClick={() => {
                      setSelectedRecipient(b);
                      setCustomUpi("");
                      setActiveTab("send");
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-neutral-950 py-2.5 text-xs font-bold text-white transition hover:bg-neutral-800"
                  >
                    <IconSend size={14} />
                    Send Money
                  </button>

                  <button
                    onClick={() => deleteBeneficiary(b.id, b.name)}
                    className="rounded-xl border border-neutral-200 p-2.5 text-neutral-400 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 transition"
                  >
                    <IconTrash size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: BILLS HUB */}
      {activeTab === "bills" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {billers.map((b) => (
              <div
                key={b.id}
                className="flex flex-col justify-between rounded-3xl border border-neutral-200/80 bg-white p-5 shadow-2xs hover:shadow-md transition"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="text-2xl">{b.icon}</span>
                    <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-700">
                      {b.due}
                    </span>
                  </div>

                  <h4 className="mt-4 font-bold text-neutral-900 text-sm">{b.name}</h4>
                  <p className="text-xs text-neutral-400">{b.category}</p>

                  <p className="mt-4 font-mono text-2xl font-bold text-neutral-950">{b.amount}</p>
                </div>

                <button
                  onClick={() => handlePayBill(b.id, b.name, b.amount)}
                  className="mt-5 w-full rounded-xl bg-neutral-950 py-2.5 text-xs font-bold text-white transition hover:bg-neutral-800"
                >
                  Pay Now
                </button>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-2xs">
            <h3 className="font-bold text-neutral-900 text-base mb-4">Pay Any New Utility Bill</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: "Electricity", icon: IconBolt },
                { label: "Broadband", icon: IconWifi },
                { label: "Mobile Recharge", icon: IconDeviceMobile },
                { label: "Credit Cards", icon: IconCreditCard },
                { label: "Water", icon: IconDroplet },
                { label: "Piped Gas", icon: IconFlame },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => showToast(`Opening ${item.label} biller selector...`)}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-neutral-200 p-4 transition hover:border-neutral-900 hover:bg-neutral-50"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-900">
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-bold text-neutral-800 text-center">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SCHEDULED / AUTO-PAY */}
      {activeTab === "scheduled" && (
        <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-2xs">
          <h3 className="font-bold text-neutral-900 text-base mb-4">Active Auto-Debit Mandates</h3>
          <div className="divide-y divide-neutral-100">
            {[
              { name: "Zerodha SIP Equity Mutual Fund", amount: "₹25,000", next: "Oct 01, 2026", status: "Active" },
              { name: "Rent to Landlord (Rohit K)", amount: "₹38,000", next: "Oct 05, 2026", status: "Active" },
              { name: "Netflix 4K Ultra Subscription", amount: "₹649", next: "Oct 27, 2026", status: "Active" },
            ].map((mandate, idx) => (
              <div key={idx} className="flex items-center justify-between py-4">
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm">{mandate.name}</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Next trigger: {mandate.next}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono font-bold text-base text-neutral-950">{mandate.amount}</span>
                  <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800">
                    {mandate.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUCCESS TRANSFER MODAL */}
      <AnimatePresence>
        {showSuccessModal && lastPaymentDetails && (
          <div
            onClick={() => setShowSuccessModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs cursor-pointer"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm rounded-3xl bg-white p-7 text-center shadow-2xl border border-neutral-200 cursor-default"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 mb-3 animate-bounce">
                <IconCheck size={28} stroke={2.5} />
              </div>

              <h3 className="text-xl font-bold text-neutral-900">Transfer Successful!</h3>
              <p className="text-xs text-neutral-400 mt-1">Payment processed in 0.18 seconds</p>

              <div className="my-5 rounded-2xl bg-neutral-50 p-4 space-y-2 text-xs">
                <p className="text-2xl font-bold font-mono text-teal-700">
                  ₹{lastPaymentDetails.amount.toLocaleString("en-IN")}
                </p>
                <div className="flex justify-between pt-2 border-t border-neutral-200">
                  <span className="text-neutral-400">Sent To:</span>
                  <span className="font-bold text-neutral-900">{lastPaymentDetails.recipient}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Reference:</span>
                  <span className="font-mono font-bold text-neutral-900">{lastPaymentDetails.ref}</span>
                </div>
              </div>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full rounded-xl bg-neutral-950 py-3 text-xs font-bold text-white shadow-md hover:bg-neutral-800 transition"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD BENEFICIARY MODAL */}
      <AnimatePresence>
        {showAddBenModal && (
          <div
            onClick={() => setShowAddBenModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs cursor-pointer"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-neutral-200 cursor-default"
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <h3 className="text-lg font-bold text-neutral-900">Add New Beneficiary</h3>
                <button
                  onClick={() => setShowAddBenModal(false)}
                  className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 cursor-pointer"
                >
                  <IconX size={20} />
                </button>
              </div>

              <form onSubmit={handleAddBeneficiary} className="mt-4 space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-neutral-700">Full Legal Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Priya Sharma"
                    value={newBen.name}
                    onChange={(e) => setNewBen({ ...newBen, name: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-900 outline-none focus:border-neutral-950 focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700">Nickname / Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Priya, Co-founder, Landlord"
                    value={newBen.nickname}
                    onChange={(e) => setNewBen({ ...newBen, nickname: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-900 outline-none focus:border-neutral-950 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-neutral-700">Bank Name</label>
                    <select
                      value={newBen.bank}
                      onChange={(e) => setNewBen({ ...newBen, bank: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-2.5 text-xs font-semibold text-neutral-900 outline-none focus:border-neutral-950 focus:bg-white"
                    >
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="State Bank of India">State Bank of India</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Kotak Mahindra">Kotak Mahindra</option>
                      <option value="Quantum Bank">Quantum Bank</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-700">IFSC Code</label>
                    <input
                      type="text"
                      placeholder="e.g. HDFC0001092"
                      value={newBen.ifsc}
                      onChange={(e) => setNewBen({ ...newBen, ifsc: e.target.value.toUpperCase() })}
                      className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-xs font-semibold font-mono text-neutral-900 outline-none focus:border-neutral-950 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700">Account Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 5010049281920"
                    value={newBen.accountNo}
                    onChange={(e) => setNewBen({ ...newBen, accountNo: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-xs font-semibold font-mono text-neutral-900 outline-none focus:border-neutral-950 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700">UPI Virtual Address</label>
                  <input
                    type="text"
                    placeholder="e.g. priya@okhdfcbank"
                    value={newBen.upiId}
                    onChange={(e) => setNewBen({ ...newBen, upiId: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-xs font-semibold text-neutral-900 outline-none focus:border-neutral-950 focus:bg-white"
                  />
                </div>

                <div className="pt-3 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-neutral-950 py-3 text-xs font-bold text-white shadow-md hover:bg-neutral-800 transition"
                  >
                    Save Beneficiary
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddBenModal(false)}
                    className="rounded-xl border border-neutral-200 px-4 py-3 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
