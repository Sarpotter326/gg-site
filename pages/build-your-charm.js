import React, { useState } from 'react';
import CharmBuilder from '../components/CharmBuilder';

/*
 * Page: Build Your Charm
 *
 * This page exposes the CharmBuilder component to end users.  It allows
 * visitors to choose how many charms their bracelet or necklace will
 * accommodate and then interactively fill those slots from the palette.
 * The surrounding layout uses Tailwind utility classes and basic inline
 * colours inspired by the Grace & Gold Co. palette (soft pinks, rich
 * browns and vibrant magentas).  Feel free to adjust classes to better
 * match your brand aesthetic.
 */

export default function BuildYourCharm() {
  // Default to five charm slots but allow user selection via dropdown.
  const [slotCount, setSlotCount] = useState(5);

  return (
    <div className="min-h-screen bg-[#F7CAC9] text-[#8C6A4E] flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Design Your Custom Charm</h1>

      {/* Selection for number of charms */}
      <label htmlFor="slotCount" className="mb-2 font-medium">Select number of charms:</label>
      <select
        id="slotCount"
        value={slotCount}
        onChange={(e) => setSlotCount(parseInt(e.target.value, 10))}
        className="mb-6 border border-[#D4AF37] rounded p-2 text-[#8C6A4E] bg-white focus:outline-none"
      >
        <option value={5}>5 charms (bracelet 7in)</option>
        <option value={7}>7 charms (bracelet 7.5–8in)</option>
        <option value={9}>9 charms (necklace 16in)</option>
        <option value={11}>11 charms (necklace 18in)</option>
        <option value={13}>13 charms (necklace 20–24in)</option>
      </select>

      {/* Charm builder interactive component */}
      <CharmBuilder slots={slotCount} />
    </div>
  );
}
