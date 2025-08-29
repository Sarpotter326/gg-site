import React from "react";

export default function SidebarNav({ open, onClose }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      style={{ borderRight: '1px solid #eee' }}
    >
      <div className="flex items-center gap-3 px-6 py-6 border-b">
        <button
          className="text-3xl text-[#CBB292] mr-2 focus:outline-none"
          aria-label="Close sidebar"
          onClick={onClose}
        >
          &times;
        </button>
        <span className="text-2xl font-extralight tracking-tight" style={{ fontFamily: 'Quicksand, Avenir, sans-serif', color: '#CBB292', letterSpacing: '0.08em' }}>Grace & Gold Co.</span>
      </div>
      <nav className="mt-4 flex flex-col gap-2 px-6">
        <a href="/" className="py-4 text-xl font-serif text-[#CBB292] border-b font-bold">Home</a>
        <a href="#shop" className="py-4 text-xl font-serif text-neutral-900 border-b">Shop By</a>
        <a href="/charm-builder" className="py-4 text-xl font-serif text-[#B76E79] border-b">Charm Builder</a>
        <a href="#necklaces" className="py-4 text-xl font-serif text-neutral-900 border-b">Necklaces</a>
        <a href="#earrings" className="py-4 text-xl font-serif text-neutral-900 border-b">Earrings</a>
        <a href="#bracelets" className="py-4 text-xl font-serif text-neutral-900 border-b">Bracelets</a>
        <a href="#rings" className="py-4 text-xl font-serif text-neutral-900 border-b">Rings</a>
        <a href="#charms" className="py-4 text-xl font-serif text-neutral-900 border-b">Charms</a>
        <a href="#fine-jewelry" className="py-4 text-xl font-serif text-neutral-900 border-b">Fine Jewelry</a>
        <a href="#best-sellers" className="py-4 text-xl font-serif text-neutral-900 border-b">Best Sellers</a>
        <a href="#gifts" className="py-4 text-xl font-serif text-neutral-900 border-b">Gifts</a>
      </nav>
      <div className="absolute bottom-0 left-0 w-full px-6 py-8 border-t">
        <a href="#find-store" className="flex items-center gap-2 py-2 text-lg text-neutral-700">
          {/* Location SVG icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B76E79" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>
          Find A Store
        </a>
        <a href="#sign-in" className="flex items-center gap-2 py-2 text-lg text-neutral-700">
          {/* Person SVG icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B76E79" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/></svg>
          Sign In
        </a>
      </div>
    </div>
  );
}
