import { useMemo, useState } from "react";

const CHAINS = [
  { id:"chain7-gold", title:'7" Cable Chain (Gold)', priceCents:3500, anchors:12 },
  { id:"chain7-silver", title:'7" Cable Chain (Silver)', priceCents:2800, anchors:12 },
];

const CHARMS = [
  { id:"heart-gold", title:"Heart (Gold)", priceCents:1200 },
  { id:"star-gold", title:"Star (Gold)", priceCents:1300 },
  { id:"letter-s", title:"Letter S", priceCents:900 },
];

export default function BuilderPage(){
  const [chainId, setChainId] = useState(CHAINS[0].id);
  const chain = useMemo(()=> CHAINS.find(c=>c.id===chainId), [chainId]);

  const [placed, setPlaced] = useState({}); // {"0":"heart-gold", ...}
  const [activeCharmId, setActiveCharmId] = useState(CHARMS[0].id);

  const totalPrice = useMemo(()=>{
    const chainPrice = chain?.priceCents || 0;
    const charmsPrice = Object.values(placed).reduce((sum, charmId)=>{
      const charm = CHARMS.find(c=>c.id===charmId);
      return sum + (charm?.priceCents || 0);
    }, 0);
    return chainPrice + charmsPrice;
  }, [chain, placed]);

  function handleAnchorClick(i){
    setPlaced(prev=>{
      const copy = {...prev};
      if(copy[i] === activeCharmId){ delete copy[i]; }
      else { copy[i] = activeCharmId; }
      return copy;
    });
  }

  return (
    <main style={{padding:"24px", maxWidth:"980px", margin:"0 auto"}}>
      <h1 style={{fontSize:32, marginBottom:16}}>Design Your Bracelet</h1>

      {/* Chain picker */}
      <section className="card" style={{marginBottom:16}}>
        <h2 style={{margin:"8px 0"}}>1) Pick your chain</h2>
        <div style={{display:"flex", gap:12, flexWrap:"wrap"}}>
          {CHAINS.map(c=>(
            <button key={c.id}
              onClick={()=> setChainId(c.id)}
              className="card"
              style={{border: chainId===c.id ? "2px solid var(--gg-gold)" : "2px solid transparent"}}
            >
              <div style={{width:180, height:40, background:"var(--gg-rose)", borderRadius:8, marginBottom:8}} />
              <div>{c.title}</div>
              <div style={{color:"var(--gg-gold)"}}>${(c.priceCents/100).toFixed(2)}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Charm picker */}
      <section className="card" style={{marginBottom:16}}>
        <h2 style={{margin:"8px 0"}}>2) Choose a charm</h2>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(140px,1fr))", gap:12}}>
          {CHARMS.map(ch=>(
            <button key={ch.id}
              onClick={()=> setActiveCharmId(ch.id)}
              className="card"
              style={{border: activeCharmId===ch.id ? "2px solid var(--gg-gold)" : "2px solid transparent"}}
            >
              <div style={{width:"100%", height:80, background:"#f5f5f5", borderRadius:8, marginBottom:8}} />
              <div>{ch.title}</div>
              <div style={{color:"var(--gg-gold)"}}>${(ch.priceCents/100).toFixed(2)}</div>
              <div style={{fontSize:12, color:"#666"}}>{activeCharmId===ch.id ? "Selected" : "Click to select"}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Preview with anchors */}
      <section className="card" style={{marginBottom:16}}>
        <h2 style={{margin:"8px 0"}}>3) Place charms (tap dots)</h2>
        <div style={{position:"relative", width:"100%", maxWidth:700, height:180, margin:"0 auto",
                      background:"#fff", border:"1px solid #eee", borderRadius:12}}>
          {/* chain line */}
          <div style={{position:"absolute", left:20, right:20, top:90, height:4, background:"#cfcfcf", borderRadius:2}} />
          {/* anchors */}
          <div style={{position:"absolute", left:20, right:20, top:82, display:"grid",
                       gridTemplateColumns:`repeat(${chain?.anchors||12}, 1fr)`}}>
            {Array.from({length: chain?.anchors || 12}, (_,i)=>(
              <button key={i}
                onClick={()=>handleAnchorClick(i)}
                title="Place/remove charm"
                style={{
                  justifySelf:"center",
                  width:16, height:16, borderRadius:"50%", border:"2px solid var(--gg-gold)",
                  background: placed[i] ? "var(--gg-gold)" : "var(--gg-ivory)"
                }}
              />
            ))}
          </div>
          {/* placed summary */}
          <div style={{position:"absolute", left:0, right:0, top:120, textAlign:"center", fontSize:12, color:"#666"}}>
            {Object.keys(placed).length === 0 ? "No charms placed yet." :
              `Charms at positions: ${Object.keys(placed).sort((a,b)=>+a-+b).join(", ")}`}
          </div>
        </div>
      </section>

      {/* Total + confirm */}
      <section className="card" style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <div>
          <strong>Total: ${(totalPrice/100).toFixed(2)}</strong>
          <div style={{fontSize:12, color:"#666"}}>Chain + charms added</div>
        </div>
        <button className="btn"
          onClick={()=> alert("Design saved (demo). Next we connect checkout):\n\n" + JSON.stringify({chainId, placed}, null, 2))}
        >Continue</button>
      </section>
    </main>
  );
}
