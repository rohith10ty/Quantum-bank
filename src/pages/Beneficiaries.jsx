import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  IconPlus,
  IconSearch,
  IconStar,
  IconStarFilled,
  IconSend,
  IconTrash,
  IconBuildingBank,
  IconCheck,
  IconX,
  IconUser,
} from "@tabler/icons-react";
import { beneficiaries as initialBeneficiaries } from "../data/bankingData";

export default function Beneficiaries() {
  const navigate = useNavigate();
  const [beneficiariesList, setBeneficiariesList] = useState(initialBeneficiaries);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [newBen, setNewBen] = useState({
    name: "",
    nickname: "",
    accountNo: "",
    bank: "HDFC Bank",
    ifsc: "",
    upiId: "",
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
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
    setShowAddModal(false);
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

  const filtered = beneficiariesList.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.nickname.toLowerCase().includes(search.toLowerCase()) ||
      b.bank.toLowerCase().includes(search.toLowerCase()) ||
      b.upiId.toLowerCase().includes(search.toLowerCase())
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

      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
            Beneficiaries Directory
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Manage your verified transfer contacts, bank accounts, and UPI payees
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-2xl bg-neutral-950 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-neutral-800 transition active:scale-95"
        >
          <IconPlus size={16} />
          Add New Beneficiary
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="relative max-w-md">
        <IconSearch size={18} className="absolute left-3.5 top-3 text-neutral-400" />
        <input
          type="text"
          placeholder="Search by name, bank, nickname, or UPI..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm font-medium outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-200"
        />
      </div>

      {/* BENEFICIARIES GRID */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((b) => (
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

              {/* DETAILS */}
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
                <div className="flex justify-between pt-1 border-t border-neutral-200/60">
                  <span className="text-neutral-400">Activity:</span>
                  <span className="text-neutral-600 font-medium">{b.lastSent}</span>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-5 flex items-center gap-2 pt-2">
              <button
                onClick={() => navigate("/payments")}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-neutral-950 py-2.5 text-xs font-bold text-white transition hover:bg-neutral-800"
              >
                <IconSend size={14} />
                Pay Now
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

      {/* ADD BENEFICIARY MODAL */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-neutral-200"
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <h3 className="text-lg font-bold text-neutral-900">Add New Beneficiary</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100"
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
                    onClick={() => setShowAddModal(false)}
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
