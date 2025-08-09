import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Header({ title }) {
  return (
    <header className="bg-white shadow p-4 flex items-center justify-between sticky top-0 z-10">
      <h1 className="text-xl font-bold text-slate-800">{title}</h1>
      <div className="flex items-center gap-3">
        <span className="text-slate-600 text-sm">Welcome, Keshav</span>
        <FaUserCircle size={28} className="text-slate-600" />
      </div>
    </header>
  );
}
