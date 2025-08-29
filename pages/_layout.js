import { useState } from "react";
import SidebarNav from "../app/SidebarNav";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      {/* Header */}
      <header className="w-full bg-white border-b border-[#F5E2DA]">
        <div className="flex items-center justify-between px-8 py-4">
          <button
            className="text-3xl text-[#CBB292] mr-2 focus:outline-none"
            aria-label="Open sidebar menu"
            onClick={() => setSidebarOpen(true)}
          >
            &#9776;
          </button>
          <span className="text-2xl font-extralight tracking-tight" style={{ fontFamily: 'Quicksand, Avenir, sans-serif', color: '#CBB292', letterSpacing: '0.08em' }}>Grace & Gold Co.</span>
        </div>
        <SidebarNav open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </header>
      {/* Main Content */}
      <main>{children}</main>
      {/* Footer */}
      <footer className="w-full bg-white border-t border-[#F5E2DA] text-center py-6 text-xs text-neutral-600">
        © {new Date().getFullYear()} Grace & Gold Co. All rights reserved.<br />
        <span className="text-xs text-neutral-600">⭐️ 4.9 average rating • Woman & LGBTQ+ owned • Small-batch crafted</span>
      </footer>
    </>
  );
}
