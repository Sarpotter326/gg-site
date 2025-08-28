export default function Home() {
  return (
    <main style={{padding:"24px", maxWidth:"980px", margin:"0 auto"}}>
      <header style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
        <div style={{fontSize:28, fontFamily:"Times New Roman, Georgia, serif"}}>Grace & Gold Co.</div>
        <nav style={{display:"flex", gap:16}}>
          <a href="/builder">Design Your Bracelet</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <section className="card" style={{display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:24}}>
        <div>
          <h1 style={{fontSize:36, margin:"8px 0"}}>Handmade, personal, beautiful.</h1>
          <p>Design a charm bracelet that feels like <i>you</i>—choose your chain, add your charms, and see it live.</p>
          <div style={{marginTop:16}}>
            <a className="btn" href="/builder">Start Designing ✨</a>
          </div>
        </div>
        <div style={{background:"var(--gg-rose)", borderRadius:16, minHeight:220}} />
      </section>

      <section style={{marginTop:40}}>
        <h2>Why you’ll love it</h2>
        <ul>
          <li>Real-time preview of your bracelet</li>
          <li>Perfect for gifts & parties</li>
          <li>Made with love in NJ</li>
        </ul>
      </section>

      <footer style={{marginTop:60, padding:"24px 0", borderTop:"1px solid #eee", fontSize:14, color:"#666"}}>
        © {new Date().getFullYear()} Grace & Gold Co.
      </footer>
    </main>
  );
}
