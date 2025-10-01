'use client';

import { useState } from 'react';
import Link from 'next/link';
import SidebarNav from './SidebarNav';

export default function Home() {
  const [cart, setCart] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const products = [
    { id: 'A001', name: 'Classic Gold Initial', price: 18, tag: 'best seller', desc: '14k gold-plated custom letter' },
    { id: 'A014', name: 'Petite Pearl Drop', price: 12, tag: 'new', desc: 'Dainty freshwater pearl' },
    { id: 'B003', name: 'Tiny Lightning Bolt', price: 10, tag: 'popular', desc: 'Playful everyday pop' },
    { id: 'C021', name: 'Evil Eye Enamel', price: 14, tag: 'favorite', desc: 'Protection meets style' },
    { id: 'D008', name: 'Mini Butterfly', price: 11, tag: 'new', desc: 'Whimsical and light' },
    { id: 'E005', name: 'Birthstone CZ', price: 13, tag: 'custom', desc: 'Pick your month sparkle' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-emerald-50 text-neutral-900 font-sans">
      <header className="w-full bg-white border-b border-[#F5E2DA]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              className="text-3xl text-[#CBB292] mr-2 focus:outline-none"
              aria-label="Open sidebar menu"
              onClick={() => setSidebarOpen(true)}
            >
              &#9776;
            </button>
            <Link href="/" className="text-2xl font-extralight tracking-tight" style={{ fontFamily: 'Quicksand, Avenir, sans-serif', color: '#CBB292', letterSpacing: '0.08em', textDecoration: 'none' }}>
              Grace &amp; Gold Co.
            </Link>
          </div>
          <button aria-label="Cart" className="relative rounded-full border border-[#B76E79] p-2 bg-white shadow-sm">
            🛒
            {cart > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#B76E79] px-1 text-xs text-white">
                {cart}
              </span>
            )}
          </button>
        </div>
        {sidebarOpen && (
          <>
            <SidebarNav open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div
              className="fixed top-0 left-80 right-0 bottom-0 z-40 bg-black bg-opacity-10 cursor-pointer"
              onClick={() => setSidebarOpen(false)}
            />
          </>
        )}
      </header>

      <section className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-16 sm:px-8 lg:grid-cols-2 lg:py-20 lg:px-12">
        <div>
          <span className="inline-block rounded-full px-3 py-1 text-xs font-medium" style={{ color: '#B76E79', background: '#F5E2DA' }}>
            Custom charms · Permanent jewelry
          </span>
          <h1 className="mt-6 font-serif text-5xl font-bold leading-tight text-neutral-900">
            Wear your story.<br />One charm at a time.
          </h1>
          <p className="mt-4 text-lg text-neutral-700 max-w-md">
            Personalized charms and clasp-less chains that celebrate people, milestones, and everyday magic—made in NJ, shipped anywhere.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#shop" className="rounded-full bg-[#B76E79] px-7 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#F5E2DA] hover:text-[#B76E79] transition">Shop charms</a>
            <a href="#book" className="rounded-full border border-[#B76E79] px-7 py-3 text-base font-semibold text-[#B76E79] hover:bg-[#F5E2DA] transition">Book an event</a>
          </div>
        </div>
        <div className="aspect-square rounded-3xl bg-[#F5E2DA] shadow-lg" />
      </section>

      <section className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
        <div className="grid gap-6 rounded-3xl bg-white p-6 shadow-sm sm:grid-cols-3">
          <div className="rounded-2xl p-4">
            <p className="text-sm font-semibold">Hand-assembled</p>
            <p className="text-sm text-neutral-700">Every piece QC’d for durability &amp; shine.</p>
          </div>
          <div className="rounded-2xl p-4">
            <p className="text-sm font-semibold">Hypoallergenic options</p>
            <p className="text-sm text-neutral-700">Gold-filled &amp; stainless choices available.</p>
          </div>
          <div className="rounded-2xl p-4">
            <p className="text-sm font-semibold">Fast shipping</p>
            <p className="text-sm text-neutral-700">2–4 business days on most orders.</p>
          </div>
        </div>
      </section>

      <section id="shop" className="py-16">
        <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#B76E79]">Best Sellers</h2>
            <p className="mt-2 text-neutral-700">Hand-picked favorites to start your bracelet or stack.</p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <div key={p.id} className="rounded-3xl bg-white p-8 shadow-lg flex flex-col items-center">
                <div className="aspect-square w-full rounded-2xl bg-[#F5E2DA] mb-6 shadow" />
                <div className="mt-2 flex flex-col items-center">
                  <h3 className="text-lg font-semibold text-[#B76E79] mb-1">{p.name}</h3>
                  <p className="text-sm text-neutral-600 mb-2">SKU {p.id} · {p.desc}</p>
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs capitalize font-medium bg-[#F5E2DA] text-[#B76E79]">{p.tag}</span>
                </div>
                <div className="mt-4 flex items-center justify-between w-full">
                  <span className="text-base font-semibold text-[#B76E79]">${p.price.toFixed(2)}</span>
                  <button
                    onClick={() => setCart((c) => c + 1)}
                    className="rounded-full bg-[#B76E79] px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#F5E2DA] hover:text-[#B76E79]"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mt-8 border-t bg-white/60">
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Grace &amp; Gold Co. All rights reserved.
          <br />
          <span className="text-xs text-neutral-600">⭐️ 4.9 average rating • Woman &amp; LGBTQ+ owned • Small-batch crafted</span>
        </div>
      </footer>
    </div>
  );
}
