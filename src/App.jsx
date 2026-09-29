import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import Cards from "./pages/Cards";
import Payments from "./pages/Payments";
import Analytics from "./pages/Analytics";
import Beneficiaries from "./pages/Beneficiaries";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import DashboardLayout from "./components/layout/DashboardLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* DASHBOARD & ALL APPLICATION PAGES */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/beneficiaries" element={<Beneficiaries />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
