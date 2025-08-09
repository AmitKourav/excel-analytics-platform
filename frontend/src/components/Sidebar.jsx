import React from "react";
import { FaUpload, FaChartBar, FaHistory } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-800 text-white p-5 flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Excel Analytics</h2>
        <p className="text-sm text-slate-300 mt-1">User Dashboard</p>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <a href="#upload" className="flex items-center gap-3 p-3 rounded hover:bg-slate-700">
              <FaUpload /> <span>Upload File</span>
            </a>
          </li>
          <li>
            <a href="#chart" className="flex items-center gap-3 p-3 rounded hover:bg-slate-700">
              <FaChartBar /> <span>Chart View</span>
            </a>
          </li>
          <li>
            <a href="#history" className="flex items-center gap-3 p-3 rounded hover:bg-slate-700">
              <FaHistory /> <span>Upload History</span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="mt-auto pt-4 border-t border-slate-700">
        <div className="text-sm text-slate-300">Signed in as</div>
        <div className="mt-2 font-medium">Keshav Rathore</div>
      </div>
    </aside>
  );
}
