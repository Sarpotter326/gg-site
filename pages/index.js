// pages/index.js
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Grace & Gold — Custom Charm Bracelets</title>
        <meta
          name="description"
          content="Design your own charm bracelet with Grace & Gold. Soft, romantic, and totally you."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="nav">
        <div className="brand">
          <span className="badge-heart">❤</span>
          <span>Grace&nbsp;&nbsp;&&nbsp;&nbsp;Gold</span>
        </div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/builder">Builder</a>
          <a href="/contact">Contact</a>
          <a href="/about">About</a>
        </div>
      </nav>

      <main className="container">
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-content">
              <div>
                <h1>Design a bracelet<br />that feels like you</h1>
                <p className="lead">
                  Pick your chain, add charms, and see it come to life instantly.
                  Soft colors, flat icons, and a seamless, girly experience.
                </p>
                <div className="cta-row">
                  <a className="btn btn-primary" href="/builder">Start Building</a>
                  <a className="btn btn-ghost" href="/shop">Browse Charms</a>
                </div>
              </div>

              <div className="hero-card">
                <ul className="list">
                  <li><span className="dot" /> Flat, uniform charm icons</li>
                  <li><span className="dot" /> Live bracelet preview</li>
                  <li><span className="dot" /> Save & share your design</li>
                  <li><span className="dot" /> Ships gift-ready</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="grid">
            <div className="card">
              <h3>Curated Charms</h3>
              <p>Clean, flat icon style so everything feels cohesive and premium.</p>
            </div>
            <div className="card">
              <h3>Perfect Fit</h3>
              <p>Pick chain length & clasp style with clear guidance.</p>
            </div>
            <div className="card">
              <h3>Personal Touch</h3>
              <p>Add initials, birthstones, and tiny symbols that tell your story.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
