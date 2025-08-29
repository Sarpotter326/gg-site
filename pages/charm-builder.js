import React, { useState } from "react";
import Image from "next/image";
import Layout from "./_layout";

const charmImages = [
  "/Charms/Floral & Nature/Screen Shot 2025-07-29 at 9.27.08 PM.png"
  // Add more charm image paths here
];

const chainImages = [
  "/Chains/Screenshot 2025-08-28 at 9.12.29 PM.png",
  "/Chains/a876ef7a-1889-46e2-94c4-5f0dfeaef990.png"
];


const chainColors = ["Gold", "Silver"];
const chainTypes = ["Curb", "Capri", "Sparkle", "Tiny Paperclip", "Paperclip", "Striped"];
const necklaceLengths = ["16\"", "18\"", "20\"", "22\""];
const braceletLengths = ["6.5\"", "7\"", "7.5\""];
const charmCounts = [5, 7, 9];

export default function CharmBuilder() {
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [selectedChainColor, setSelectedChainColor] = useState(chainColors[0]);
  const [selectedChainType, setSelectedChainType] = useState(chainTypes[0]);
  const [selectedLength, setSelectedLength] = useState(necklaceLengths[0]);
  const [isBracelet, setIsBracelet] = useState(false);
  const [addExtender, setAddExtender] = useState(false);
  const [selectedCharmCount, setSelectedCharmCount] = useState(charmCounts[0]);
  const [placedCharms, setPlacedCharms] = useState(Array(selectedCharmCount).fill({ idx: undefined }));

  // Reset placedCharms when selectedCharmCount changes
  React.useEffect(() => {
    setPlacedCharms(Array(selectedCharmCount).fill({ idx: undefined }));
  }, [selectedCharmCount]);

  // Drag and drop logic
  const handleDrop = (e) => {
    const charmIdx = e.dataTransfer.getData("charmIdx");
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    setPlacedCharms([...placedCharms, { idx: charmIdx, x, y }]);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-12">
        <h2 className="text-2xl font-extralight tracking-tight mb-6" style={{ fontFamily: 'Quicksand, Avenir, sans-serif', color: '#B76E79', letterSpacing: '0.08em' }}>Build Your Custom Jewelry</h2>
        {/* Chain Carousel & Options */}
        <div className="mb-8">
          <h3 className="text-lg mb-2">Select a Chain:</h3>
          <div className="flex items-center gap-4">
            <button onClick={() => setCarouselIdx((carouselIdx - 1 + chainImages.length) % chainImages.length)} className="px-2 py-1 border rounded">&#8592;</button>
            <Image src={chainImages[carouselIdx]} alt={`Chain ${carouselIdx+1}`} width={220} height={220} className="rounded shadow object-cover" />
            <button onClick={() => setCarouselIdx((carouselIdx + 1) % chainImages.length)} className="px-2 py-1 border rounded">&#8594;</button>
          </div>
          <div className="flex gap-2 mt-4">
            {chainTypes.map(type => (
              <button key={type} onClick={() => setSelectedChainType(type)} className={`px-3 py-1 rounded border text-sm ${selectedChainType === type ? 'border-[#B76E79] bg-[#FDECEF]' : 'border-neutral-200 bg-white'}`}>{type}</button>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            {chainColors.map(color => (
              <button key={color} onClick={() => setSelectedChainColor(color)} className={`px-4 py-2 rounded border ${selectedChainColor === color ? 'border-[#B76E79] bg-[#FDECEF]' : 'border-neutral-200 bg-white'}`}>{color}</button>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={() => setIsBracelet(false)} className={`px-4 py-2 rounded border ${!isBracelet ? 'border-[#B76E79] bg-[#FDECEF]' : 'border-neutral-200 bg-white'}`}>Necklace</button>
            <button onClick={() => setIsBracelet(true)} className={`px-4 py-2 rounded border ${isBracelet ? 'border-[#B76E79] bg-[#FDECEF]' : 'border-neutral-200 bg-white'}`}>Bracelet</button>
          </div>
          <div className="flex gap-2 mt-4">
            {(isBracelet ? braceletLengths : necklaceLengths).map(len => (
              <button key={len} onClick={() => setSelectedLength(len)} className={`px-3 py-1 rounded border ${selectedLength === len ? 'border-[#B76E79] bg-[#FDECEF]' : 'border-neutral-200 bg-white'}`}>{len}</button>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4">
            <input type="checkbox" id="extender" checked={addExtender} onChange={e => setAddExtender(e.target.checked)} />
            <label htmlFor="extender" className="text-sm">Add Extender</label>
          </div>
          <div className="flex gap-2 mt-4">
            <span className="text-sm">Number of Charms:</span>
            {charmCounts.map(count => (
              <button key={count} onClick={() => setSelectedCharmCount(count)} className={`px-3 py-1 rounded border ${selectedCharmCount === count ? 'border-[#B76E79] bg-[#FDECEF]' : 'border-neutral-200 bg-white'}`}>{count}</button>
            ))}
          </div>
        </div>
        {/* Charms Drag & Drop */}
        <div className="mb-8">
          <h3 className="text-lg mb-2">Select & Drag Charms:</h3>
          <div className="flex gap-4">
            {charmImages.map((src, i) => (
              <Image
                key={i}
                src={src}
                alt={`Charm ${i+1}`}
                width={50}
                height={50}
                draggable
                onDragStart={e => e.dataTransfer.setData("charmIdx", i)}
                className="cursor-grab border rounded"
              />
            ))}
          </div>
        </div>
        {/* Mock Chain SVG for charm placement */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg mb-2">Place Charms on Your Chain:</h3>
          <div
            className="border rounded-lg bg-neutral-50 p-4"
            style={{ minHeight: 140 }}
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              const charmIdx = e.dataTransfer.getData("charmIdx");
              // Find nearest empty spot
              const emptyIdx = placedCharms.findIndex(c => c.idx === undefined);
              if (emptyIdx !== -1) {
                const newPlaced = [...placedCharms];
                newPlaced[emptyIdx] = { idx: Number(charmIdx) };
                setPlacedCharms(newPlaced);
              }
            }}
          >
            {(() => {
              // Map length to SVG width
              const lengthMap = {
                '16"': 1200,
                '18"': 1500,
                '20"': 1800,
                '22"': 2100,
                '6.5"': 900,
                '7"': 1100,
                '7.5"': 1300
              };
              const svgWidth = lengthMap[selectedLength] || 1500;
              const chainStart = 20;
              const chainEnd = svgWidth - 20;
              return (
                <svg width={svgWidth} height={120} style={{ background: '#fff', borderRadius: 12 }}>
                  {/* Draw chain */}
                  <path d={`M${chainStart},60 Q${svgWidth/2},100 ${chainEnd},60`} stroke="#CBB292" strokeWidth={4} fill="none" />
                  {/* Charm drop zones */}
                  {Array.from({ length: selectedCharmCount }, (_, i) => {
                    // Spread charm spots evenly, with extra margin
                    const margin = svgWidth * 0.12;
                    const spreadStart = chainStart + margin;
                    const spreadEnd = chainEnd - margin;
                    const x = spreadStart + (i * (spreadEnd - spreadStart) / (selectedCharmCount - 1));
                    return (
                      <circle key={i} cx={x} cy={60} r={22} fill="#FDECEF" stroke="#B76E79" strokeWidth={2} />
                    );
                  })}
                  {/* Placed charms */}
                  {placedCharms.map((charm, i) => (
                    charm.idx !== undefined ? (
                      <image
                        key={i}
                        href={charmImages[charm.idx]}
                        x={(() => {
                          const margin = svgWidth * 0.12;
                          const spreadStart = chainStart + margin;
                          const spreadEnd = chainEnd - margin;
                          return spreadStart + (i * (spreadEnd - spreadStart) / (selectedCharmCount - 1)) - 20;
                        })()}
                        y={40}
                        width={40}
                        height={40}
                      />
                    ) : null
                  ))}
                </svg>
              );
            })()}
          </div>
        </div>
      </div>
    </Layout>
  );
}
