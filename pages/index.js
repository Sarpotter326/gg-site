import { useState } from "react";

export default function Home() {
  const [cart, setCart] = useState(0);

  const products = [
    { id: "A001", name: "Classic Gold Initial", price: 18, tag: "best seller", desc: "14k gold-plated custom letter" },
    { id: "A014", name: "Petite Pearl Drop", price: 12, tag: "new",          desc: "Dainty freshwater pearl" },
    { id: "B003", name: "Tiny Lightning Bolt", price: 10, tag: "popular",     desc: "Playful everyday pop" },
    { id: "C021", name: "Evil Eye Enamel",     price: 14, tag: "favorite",    desc: "Protection meets style" },
    { id: "D008", name: "Mini Butterfly",      price: 11, tag: "new",          desc: "Whimsical and light" },
    { id: "E005", name: "Birthstone CZ",       price: 13, tag: "custom",       desc: "Pick your month sparkle" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50/60 to-white text-neutral-900">
      {/* Announcement bar */}
      <div className="w-full bg-black px-4 py-2 text-center text-xs text-white">
        Free local pickup in NJ • Flat $5 shipping • Made with love ♡
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#" className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100">💖</span>
            <span className="font-serif text-xl">Grace & Gold Co.</span>
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#shop" className="hover:underline underline-offset-4">Shop</a>
            <a href="#book" className="hover:underline underline-offset-4">Permanent Jewelry</a>
            <a href="#events" className="hover:underline underline-offset-4">Events</a>
            <a href="#about" className="hover:underline underline-offset-4">About</a>
            <button className="rounded-2xl border px-3 py-1.5 text-sm">Subscribe</button>
          </nav>
          <button aria-label="Cart" className="relative rounded-full border p-2">
            🛒
            {cart > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-black px-1 text-xs text-white">
                {cart}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20 lg:px-8">
        <div>
          <span className="inline-block rounded-full border px-3 py-1 text-xs">Custom charms · Permanent jewelry</span>
          <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            Wear your story.<br />One charm at a time.
          </h1>
          <p className="mt-4 text-lg text-neutral-700">
            Personalized charms and clasp-less chains that celebrate people, milestones, and everyday magic—made in NJ, shipped anywhere.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href="#shop" className="rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm">Shop charms</a>
            <a href="#book" className="rounded-2xl border px-6 py-3 text-sm font-semibold">Book an event</a>
          </div>
          <p className="mt-3 text-xs text-neutral-600">⭐️ 4.9 average rating • Woman & LGBTQ+ owned • Small-batch crafted</p>
        </div>
        <div className="aspect-square rounded-[2rem] bg-gradient-to-tr from-rose-100 to-amber-100 shadow-lg" />
      </section>

      {/* Info strips */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-3 rounded-3xl border bg-white p-4 shadow-sm sm:grid-cols-3">
          <div className="rounded-2xl p-4">
            <p className="text-sm font-semibold">Hand-assembled</p>
            <p className="text-sm text-neutral-700">Every piece QC’d for durability & shine.</p>
          </div>
          <div className="rounded-2xl p-4">
            <p className="text-sm font-semibold">Hypoallergenic options</p>
            <p className="text-sm text-neutral-700">Gold-filled & stainless choices available.</p>
          </div>
          <div className="rounded-2xl p-4">
            <p className="text-sm font-semibold">Fast shipping</p>
            <p className="text-sm text-neutral-700">2–4 business days on most orders.</p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="shop" className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-4xl">Best Sellers</h2>
            <p className="mt-2 text-neutral-700">Hand-picked favorites to start your bracelet or stack.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <div key={p.id} className="rounded-3xl border bg-white p-5 shadow-sm">
                <div className="aspect-square w-full rounded-xl bg-gradient-to-tr from-rose-100 to-amber-100" />
                <div className="mt-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    <p className="text-sm text-neutral-600">SKU {p.id} · {p.desc}</p>
                  </div>
                  <span className="inline-flex items-center rounded-full border px-2 py-1 text-xs capitalize">{p.tag}</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-base font-semibold">${p.price.toFixed(2)}</span>
                  <button
                    onClick={() => setCart((c) => c + 1)}
                    className="rounded-2xl bg-black px-4 py-2 text-sm font-medium text-white shadow-sm"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="book" className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border bg-white p-6 text-center shadow-sm">
            <h3 className="text-2xl font-semibold">Join the charm club</h3>
            <p className="mt-2 text-neutral-700">Early access to drops, pop-up dates, and VIP perks. No spam, pinky promise.</p>
            <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <input aria-label="Email address" placeholder="you@glowmail.com" className="w-full rounded-2xl border px-4 py-2 sm:w-72" />
              <button className="rounded-2xl bg-black px-5 py-2 text-sm font-medium text-white">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-8 border-t bg-white/60">
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Grace & Gold Co. All rights reserved.
        </div>
      </footer>
    </div>
  );
}