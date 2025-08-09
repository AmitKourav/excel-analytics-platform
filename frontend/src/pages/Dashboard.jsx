import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">File Upload</h2>
              <p className="text-gray-600">Upload and manage your files here.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Chart Display</h2>
              <p className="text-gray-600">View your analytics and progress.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Upload History</h2>
              <p className="text-gray-600">Check your previously uploaded files.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
