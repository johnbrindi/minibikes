import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "Minibikes", "Parts and Accessories", "Shipping", "Contact Form", "About us"];
const NAV_LINKS2 = ["Scams", "Terms / Policies"];

const BIKES = [
  { name: "Lil Hustler", color: "#e8b800", desc: "The perfect entry-level minibike. Lightweight, reliable, and loads of fun for all ages.", price: "From $1,895", img: "🏍️" },
  { name: "Hustler Fatboy", color: "#8B2FC9", desc: "Big tyres, big attitude. The Fatboy delivers serious style and performance in a compact package.", price: "From $2,295", img: "🏍️" },
  { name: "Hustler Classic", color: "#c0392b", desc: "Timeless design meets modern engineering. The Classic is a head-turner at every show.", price: "From $2,095", img: "🏍️" },
  { name: "Hustler Chopper", color: "#2c7a4b", desc: "Long and low, the Chopper brings that iconic bobber look to the minibike world.", price: "From $2,495", img: "🏍️" },
];

const REVIEWS = [
  {
    text: "I first met Tim from Hustler Minibikes at the Kumeu Hotrod Show. I was impressed by his bikes, especially the build quality and Tim's enthusiasm for his product. I recently purchased a Lil Hustler for my Grandson but haven't given it to him because i'm enjoying it so much myself!",
    author: "Mike T.",
    location: "Auckland, NZ",
    stars: 5,
  },
  {
    text: "We have bought three bikes from Hustler Minibikes and they have never missed a beat. We've had many people from all ages ride them and they all have a blast!. The build quality is so good we were happy to give one away as a corporate gift as we knew they'd be very impressed.",
    author: "Uniform Co.",
    location: "Wellington, NZ",
    stars: 5,
  },
  {
    text: "Absolutely stoked with my Hustler Fatboy! Tim was incredibly helpful throughout the whole process. The bike arrived well packaged and was ready to ride in minutes. Quality is second to none.",
    author: "Dave R.",
    location: "Christchurch, NZ",
    stars: 5,
  },
];

const PARTS = [
  { name: "Performance Exhaust", price: "$189 NZD", category: "Engine" },
  { name: "Upgrade Seat Kit", price: "$129 NZD", category: "Body" },
  { name: "Racing Tyres (Set)", price: "$149 NZD", category: "Wheels" },
  { name: "Engine Air Filter", price: "$45 NZD", category: "Engine" },
  { name: "Headlight Kit", price: "$89 NZD", category: "Lighting" },
  { name: "Throttle Cable", price: "$35 NZD", category: "Controls" },
];

const FAQS = [
  { q: "Where are Hustler Minibikes made?", a: "Every Hustler Minibike is handmade with pride and quality craftsmanship." },
  { q: "What markets do you ship to?", a: "We ship to USA and Australia. Free shipping is included in the listed price." },
  { q: "What engine do the bikes use?", a: "Our bikes use high-quality 4-stroke Honda-style engines ranging from 50cc to 196cc depending on the model." },
  { q: "Can adults ride Hustler Minibikes?", a: "Absolutely! Our bikes are designed to be enjoyed by all ages. The Fatboy and Classic models comfortably support adult riders." },
];

function StarRating({ count = 5 }) {
  return (
    <div style={{ display: "flex", gap: 2, justifyContent: "center", marginBottom: 16 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: "#1a1a1a", fontSize: 18 }}>★</span>
      ))}
    </div>
  );
}

function Navbar({ page, setPage, cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.97)" : "#fff",
      borderBottom: "1px solid #e8e8e8",
      transition: "box-shadow 0.2s",
      boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.07)" : "none",
    }}>
      {/* Announcement bar */}
      <div style={{ background: "#1a1a1a", color: "#fff", textAlign: "center", padding: "10px 16px", fontSize: 13, letterSpacing: "0.02em" }}>
        National and international shipping available — select currency from drop down menu
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0 8px" }}>
          <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.01em", color: "#1a1a1a" }}>
              Hustler<br />Minibikes
            </div>
          </button>

          <div style={{ display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap", justifyContent: "center", flex: 1 }}>
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => setPage(l.toLowerCase().replace(/ /g, "-"))}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#1a1a1a", fontFamily: "inherit", letterSpacing: "0.01em", padding: "4px 0", borderBottom: page === l.toLowerCase().replace(/ /g, "-") ? "1px solid #1a1a1a" : "1px solid transparent", transition: "border-color 0.15s" }}>
                {l}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>👤</button>
            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>🔍</button>
            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, position: "relative" }}>
              🛒
              {cartCount > 0 && <span style={{ position: "absolute", top: -6, right: -6, background: "#1a1a1a", color: "#fff", borderRadius: "50%", width: 16, height: 16, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</span>}
            </button>
          </div>
        </div>

        {/* Second nav row */}
        <div style={{ display: "flex", justifyContent: "center", gap: 32, paddingBottom: 12, borderTop: "1px solid #f0f0f0", paddingTop: 8 }}>
          {NAV_LINKS2.map(l => (
            <button key={l} onClick={() => setPage(l.toLowerCase().replace(/ /g, "-"))}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#1a1a1a", fontFamily: "inherit", letterSpacing: "0.01em" }}>
              {l}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function HeroSection({ setPage }) {
  return (
    <div style={{ position: "relative", width: "100%", background: "#111", overflow: "hidden", minHeight: 520 }}>
      {/* Video placeholder with gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0d0d0d 100%)",
      }} />
      {/* Decorative grunge texture overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.15,
        backgroundImage: "repeating-linear-gradient(45deg, #333 0, #333 1px, transparent 0, transparent 50%)",
        backgroundSize: "8px 8px",
      }} />

      {/* Hero text */}
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 520, padding: "80px 24px", textAlign: "center" }}>
        {/* Big graffiti-style HUSTLER text */}
        <div style={{
          fontFamily: "'Bebas Neue', 'Anton', Impact, sans-serif",
          fontSize: "clamp(72px, 14vw, 180px)",
          fontWeight: 900,
          letterSpacing: "0.05em",
          lineHeight: 0.85,
          color: "transparent",
          WebkitTextStroke: "2px #3ab5e6",
          textShadow: "4px 4px 0 #1a7aab, 8px 8px 0 rgba(58,181,230,0.2)",
          marginBottom: 8,
          userSelect: "none",
        }}>HUSTLER</div>

        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(28px, 5vw, 56px)",
          fontWeight: 700,
          color: "#fff",
          margin: "16px 0 8px",
          letterSpacing: "-0.02em",
        }}>
          World's Finest Minibikes.
        </h1>

        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(11px, 2vw, 14px)",
          letterSpacing: "0.25em",
          color: "#aaa",
          textTransform: "uppercase",
          marginBottom: 32,
        }}>
          Handmade Exclusively in USA
        </p>

        <div style={{
          fontFamily: "'Bebas Neue', 'Anton', Impact, sans-serif",
          fontSize: "clamp(22px, 5vw, 52px)",
          letterSpacing: "0.12em",
          color: "#c0392b",
          fontWeight: 900,
          marginBottom: 40,
        }}>
          MINIBIKES
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={() => setPage("minibikes")}
            style={{
              background: "#fff", color: "#1a1a1a", border: "none", padding: "14px 36px",
              fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 13,
              letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseOver={e => { e.currentTarget.style.background = "#e8b800"; }}
            onMouseOut={e => { e.currentTarget.style.background = "#fff"; }}
          >
            Shop Minibikes
          </button>
          <button
            onClick={() => setPage("about-us")}
            style={{
              background: "transparent", color: "#fff", border: "2px solid #fff", padding: "14px 36px",
              fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 13,
              letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = "#e8b800"; e.currentTarget.style.color = "#e8b800"; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = "#fff"; e.currentTarget.style.color = "#fff"; }}
          >
            Our Story
          </button>
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to top, #fff, transparent)" }} />
    </div>
  );
}

function BikeCard({ bike, setPage, addToCart }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: "1px solid #e8e8e8",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.12)" : "0 2px 8px rgba(0,0,0,0.06)",
      }}
      onClick={() => setPage("minibikes")}
    >
      {/* Image area */}
      <div style={{
        height: 280,
        background: `linear-gradient(135deg, ${bike.color}22 0%, ${bike.color}44 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          bottom: -20,
          right: -20,
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: bike.color,
          opacity: 0.15,
        }} />
        <div style={{ fontSize: 80, filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.2))" }}>
          {bike.img}
        </div>
        {/* Color dot */}
        <div style={{
          position: "absolute",
          top: 16,
          right: 16,
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: bike.color,
          border: "3px solid #fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        }} />
      </div>

      <div style={{ padding: "20px 24px 24px" }}>
        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, margin: "0 0 8px", color: "#1a1a1a" }}>
          {bike.name}
        </h3>
        <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, margin: "0 0 16px" }}>{bike.desc}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>{bike.price}</span>
          <button
            onClick={e => { e.stopPropagation(); addToCart(bike.name); }}
            style={{
              background: "#1a1a1a", color: "#fff", border: "none", padding: "8px 18px",
              fontSize: 12, fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseOver={e => { e.currentTarget.style.background = "#e8b800"; e.currentTarget.style.color = "#1a1a1a"; }}
            onMouseOut={e => { e.currentTarget.style.background = "#1a1a1a"; e.currentTarget.style.color = "#fff"; }}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}

function HomePage({ setPage, addToCart }) {
  return (
    <div>
      <HeroSection setPage={setPage} />

      {/* Made to Order Banner */}
      <div style={{ background: "#fff", padding: "64px 24px 48px", textAlign: "center" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 700, lineHeight: 1.25, color: "#1a1a1a", margin: "0 0 16px" }}>
            Our Made To Order Minibike Range.<br />
            <span style={{ fontStyle: "italic" }}>Available exclusively to the USA markets.</span>
          </h2>
          <div style={{ width: 60, height: 3, background: "#e8b800", margin: "24px auto" }} />
        </div>
      </div>

      {/* Bikes Grid */}
      <div style={{ background: "#f8f8f6", padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {BIKES.map(bike => <BikeCard key={bike.name} bike={bike} setPage={setPage} addToCart={addToCart} />)}
        </div>
      </div>

      {/* Why Hustler */}
      <div style={{ background: "#1a1a1a", color: "#fff", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, margin: "0 0 48px", color: "#fff" }}>
            Why Choose Hustler?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40 }}>
            {[
              { icon: "🔨", title: "Handcrafted", desc: "Every bike is built by hand with obsessive attention to quality." },
              { icon: "⚙️", title: "Reliable Engines", desc: "We use proven, reliable 4-stroke engines that start first kick every time." },
              { icon: "🎨", title: "Custom Colours", desc: "Choose your frame colour at order. We'll build it exactly how you want it." },
              { icon: "🚚", title: "Free Shipping", desc: "Free shipping to USA and Australia. Fully insured in transit." },
            ].map(f => (
              <div key={f.title} style={{ padding: "8px 16px" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 10px" }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "#aaa", lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div style={{ background: "#f8f8f6", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, textAlign: "center", margin: "0 0 56px", color: "#1a1a1a" }}>
            Don't take our word for it
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
            {REVIEWS.map((r, i) => (
              <div key={i} style={{ background: "#fff", padding: "36px 32px", border: "1px solid #e8e8e8", textAlign: "center" }}>
                <StarRating count={r.stars} />
                <p style={{ fontSize: 15, lineHeight: 1.8, color: "#444", margin: "0 0 24px", fontStyle: "italic" }}>"{r.text}"</p>
                <div style={{ borderTop: "1px solid #e8e8e8", paddingTop: 16 }}>
                  <p style={{ fontWeight: 700, fontSize: 14, margin: "0 0 2px", color: "#1a1a1a" }}>{r.author}</p>
                  <p style={{ fontSize: 13, color: "#888", margin: 0 }}>{r.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "#e8b800", padding: "64px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 700, color: "#1a1a1a", margin: "0 0 20px" }}>
          Ready to Join the Hustler Family?
        </h2>
        <p style={{ fontSize: 16, color: "#333", margin: "0 0 32px", lineHeight: 1.7 }}>
          Each bike is made to order. Lead time is typically 4–6 weeks.
        </p>
        <button
          onClick={() => setPage("contact-form")}
          style={{
            background: "#1a1a1a", color: "#fff", border: "none", padding: "16px 48px",
            fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14,
            letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
          }}
        >
          Get in Touch
        </button>
      </div>
    </div>
  );
}

function MinibikesPage({ setPage, addToCart }) {
  return (
    <div style={{ background: "#fff" }}>
      <div style={{ background: "#1a1a1a", padding: "64px 24px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, color: "#fff", margin: "0 0 16px" }}>
          Our Minibike Range
        </h1>
        <p style={{ fontSize: 16, color: "#aaa", maxWidth: 560, margin: "0 auto" }}>
            Every Hustler Minibike is handcrafted to order. Choose your model, pick your colour, and we'll build it for you.
          <div key={bike.name} style={{
            display: "grid",
            gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
            gap: 48,
            marginBottom: 80,
            alignItems: "center",
            direction: i % 2 === 0 ? "ltr" : "rtl",
          }}>
            <div style={{
              height: 360,
              background: `linear-gradient(135deg, ${bike.color}22, ${bike.color}55)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 100,
              direction: "ltr",
            }}>
              {bike.img}
            </div>
            <div style={{ direction: "ltr" }}>
              <div style={{ width: 40, height: 4, background: bike.color, marginBottom: 20 }} />
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 38, fontWeight: 700, color: "#1a1a1a", margin: "0 0 16px" }}>{bike.name}</h2>
              <p style={{ fontSize: 16, color: "#555", lineHeight: 1.8, margin: "0 0 24px" }}>{bike.desc}</p>
              <div style={{ display: "flex", gap: 24, marginBottom: 32 }}>
                {["4-Stroke Engine", "Hand Built", "Custom Colours", "Free Shipping"].map(f => (
                  <div key={f} style={{ fontSize: 12, color: "#888", textTransform: "uppercase", letterSpacing: "0.08em" }}>✓ {f}</div>
                ))}
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Montserrat', sans-serif", color: "#1a1a1a", marginBottom: 24 }}>
                {bike.price}
              </div>
              <button
                onClick={() => addToCart(bike.name)}
                style={{
                  background: "#1a1a1a", color: "#fff", border: "none", padding: "16px 40px",
                  fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 13,
                  letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
                  marginRight: 12,
                }}
              >
                Order Now
              </button>
              <button
                onClick={() => setPage("contact-form")}
                style={{
                  background: "transparent", color: "#1a1a1a", border: "2px solid #1a1a1a", padding: "14px 28px",
                  fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 13,
                  letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
                }}
              >
                Ask a Question
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PartsPage({ addToCart }) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(PARTS.map(p => p.category)))];
  const filtered = filter === "All" ? PARTS : PARTS.filter(p => p.category === filter);

  return (
    <div style={{ background: "#fff" }}>
      <div style={{ background: "#1a1a1a", padding: "64px 24px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, color: "#fff", margin: "0 0 16px" }}>
          Parts & Accessories
        </h1>
        <p style={{ fontSize: 16, color: "#aaa", maxWidth: 500, margin: "0 auto" }}>
          Keep your Hustler running perfectly with genuine parts and accessories.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 36, flexWrap: "wrap" }}>
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              style={{
                padding: "8px 20px", border: "1px solid #1a1a1a", cursor: "pointer",
                background: filter === c ? "#1a1a1a" : "#fff",
                color: filter === c ? "#fff" : "#1a1a1a",
                fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 600,
                letterSpacing: "0.05em", transition: "all 0.15s",
              }}>
              {c}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {filtered.map(p => (
            <div key={p.name} style={{ border: "1px solid #e8e8e8", padding: "24px", background: "#fff" }}>
              <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{p.category}</div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, margin: "0 0 16px", color: "#1a1a1a" }}>{p.name}</h3>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, fontSize: 18 }}>{p.price}</span>
                <button onClick={() => addToCart(p.name)}
                  style={{
                    background: "#1a1a1a", color: "#fff", border: "none", padding: "8px 18px",
                    fontSize: 12, fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
                    cursor: "pointer", letterSpacing: "0.05em",
                  }}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ShippingPage() {
  return (
    <div style={{ background: "#fff" }}>
      <div style={{ background: "#1a1a1a", padding: "64px 24px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, color: "#fff" }}>
          Shipping Information
        </h1>
      </div>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>
        {[
          { region: "🇺 Australia", time: "7–14 Business Days", price: "Included in price", notes: "Ships via sea freight. All bikes are crated and fully insured during transit." },
          { region: "🇺🇸 United States", time: "14–21 Business Days", price: "Included in price", notes: "Ships via sea freight. Customs duties and import taxes are the buyer's responsibility." },
        ].map(s => (
          <div key={s.region} style={{ borderBottom: "1px solid #e8e8e8", padding: "36px 0" }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 700, margin: "0 0 20px", color: "#1a1a1a" }}>{s.region}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 12 }}>
              <div>
                <p style={{ fontSize: 12, color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 4px" }}>Delivery Time</p>
                <p style={{ fontWeight: 700, fontSize: 16, margin: 0 }}>{s.time}</p>
              </div>
              <div>
                <p style={{ fontSize: 12, color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 4px" }}>Shipping Cost</p>
                <p style={{ fontWeight: 700, fontSize: 16, margin: 0, color: "#2c7a4b" }}>{s.price}</p>
              </div>
            </div>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, margin: 0 }}>{s.notes}</p>
          </div>
        ))}

        <div style={{ background: "#f8f8f6", padding: 32, marginTop: 40 }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, margin: "0 0 12px" }}>Important Notes</h3>
          <ul style={{ fontSize: 14, color: "#555", lineHeight: 2, paddingLeft: 20 }}>
            <li>All bikes are made to order. Please allow 4–6 weeks build time before shipping.</li>
            <li>You will receive tracking information once your bike has been dispatched.</li>
            <li>All bikes are professionally crated to ensure safe delivery.</li>
            <li>We recommend inspecting the crate before signing for delivery.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.email && form.message) setSent(true);
  };

  if (sent) return (
    <div style={{ background: "#fff", minHeight: 500, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: 40 }}>
      <div style={{ fontSize: 60, marginBottom: 24 }}>✅</div>
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, fontWeight: 700 }}>Message Sent!</h2>
      <p style={{ fontSize: 16, color: "#666" }}>Thanks for reaching out. Tim will get back to you shortly.</p>
    </div>
  );

  return (
    <div style={{ background: "#fff" }}>
      <div style={{ background: "#1a1a1a", padding: "64px 24px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, color: "#fff" }}>
          Contact Us
        </h1>
        <p style={{ fontSize: 16, color: "#aaa", margin: "16px auto 0", maxWidth: 480 }}>
          Got a question about a bike? Want to place an order? We'd love to hear from you.
        </p>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          {[["name", "Your Name"], ["email", "Email Address"]].map(([key, label]) => (
            <div key={key}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8, color: "#1a1a1a" }}>{label}</label>
              <input
                type={key === "email" ? "email" : "text"}
                value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", fontSize: 15, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
              />
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8, color: "#1a1a1a" }}>Subject</label>
          <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
            style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", fontSize: 15, outline: "none", background: "#fff", fontFamily: "inherit" }}>
            <option value="">Select a subject...</option>
            <option>Order Enquiry</option>
            <option>Technical Question</option>
            <option>Shipping Question</option>
            <option>Parts Enquiry</option>
            <option>General Question</option>
          </select>
        </div>

        <div style={{ marginBottom: 32 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8, color: "#1a1a1a" }}>Message</label>
          <textarea
            rows={6}
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", fontSize: 15, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit", lineHeight: 1.6 }}
          />
        </div>

        <button onClick={handleSubmit}
          style={{
            background: "#1a1a1a", color: "#fff", border: "none", padding: "16px 48px",
            fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14,
            letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", width: "100%",
          }}>
          Send Message
        </button>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div style={{ background: "#fff" }}>
      <div style={{ background: "#1a1a1a", padding: "64px 24px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, color: "#fff" }}>About Us</h1>
      </div>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", marginBottom: 60 }}>
          <div>
            <div style={{ width: 40, height: 4, background: "#e8b800", marginBottom: 20 }} />
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 34, fontWeight: 700, margin: "0 0 20px", color: "#1a1a1a" }}>
              Built by a Petrolhead, for Petrolheads
            </h2>
            <p style={{ fontSize: 15, color: "#555", lineHeight: 1.9, marginBottom: 16 }}>
              Hustler Minibikes was founded by Tim, a lifelong motorcycle enthusiast with a passion for old-school American minibikes and hot rod culture. After years of restoring vintage bikes, Tim decided to build his own — the result was the Hustler range.
            </p>
            <p style={{ fontSize: 15, color: "#555", lineHeight: 1.9 }}>
              Every bike is handbuilt in our workshop, using quality components and finishing touches that you simply won't find anywhere else at this price point.
            </p>
          </div>
          <div style={{ background: "#f0f0ec", height: 360, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80 }}>
            🏍️
          </div>
        </div>

        <div style={{ background: "#1a1a1a", color: "#fff", padding: 48, marginBottom: 48 }}>
          <blockquote style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(18px, 3vw, 26px)", fontStyle: "italic", lineHeight: 1.6, margin: 0, textAlign: "center" }}>
            "I want every person who buys a Hustler to feel the same excitement I felt when I first discovered minibikes. That's what drives us."
          </blockquote>
          <p style={{ textAlign: "center", color: "#aaa", marginTop: 20, fontSize: 14, letterSpacing: "0.05em" }}>— TIM, FOUNDER</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[['100%', 'Handmade'], ['4–6 wks', 'Lead Time'], ['3 Markets', 'USA · AUS']].map(([val, label]) => (
            <div key={label} style={{ textAlign: "center", padding: 24, border: "1px solid #e8e8e8" }}>
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 36, fontWeight: 700, margin: "0 0 8px", color: "#1a1a1a" }}>{val}</p>
              <p style={{ fontSize: 13, color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScamsPage() {
  return (
    <div style={{ background: "#fff" }}>
      <div style={{ background: "#c0392b", padding: "64px 24px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, color: "#fff" }}>⚠️ Scam Warning</h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", maxWidth: 560, margin: "16px auto 0" }}>
          We are aware of scammers impersonating Hustler Minibikes online. Please read this page carefully before purchasing.
        </p>
      </div>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ background: "#fff8f6", border: "2px solid #c0392b", padding: 32, marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, fontWeight: 700, color: "#c0392b", margin: "0 0 16px" }}>
            Our ONLY official website is custombuiltminibikesusa.online
          </h2>
          <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, margin: 0 }}>
            We only sell through this website. If you have found a listing on Facebook Marketplace, Trade Me, or any other platform at a significantly lower price, it is likely a scam. We do not authorise any resellers or third-party sellers.
          </p>
        </div>


        <div style={{ background: "#f8f8f6", padding: 32, marginTop: 40 }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, margin: "0 0 12px" }}>Think you've been scammed?</h3>
          <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7, margin: "0 0 16px" }}>
            Contact your bank immediately and report the scam to your local consumer affairs authority. You can also contact us so we can help warn others.
          </p>
        </div>
      </div>
    </div>
  );
}

function TermsPage() {
  return (
    <div style={{ background: "#fff" }}>
      <div style={{ background: "#1a1a1a", padding: "64px 24px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, color: "#fff" }}>Terms & Policies</h1>
      </div>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>
        {[
          { title: "Returns & Refunds", content: "Due to the made-to-order nature of our products, we do not accept returns or offer refunds unless the product is faulty. If your bike arrives damaged or defective, please contact us within 7 days of delivery with photos and we will arrange a repair or replacement." },
          { title: "Warranty", content: "All Hustler Minibikes come with a 90-day warranty covering manufacturing defects. This does not cover damage caused by misuse, modification, or normal wear and tear. Engine components are covered by the engine manufacturer's warranty." },
          { title: "Privacy Policy", content: "We collect only the personal information necessary to process your order and deliver your bike. We do not sell or share your information with third parties. Your payment information is processed securely through Shopify Payments and we never store card details." },
          { title: "Payment Terms", content: "Full payment is required at the time of order. We accept all major credit cards, PayPal, and bank transfer for New Zealand customers. Your order will not enter production until payment has been confirmed." },
          { title: "Intellectual Property", content: "The Hustler Minibikes name, logo, and all product designs are the intellectual property of Hustler Minibikes NZ. Unauthorised use of our brand or designs is strictly prohibited." },
        ].map(s => (
          <div key={s.title} style={{ paddingBottom: 36, marginBottom: 36, borderBottom: "1px solid #e8e8e8" }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, fontWeight: 700, margin: "0 0 16px", color: "#1a1a1a" }}>{s.title}</h2>
            <p style={{ fontSize: 15, color: "#555", lineHeight: 1.9, margin: 0 }}>{s.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ background: "#111", color: "#aaa", padding: "60px 24px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Hustler Minibikes</div>
            <p style={{ fontSize: 13, lineHeight: 1.8, margin: 0 }}>World's finest minibikes.<br />Handmade with care.</p>
          </div>
          <div>
            <h4 style={{ color: "#fff", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 16px" }}>Shop</h4>
            {["Minibikes", "Parts and Accessories"].map(l => (
              <button key={l} onClick={() => setPage(l.toLowerCase().replace(/ /g, "-"))}
                style={{ display: "block", background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: 13, padding: "4px 0", fontFamily: "inherit", textAlign: "left" }}>{l}</button>
            ))}
          </div>
          <div>
            <h4 style={{ color: "#fff", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 16px" }}>Info</h4>
            {["Shipping", "About us", "Scams", "Terms / Policies"].map(l => (
              <button key={l} onClick={() => setPage(l.toLowerCase().replace(/ /g, "-"))}
                style={{ display: "block", background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: 13, padding: "4px 0", fontFamily: "inherit", textAlign: "left" }}>{l}</button>
            ))}
          </div>
          <div>
            <h4 style={{ color: "#fff", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 16px" }}>Contact</h4>
            <p style={{ fontSize: 13, lineHeight: 2, margin: 0 }}>
              USA<br />
              custombuiltminibikesusa.online<br />
              <button onClick={() => setPage("contact-form")} style={{ background: "none", border: "none", color: "#e8b800", cursor: "pointer", padding: 0, fontSize: 13, fontFamily: "inherit" }}>Contact Form →</button>
            </p>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #333", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontSize: 12, margin: 0 }}>© {new Date().getFullYear()} Hustler Minibikes. All rights reserved.</p>
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ fontSize: 12 }}>Made with pride.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [cartItems, setCartItems] = useState([]);
  const [toast, setToast] = useState(null);
  const topRef = useRef(null);

  const addToCart = (name) => {
    setCartItems(c => [...c, name]);
    setToast(`${name} added to cart!`);
    setTimeout(() => setToast(null), 3000);
  };

  const navigate = (p) => {
    setPage(p);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage setPage={navigate} addToCart={addToCart} />;
      case "minibikes": return <MinibikesPage setPage={navigate} addToCart={addToCart} />;
      case "parts-and-accessories": return <PartsPage addToCart={addToCart} />;
      case "shipping": return <ShippingPage />;
      case "contact-form": return <ContactPage />;
      case "about-us": return <AboutPage />;
      case "scams": return <ScamsPage />;
      case "terms-/-policies": return <TermsPage />;
      default: return <HomePage setPage={navigate} addToCart={addToCart} />;
    }
  };

  return (
    <div ref={topRef} style={{ fontFamily: "'Georgia', serif", minHeight: "100vh", background: "#fff" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet" />

      <Navbar page={page} setPage={navigate} cartCount={cartItems.length} />
      {renderPage()}
      <Footer setPage={navigate} />

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 24, right: 24, background: "#1a1a1a", color: "#fff",
          padding: "14px 24px", fontSize: 14, fontFamily: "'Montserrat', sans-serif",
          zIndex: 999, animation: "slideIn 0.2s ease",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}>
          ✓ {toast}
        </div>
      )}
    </div>
  );
}