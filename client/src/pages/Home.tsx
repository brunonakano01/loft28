/*
 * LOFT 28 — Home Page
 * Design: amyteh.com-style editorial scatter — two asymmetric columns, items staggered vertically
 * Fundo: muda por seção, texto #ffea5b
 * Nav: logo horizontal sempre visível, sem fundo
 */

import { useState, useEffect, useRef } from "react";
import { MapView } from "@/components/Map";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv";
const LIVING_OVERHEAD = `${CDN}/20260131_180958_9eb80035.webp`;
const VID_LIVING_NEW = `${CDN}/20260131_181312_trimmed_4017ef57.mp4`;
const LIVING_WIDE = `${CDN}/living_1_4156b509_4b8cab64.webp`;
const VID_LIVING_5 = `${CDN}/Untitled_392c45cb.mp4`;
const LOGO_CIRCLE = `${CDN}/logo_circle_dark_db5da84f.png`;
const LOGO_HORIZONTAL = `${CDN}/logo_horizontal_dark_96b86942.png`;

const SECTION_COLORS: Record<string, string> = {
  hero:     "#e8e4d9",  // warm parchment
  exterior: "#ddd8cc",  // slightly cooler linen
  living:   "#e2ddd0",  // light warm linen (was charcoal)
  dining:   "#dbd5c5",  // aged paper
  outside:  "#d8ddd0",  // sage-tinted parchment
  work:     "#ddd9ce",  // neutral linen
  bed:      "#dbd6c8",  // warm cream
  bath:     "#d6dbd8",  // cool grey-linen
  footer:   "#d8d4c8",  // warm grey
  pool:     "#d4dbd8",  // cool sage-grey
  kitchen:  "#ddd8c8",  // warm sand
  gallery:  "#d8d4c8",  // warm grey
};

// New photos
const BATH_NEW = `${CDN}/20250115_205455_af6f1f83.webp`;
const DINING_NEW = `${CDN}/20250115_110606_173d95c9.webp`;
const LIVING_STOOL = `${CDN}/20250115_105636_c3060473.webp`;
const DINING_NIGHT = `${CDN}/20260131_200311_55220fb5.webp`;
const OFFICE_NEW = `${CDN}/20260131_185953_b8dd123e.webp`;
const LIVING_LAMP = `${CDN}/20260131_180745_3633b3ac.webp`;
const LIVING_PLANTS = `${CDN}/20260131_200650_8984280c.webp`;

// Lavabo photos
const LAVABO_1 = `${CDN}/20250115_001910_31d1d6f4.webp`;
const LAVABO_2 = `${CDN}/Screenshot2026-03-29at10.08.07PM_76128877.png`;
const LAVABO_3 = `${CDN}/20250115_002121_ffdf52a5.webp`;
const VID_LAVABO = `${CDN}/20260131_201844_017fe1d2.mp4`;
const LAVABO_4 = `${CDN}/20250115_002529_13b7a77e.webp`;

// Closet photo (in banheiro)
const CLOSET_PHOTO = `${CDN}/bath_entry_1aff020c.webp`;

// Videos — pool
const VID_POOL_1 = `${CDN}/20260131_171311_ea5890fa.mp4`;
const VID_POOL_2 = `${CDN}/20260131_171637_ae51dd15.mp4`;
const VID_POOL_3 = `${CDN}/20260131_171653_5323a880.mp4`;

// Videos — living
const VID_LIVING_1 = `${CDN}/20260131_180822_trimmed_c255ee21.mp4`;
const VID_LIVING_2 = `${CDN}/20260131_181226_9fddaa18.mp4`;
const VID_LIVING_3 = `${CDN}/20260131_181240_trimmed_72e5d46e.mp4`;
const VID_LIVING_4 = `${CDN}/20260131_181820_90fc2493.mp4`;

// Video — hero (original, no halftone)
const VID_HERO_ORIG = `${CDN}/20250205_122736_70464984.mp4`;

// Video — outside
const VID_OUTSIDE = `${CDN}/20260131_182545_5810c889.mp4`;

// ─── Media types ────────────────────────────────────────────────────────────
// col: "left" | "right" | "full" — which column to place item in
// size: "sm" | "md" | "lg" | "hero" — controls width within its column
//   hero = the one standout image per section (larger than lg)
//   lg   = full column width (horizontal items default to this only if hero)
//   md   = 72% of column (default for horizontal items)
//   sm   = 52% of column
// offset: vertical offset in px (paddingTop) to stagger items amyteh-style
// vertical: true = 4:5 crop, false/undefined = natural ratio
type MediaItem =
  | { type: "photo"; src: string; span?: 1 | 2; vertical?: boolean; fullWidth?: boolean; floorPlan?: boolean; fr?: number;
      col?: "left" | "right" | "full"; size?: "xs" | "sm" | "md" | "lg" | "hero"; offset?: number; marginLeft?: string; rowGroup?: string; matchHeight?: boolean }
  | { type: "video"; src: string; span?: 1 | 2; vertical?: boolean; fullWidth?: boolean; floorPlan?: boolean; fr?: number;
      col?: "left" | "right" | "full"; size?: "xs" | "sm" | "md" | "lg" | "hero"; offset?: number; marginLeft?: string; rowGroup?: string; matchHeight?: boolean };

// ─── Sections ───────────────────────────────────────────────────────────────
const SECTIONS: Array<{
  id: string;
  floor: string;
  title: string;
  text: string;
  media: MediaItem[];
  matchHeightColumns?: string;
}> = [
  {
    id: "living",
    floor: "Térreo",
    title: "Sala de Estar",
    text: "Pé-direito duplo com escada metálica. Sofá verde, prateleiras de madeira, bastante luz.",
    media: [
      { type: "photo", src: LIVING_WIDE, col: "left", rowGroup: "row1", size: "hero", offset: 0, matchHeight: true },
      { type: "video", src: VID_LIVING_3, col: "right", size: "md", offset: 0, vertical: true, matchHeight: true },
    ],
    matchHeightColumns: "2fr 1fr",
  },
  {
    id: "dining",
    floor: "Térreo",
    title: "Sala de Jantar",
    text: "Mesa longa de madeira. Vitrais coloridos que mudam a luz do ambiente ao longo do dia.",
    media: [
      { type: "photo", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/loft_35mm__saladejantar_32e6d945_3dbb7ec0.webp", col: "left", matchHeight: true },
      { type: "photo", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/dining_5_9d1df291_4402d3f3.webp", col: "right", matchHeight: true },
    ],
    matchHeightColumns: "1fr 2fr",
  },
  {
    id: "exterior",
    floor: "Térreo",
    title: "Lavabo",
    text: "Porta em arco com vitrô. Pia de cerâmica escura, madeira clara e iluminação aconchegante.",
    media: [
      { type: "photo", src: LAVABO_4, col: "left", matchHeight: true },
      { type: "photo", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/LAVABO_164edb24.jpg", col: "right", matchHeight: true },
    ],
    matchHeightColumns: "2fr 1fr",
  },
  {
    id: "kitchen",
    floor: "Térreo",
    title: "Cozinha",
    text: "Cozinha integrada com vitrais coloridos e bancada de madeira. Porta pivotante para o jardim.",
    media: [
      { type: "photo", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/loft_35mm__cozinha3_34b791ae.webp", col: "left", matchHeight: true },
      { type: "photo", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/20250205_131854_196582d1.webp", col: "right", matchHeight: true },
    ],
    matchHeightColumns: "1fr 2fr",
  },
  {
    id: "outside",
    floor: "Térreo",
    title: "Área Externa",
    text: "Pátio com mesa de madeira e muita planta. Ótimo para almoçar ao ar livre.",
    media: [
      { type: "photo", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/loft_35mm__areaexterna_58cea7bb.webp", col: "left", matchHeight: true },
      { type: "photo", src: `${CDN}/outside_1_ec681988.jpg`, col: "right", matchHeight: true },
    ],
    matchHeightColumns: "2fr 1fr",
  },
  {
    id: "work",
    floor: "1º Andar",
    title: "Área de Trabalho",
    text: "Mesa ampla, cavalete e luz natural. Espaço tranquilo no primeiro andar.",
    media: [
      { type: "photo", src: `${CDN}/Made-this-wooden-chair-with-Marcio--a-craftsman-based-in-Paraty--Rio-de-Janeiro.-For-generations-2_9dffe3c3.jpg`, col: "left", matchHeight: true },
      { type: "photo", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/20260131_185953_384947eb.webp", col: "right", matchHeight: true },
    ],
    matchHeightColumns: "1fr 2fr",
  },
  {
    id: "bed",
    floor: "1º Andar",
    title: "Dormitório",
    text: "Cama de madeira, piso escuro, luz baixa. Simples e confortável.",
    media: [
      { type: "photo", src: `${CDN}/bed_1_55822281.jpg`, col: "left", matchHeight: true },
      { type: "video", src: `${CDN}/20260131_185218_bdbbe179.mp4`, col: "right", matchHeight: true },
    ],
    matchHeightColumns: "2fr 1fr",
  },
  {
    id: "bath",
    floor: "1º Andar",
    title: "Banheiro",
    text: "Azulejo terracota, box de vidro e pia de cerâmica com torneira preta. Madeira clara nos armários.",
    media: [
      { type: "video", src: `${CDN}/20260131_191501_351a7cfd.mp4`, col: "left", matchHeight: true },
      { type: "photo", src: `${CDN}/bath_1_eefb8db5.jpg`, col: "right", matchHeight: true },
    ],
    matchHeightColumns: "1fr 2fr",
  },
  {
    id: "pool",
    floor: "",
    title: "Piscina Coletiva",
    text: "Piscina no rooftop com deck de madeira e vista para a mata. Uso compartilhado.",
    media: [
      { type: "photo", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/20260131_171528_19cfb2e7.webp", col: "left", matchHeight: true },
      { type: "video", src: VID_POOL_1, col: "right", matchHeight: true },
    ],
    matchHeightColumns: "2fr 1fr",
  },
];

// ─── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose }: { images: string[]; index: number; onClose: () => void }) {
  const [cur, setCur] = useState(index);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCur(c => (c + 1) % images.length);
      if (e.key === "ArrowLeft") setCur(c => (c - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [images.length, onClose]);

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 999,
      background: "rgba(232,228,217,0.97)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <button onClick={onClose} style={{
        position: "absolute", top: "1.5rem", right: "2rem",
        background: "none", border: "none", color: "#2a2620",
        fontSize: "0.7rem", cursor: "pointer", opacity: 0.6,
        fontFamily: "'Highway Gothic', 'Barlow Condensed', sans-serif",
        letterSpacing: "0.2em", textTransform: "uppercase",
      }}>FECHAR</button>
      <img src={images[cur]} alt="" onClick={e => e.stopPropagation()}
        style={{ maxWidth: "88vw", maxHeight: "85vh", objectFit: "contain", background: "#e8e4d9", padding: "0.5rem" }} />
      {images.length > 1 && (
        <>
          <button onClick={e => { e.stopPropagation(); setCur(c => (c - 1 + images.length) % images.length); }}
            style={{ position: "absolute", left: "1.5rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#2a2620", fontSize: "2rem", cursor: "pointer", opacity: 0.5 }}>‹</button>
          <button onClick={e => { e.stopPropagation(); setCur(c => (c + 1) % images.length); }}
            style={{ position: "absolute", right: "1.5rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#2a2620", fontSize: "2rem", cursor: "pointer", opacity: 0.5 }}>›</button>
          <div style={{ position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", color: "#2a2620", fontFamily: "'Highway Gothic', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em" }}>
            {cur + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}

// ─── MosaicPhoto ─────────────────────────────────────────────────────────────
function MosaicPhoto({ src, vertical, onClick }: {
  src: string;
  vertical?: boolean;
  onClick: () => void;
}) {
  const imgStyle: React.CSSProperties = vertical
    ? { width: "100%", aspectRatio: "4 / 5", objectFit: "cover", objectPosition: "center", display: "block", transition: "opacity 0.3s ease" }
    : { width: "100%", height: "auto", display: "block", transition: "opacity 0.3s ease" };

  return (
    <div style={{ cursor: "zoom-in", overflow: "hidden" }}
      onClick={onClick}
      onMouseEnter={e => { const img = e.currentTarget.querySelector("img"); if (img) img.style.opacity = "0.82"; }}
      onMouseLeave={e => { const img = e.currentTarget.querySelector("img"); if (img) img.style.opacity = "1"; }}
    >
      <img src={src} alt="" style={imgStyle} />
    </div>
  );
}

// ─── MosaicVideo ─────────────────────────────────────────────────────────────
function MosaicVideo({ src, vertical }: { src: string; vertical?: boolean }) {
  const videoStyle: React.CSSProperties = vertical
    ? { width: "100%", aspectRatio: "4 / 5", objectFit: "cover", objectPosition: "center", display: "block" }
    : { width: "100%", height: "auto", display: "block" };

  return (
    <div style={{ overflow: "hidden" }}>
      <video src={src} autoPlay muted loop playsInline style={videoStyle} />
    </div>
  );
}

// ─── SIZE MAP ────────────────────────────────────────────────────────────────
// Controls the width of each item within its column
// hero = full column width + bleeds slightly via negative margin for emphasis
// lg   = full column width
// md   = 72% — default for horizontal items
// sm   = 52% — smaller horizontal items
// Vertical items: original sizes (xs=36%, sm=52%, md=72%)
// Horizontal items: 3× original sizes (200% bigger)
const SIZE_MAP = { xs: "36%", sm: "52%", md: "72%", lg: "100%", hero: "100%" } as const;
const H_SIZE_MAP = { xs: "100%", sm: "100%", md: "100%", lg: "100%", hero: "100%" } as const;

// ─── Section ─────────────────────────────────────────────────────────────────
// amyteh.com-style: two columns (left ~47%, right ~47%), items placed per col,
// staggered vertically via paddingTop offset. Full items span both columns.
function Section({ section }: { section: typeof SECTIONS[0] }) {
  const textRef = useRef<HTMLDivElement>(null);
  const [lb, setLb] = useState<number | null>(null);
  const photoSrcs = section.media.filter(m => m.type === "photo").map(m => m.src);

  // Determine if this section has a dark background → use light text
  const bg = SECTION_COLORS[section.id] ?? "#e8e4d9";
  const isDark = (() => {
    const hex = bg.replace("#", "");
    const r = parseInt(hex.slice(0,2),16), g = parseInt(hex.slice(2,4),16), b = parseInt(hex.slice(4,6),16);
    return (0.299*r + 0.587*g + 0.114*b) < 128;
  })();
  const textColor = isDark ? "#e8e4d9" : "#2a2620";

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.08 });
    if (textRef.current) obs.observe(textRef.current);
    return () => obs.disconnect();
  }, []);

  // Split media by column
  const leftItems  = section.media.filter(m => m.col === "left");
  const rightItems = section.media.filter(m => m.col === "right");
  const fullItems  = section.media.filter(m => m.col === "full" || (!m.col && m.floorPlan));

  // Group consecutive rowGroup items together for side-by-side rendering
  type LeftRow = { isGroup: false; item: MediaItem } | { isGroup: true; items: MediaItem[]; groupId: string };
  const leftRows: LeftRow[] = [];
  for (const item of leftItems) {
    if (item.rowGroup) {
      const last = leftRows[leftRows.length - 1];
      if (last && last.isGroup && last.groupId === item.rowGroup) {
        last.items.push(item);
      } else {
        leftRows.push({ isGroup: true, items: [item], groupId: item.rowGroup });
      }
    } else {
      leftRows.push({ isGroup: false, item });
    }
  }

  const renderItem = (item: MediaItem, k: number) => {
    // Horizontal items get a 1.5× size boost relative to vertical ones
    const isHorizontal = !item.vertical;
    const sizeKey = item.size ?? "md";
    let maxW: string = isHorizontal ? H_SIZE_MAP[sizeKey] : SIZE_MAP[sizeKey];
    // fr prop allows scaling down the computed width (e.g. fr=0.55 → 55% of normal)
    if (item.fr != null && maxW.endsWith("%")) {
      maxW = `${Math.round(parseFloat(maxW) * item.fr)}%`;
    }
    const isRight = item.col === "right";
    // Pull items away from edges using inward shifts that are subtracted from width
    // so the item never overflows its column. Varied per index for editorial randomness.
    const shiftPcts = [8, 14, 20, 10, 17, 12, 19, 6, 15, 11];
    const shiftPct = shiftPcts[k % shiftPcts.length];
    // Only apply inward shift if item doesn't already have an explicit marginLeft
    const hasExplicitMargin = item.marginLeft != null;
    // Compute effective width: subtract shift from percentage widths to avoid overflow
    let effectiveW = maxW;
    if (!hasExplicitMargin && maxW.endsWith("%")) {
      const base = parseFloat(maxW);
      effectiveW = `${Math.max(base - shiftPct, 20)}%`;
    }
    const wrapStyle: React.CSSProperties = {
      width: effectiveW,
      marginLeft: item.marginLeft ?? (isRight ? "auto" : `${shiftPct}%`),
    };
    if (item.type === "video") {
      return (
        <div key={k} style={wrapStyle}>
          <MosaicVideo src={item.src} vertical={item.vertical} />
        </div>
      );
    }
    const pIdx = photoSrcs.indexOf(item.src);
    return (
      <div key={k} style={wrapStyle}>
        <MosaicPhoto src={item.src} vertical={item.vertical}
          onClick={() => setLb(pIdx >= 0 ? pIdx : 0)} />
      </div>
    );
  };

  return (
    <section id={section.id} style={{ padding: "4rem 0 5rem" }}>
      <div className="container">
        {/* Centered header */}
        <div ref={textRef} className="reveal" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p style={{
            fontFamily: "'Highway Gothic', 'Barlow Condensed', sans-serif",
            fontSize: "0.85rem", fontWeight: 300,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: textColor, opacity: 0.5, margin: "0 0 0.4rem 0",
          }}>{section.floor}</p>
          <h2 style={{
            fontFamily: "'Nouveau Hippie JNL', 'Monotype Corsiva', cursive",
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            fontWeight: 400, fontStyle: "italic",
            color: textColor, lineHeight: 1.05, margin: "0 0 1.2rem 0",
          }}>{section.title}</h2>
        </div>

        {lb !== null && <Lightbox images={photoSrcs} index={lb} onClose={() => setLb(null)} />}

        {/* amyteh-style two-column scatter */}
        {(() => {
          const allMatchHeight = section.media.length > 0 && section.media.every(m => m.matchHeight);
          if (allMatchHeight) {
            // Equal-height layout: shared fixed height, both panels cover with object-fit cover
            const sharedHeight = "clamp(320px, 42vw, 640px)";
            return (
                            <div className="match-height-grid" style={{ display: "grid",
                gridTemplateColumns: section.matchHeightColumns ?? "2fr 1fr",
                columnGap: "1.5rem",
                alignItems: "stretch",
                height: sharedHeight,
              }}>
                {/* Left column — fills shared height with object-fit cover */}
                <div style={{ height: "100%", overflow: "hidden" }}>
                  {leftItems.map((item, k) => {
                    if (item.type === "video") {
                      return (
                        <video key={k} src={item.src} autoPlay muted loop playsInline
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      );
                    }
                    const pIdx = photoSrcs.indexOf(item.src);
                    return (
                      <img key={k} src={item.src} alt="" onClick={() => setLb(pIdx >= 0 ? pIdx : 0)}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", cursor: "zoom-in" }} />
                    );
                  })}
                </div>
                {/* Right column — fills shared height with object-fit cover */}
                <div style={{ height: "100%", overflow: "hidden" }}>
                  {rightItems.map((item, k) => {
                    if (item.type === "video") {
                      return (
                        <video key={k} src={item.src} autoPlay muted loop playsInline
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      );
                    }
                    const pIdx = photoSrcs.indexOf(item.src);
                    return (
                      <img key={k} src={item.src} alt="" onClick={() => setLb(pIdx >= 0 ? pIdx : 0)}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", cursor: "zoom-in" }} />
                    );
                  })}
                </div>
              </div>
            );
          }
          return (
            <div className="section-media-grid" style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: "2rem",
              rowGap: 0,
              alignItems: "start",
            }}>
              {/* Left column */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
                {leftRows.map((row, k) => {
                  if (row.isGroup) {
                    const groupOffset = (row.items[0]?.offset ?? 0) * 0.45;
                    return (
                      <div key={k} style={{ paddingTop: groupOffset, display: "flex", flexDirection: "row", gap: "0.8rem", alignItems: "flex-start" }}>
                        {row.items.map((item, j) => renderItem(item, j))}
                      </div>
                    );
                  }
                  return (
                    <div key={k} style={{ paddingTop: (row.item.offset ?? 0) * 0.45 }}>
                      {renderItem(row.item, k)}
                    </div>
                  );
                })}
              </div>

              {/* Right column */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
                {rightItems.map((item, k) => (
                  <div key={k} style={{ paddingTop: (item.offset ?? 0) * 0.45 }}>
                    {renderItem(item, k)}
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Full-width items (floor plans, etc.) */}
        {fullItems.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem", marginTop: "4rem" }}>
            {fullItems.map((item, k) => {
              if (item.floorPlan) {
                return (
                  <div key={k} style={{ maxWidth: "65%", margin: "0 auto" }}>
                    <img src={item.src} alt="" style={{ width: "100%", height: "auto", display: "block" }} />
                  </div>
                );
              }
              if (item.type === "video") {
                return <MosaicVideo key={k} src={item.src} vertical={item.vertical} />;
              }
              const pIdx = photoSrcs.indexOf(item.src);
              return (
                <MosaicPhoto key={k} src={item.src} vertical={item.vertical}
                  onClick={() => setLb(pIdx >= 0 ? pIdx : 0)} />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── SideNav ─────────────────────────────────────────────────────────────────────
// Per-section floor plan images
const SECTION_PLANS: Record<string, { src: string; size?: string }> = {
  living:   { src: `${CDN}/loft_0008_sala-de-estar_aa225668.webp` },
  dining:   { src: `${CDN}/loft_0007_sala-de-jantar_d051e67d.webp` },
  exterior: { src: `${CDN}/loft_0005_lavabo_3de7d6bd.webp` },
  outside:  { src: `${CDN}/loft_0004_area-externa_247de0d7.webp` },
  kitchen:  { src: `${CDN}/loft_0006_cozinha_577a4d72.webp` },
  work:     { src: `${CDN}/loft_0003_escritorio_419114de.webp`, size: "min(55vw, 800px)" },
  bed:      { src: `${CDN}/loft_0002_quarto_f523ed2a.webp`,     size: "min(55vw, 800px)" },
  bath:     { src: `${CDN}/loft_0000_banheiro_56ef015d.webp`,   size: "min(55vw, 800px)" },
};

function SideNav({ isBgDark, isHeroVisible, onHoverChange }: { isBgDark: boolean; isHeroVisible: boolean; onHoverChange: (id: string | null) => void }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const textColor = isBgDark ? "#e8e4d9" : "#2a2620";

  const handleEnter = (id: string) => { setHoveredId(id); onHoverChange(id); };
  const handleLeave = () => { setHoveredId(null); onHoverChange(null); };

  return (
    <>
      {/* Per-section floor plan preview — centered */}
      {Object.entries(SECTION_PLANS).map(([sectionId, plan]) => (
        <div key={sectionId} style={{
          position: "fixed",
          left: "50%", top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 99, pointerEvents: "none",
          width: plan.size ?? "min(75vw, 1200px)",
          opacity: hoveredId === sectionId ? 1 : 0,
          transition: "opacity 0.35s ease",
        }}>
          <img
            src={plan.src}
            alt="Planta baixa"
            style={{
              width: "100%", height: "auto", display: "block",
              // Tint lines to #292621 dark charcoal: invert white bg to black, sepia+hue to warm brown
              filter: "invert(1) sepia(1) saturate(1.5) hue-rotate(5deg) brightness(0.18) invert(0)",
            }}
          />
        </div>
      ))}

      {/* Section links — grouped by floor */}
      <nav style={{
        position: "fixed", left: "0", top: "50%", transform: "translateY(-50%)",
        zIndex: 100, display: "flex", flexDirection: "column", gap: "0",
        padding: "1.4rem 1.2rem 1.4rem 1.2rem",
        backdropFilter: isHeroVisible ? "blur(12px) brightness(1.12) saturate(0.85)" : "none",
        WebkitBackdropFilter: isHeroVisible ? "blur(12px) brightness(1.12) saturate(0.85)" : "none",
        backgroundColor: isHeroVisible ? "rgba(240, 236, 228, 0.38)" : "transparent",
        transition: "background-color 0.5s ease",
      }}>
        {(() => {
          // Group sections by floor, preserving order
          const floors: { label: string; sections: typeof SECTIONS }[] = [];
          SECTIONS.forEach(s => {
            const last = floors[floors.length - 1];
            if (last && last.label === s.floor) {
              last.sections.push(s);
            } else {
              floors.push({ label: s.floor, sections: [s] });
            }
          });
          return floors.map((group, gi) => (
            <div key={group.label} style={{ marginBottom: gi < floors.length - 1 ? "1.1rem" : 0 }}>
              {/* Floor label — hidden when empty */}
              {group.label && (
                <div style={{
                  fontFamily: "'Highway Gothic', 'Barlow Condensed', sans-serif",
                  fontSize: "0.75rem", letterSpacing: "0.22em", textTransform: "uppercase",
                  fontWeight: 400, color: textColor, opacity: 0.3,
                  marginBottom: "0.45rem", lineHeight: 1,
                }}>{group.label}</div>
              )}
              {/* Section links under this floor */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                {group.sections.map(s => (
                  <button
                    key={s.id}
                    onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
                    onMouseEnter={() => handleEnter(s.id)}
                    onMouseLeave={handleLeave}
                    style={{
                      background: "none", border: "none", cursor: "pointer", padding: 0,
                      textAlign: "left",
                      fontFamily: "'Highway Gothic', 'Barlow Condensed', sans-serif",
                      fontSize: "0.88rem", letterSpacing: "0.18em", textTransform: "uppercase",
                      fontWeight: 300, color: textColor,
                      opacity: hoveredId === s.id ? 1 : 0.55,
                      transition: "color 0.8s ease, opacity 0.2s ease",
                      lineHeight: 1,
                    }}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </div>
          ));
        })()}

        {/* Divider before Localização */}
        <div style={{
          borderTop: `1px solid ${textColor}`,
          opacity: 0.2,
          marginTop: "1rem",
          marginBottom: "1rem",
        }} />

        {/* Localização link */}
        <button
          onClick={() => document.getElementById("info")?.scrollIntoView({ behavior: "smooth" })}
          onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "0.45")}
          style={{
            background: "none", border: "none", cursor: "pointer", padding: 0,
            textAlign: "left",
            fontFamily: "'Highway Gothic', 'Barlow Condensed', sans-serif",
            fontSize: "0.88rem", letterSpacing: "0.18em", textTransform: "uppercase",
            fontWeight: 300, color: textColor, opacity: 0.45,
            transition: "color 0.8s ease, opacity 0.2s ease",
            lineHeight: 1,
          }}
        >
          Localização
        </button>
      </nav>
    </>
  );
}

// ─── 35mm slideshow photos ───────────────────────────────────────────────────
const F35 = [
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/loft_35mm__saladeestar_e0a76f4f.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/loft_35mm__saladeestar2_48ff429a.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/loft_35mm__saladejantar_32e6d945.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/loft_35mm__saladejantar2_190fecbc.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/loft_35mm__areaexterna_58cea7bb.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/loft_35mm__cozinha_e5104679.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/loft_35mm__cozinha2_fa03aec6.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/loft_35mm__cozinha3_34b791ae.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/loft_35mm__lavabo_16b49e06.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/loft_35mm__quarto_54550e72.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/loft_35mm__quarto2_93f89c09.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/loft_35mm__banheiro_d98cf556.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/loft_35mm__closet_banheiro_01a7ce07.webp",
];

// Indices of horizontal images in F35 (saladeestar2=1, areaexterna=4, cozinha2=6, quarto=9)
const F35_HORIZONTAL = new Set([1, 4, 6, 9]);

// Hero slideshow — replaced with new user-uploaded photos
const F35_H_LIST = [
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/home_dining_043a7f40.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/home_bedroom_5008a8f5.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/home_garden_802c9a3b.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/home_living_chair_e82b3f1b.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/home_living_overhead_98b0cc1c.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/home_kitchen_fe659986.webp",
];

// ─── Home ──────────────────────────────────────────────────────
const LOGO_HORIZONTAL_WHITE = `${CDN}/logo_horizontal_dark_96b86942.png`; // reuse dark logo but tinted white via CSS filter

export default function Home() {
  const [bgColor, setBgColor] = useState(SECTION_COLORS.hero);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [planHovered, setPlanHovered] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  // Hero slideshow — horizontal images only, full-screen
  const [heroHIdx, setHeroHIdx] = useState(0);
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroVisible(false);
      setTimeout(() => {
        setHeroHIdx(prev => {
          let next: number;
          do { next = Math.floor(Math.random() * F35_H_LIST.length); } while (next === prev);
          return next;
        });
        setHeroVisible(true);
      }, 550);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Compute whether current background is dark (luminance < 128)
  const isBgDark = (() => {
    const hex = bgColor.replace("#", "");
    const r = parseInt(hex.slice(0,2),16), g = parseInt(hex.slice(2,4),16), b = parseInt(hex.slice(4,6),16);
    return (0.299*r + 0.587*g + 0.114*b) < 128;
  })();

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          setBgColor(SECTION_COLORS[id] ?? SECTION_COLORS.hero);
        }
      });
    }, { threshold: 0.3 });

    // Separate observer for hero visibility (corner labels + SideNav backdrop)
    const heroObs = new IntersectionObserver(entries => {
      entries.forEach(e => setIsHeroVisible(e.isIntersecting));
    }, { threshold: 0.05 });

    const hero = document.getElementById("hero");
    if (hero) { obs.observe(hero); heroObs.observe(hero); }
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => { obs.disconnect(); heroObs.disconnect(); };
  }, []);

  return (
    <div className={planHovered ? "plan-blur-active" : ""} style={{ backgroundColor: bgColor, minHeight: "100vh", color: "#2a2620", transition: "background-color 0.8s ease" }}>
      <style>{`
        * { transition: background-color 0.8s ease; }
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        @media (max-width: 768px) {
          .section-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .desktop-sidenav { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .desktop-cotia-label { display: none !important; }

          /* Icon spec row: wrap into 3-column grid */
          .spec-row { flex-wrap: wrap !important; justify-content: flex-start !important; gap: 0 !important; }
          .spec-row > div { width: 33.33% !important; padding: 0.5rem 0.4rem !important; box-sizing: border-box !important; }
          .spec-row p { white-space: normal !important; font-size: 11px !important; }

          /* Intro two-column → single column */
          .intro-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }

          /* Section media: single column, full-width images */
          .section-media-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .section-media-grid > div { width: 100% !important; margin-left: 0 !important; padding-top: 0 !important; margin-bottom: 2.5rem !important; }
          .section-media-grid img, .section-media-grid video { width: 100% !important; max-width: 100% !important; height: auto !important; aspect-ratio: auto !important; display: block !important; margin-bottom: 2.5rem !important; }

          /* matchHeight layout: single column on mobile */
          .match-height-grid { grid-template-columns: 1fr !important; height: auto !important; }
          .match-height-grid > div { height: 280px !important; }

          /* Nearby places: 2 columns */
          .nearby-grid { grid-template-columns: repeat(2, 1fr) !important; }

          /* Map: single column, shorter */
          .map-grid { grid-template-columns: 1fr !important; height: auto !important; }
          .map-grid iframe { height: 260px !important; }

          /* Hero logo: bigger on mobile */
          .hero-logo { width: min(180px, 55vw) !important; }

          /* Diferenciais: single column */
          .diferenciais-list { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) {
          .hamburger-btn { display: none !important; }
        }
        .plan-blur-active .page-content {
          opacity: 0.3;
          transition: opacity 0.35s ease;
        }
        .page-content {
          opacity: 1;
          transition: opacity 0.35s ease;
        }
      `}</style>

      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: "transparent", padding: "1.2rem 2rem",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {/* Hamburger button — mobile only */}
        <button
          className="hamburger-btn"
          onClick={() => setMobileMenuOpen(o => !o)}
          style={{
            display: "none",
            position: "absolute", left: "1.2rem", top: "1.1rem",
            background: "none", border: "none", cursor: "pointer",
            padding: "0.3rem", zIndex: 201, flexDirection: "column",
            gap: "5px", alignItems: "center", justifyContent: "center",
          }}
          aria-label="Menu"
        >
          {mobileMenuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isHeroVisible ? "#e8e4d9" : "#1a1714"} strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isHeroVisible ? "#e8e4d9" : "#1a1714"} strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          )}
        </button>

        {/* Top-left label — desktop only */}
        <div
          className="desktop-cotia-label"
          style={{
          position: "absolute", left: "1.2rem", top: "1.2rem",
          fontFamily: "'Highway Gothic', 'Barlow Condensed', sans-serif",
          fontSize: "0.88rem", fontWeight: 300, letterSpacing: "0.18em", textTransform: "uppercase",
          color: isHeroVisible ? "#e8e4d9" : "#1a1714",
          lineHeight: 1.7, textAlign: "left",
          transition: "color 0.6s ease",
          pointerEvents: "none",
        }}>
          <div>Cotia</div>
          <div>São Paulo</div>
        </div>
        {/* Logo center */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}
        >
          <img src={LOGO_HORIZONTAL} alt="Loft Vinte e Oito"
            style={{
              height: "14px", width: "auto", display: "block",
              filter: isHeroVisible
                ? "invert(1) sepia(0.18) saturate(0.7) brightness(0.94)"
                : "invert(1) sepia(1) saturate(0) brightness(0)",
              transition: "filter 0.6s ease",
            }} />
        </button>
        {/* Top-right label — desktop only */}
        <div style={{
          position: "absolute", right: "1.2rem", top: "1.2rem",
          fontFamily: "'Highway Gothic', 'Barlow Condensed', sans-serif",
          fontSize: "0.88rem", fontWeight: 300, letterSpacing: "0.18em", textTransform: "uppercase",
          color: isHeroVisible ? "#e8e4d9" : "#1a1714",
          lineHeight: 1.7, textAlign: "right",
          transition: "color 0.6s ease",
          pointerEvents: "none",
          display: "none",
        }}>
          <div>KM 24</div>
          <div>Raposo Tavares</div>
        </div>
      </nav>

      {/* Vertical section index — fixed left side (desktop only) */}
      <div className="desktop-sidenav">
        <SideNav isBgDark={isBgDark} isHeroVisible={isHeroVisible} onHoverChange={(id) => setPlanHovered(id !== null && id in SECTION_PLANS)} />
      </div>

      {/* Mobile full-screen nav overlay */}
      {mobileMenuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 200,
          backgroundColor: bgColor,
          display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "flex-start",
          padding: "4rem 2.5rem",
          overflowY: "auto",
        }}>
          {/* Floor groups */}
          {(() => {
            const floors: { label: string; sections: typeof SECTIONS }[] = [];
            SECTIONS.forEach(s => {
              const last = floors[floors.length - 1];
              if (last && last.label === s.floor) { last.sections.push(s); }
              else { floors.push({ label: s.floor, sections: [s] }); }
            });
            return floors.map((group, gi) => (
              <div key={group.label} style={{ marginBottom: gi < floors.length - 1 ? "2rem" : 0 }}>
                {group.label && (
                  <div style={{
                    fontFamily: "'Highway Gothic', 'Barlow Condensed', sans-serif",
                    fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase",
                    fontWeight: 400, color: isBgDark ? "#e8e4d9" : "#2a2620", opacity: 0.35,
                    marginBottom: "0.8rem", lineHeight: 1,
                  }}>{group.label}</div>
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                  {group.sections.map(s => (
                    <button key={s.id}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setTimeout(() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" }), 100);
                      }}
                      style={{
                        background: "none", border: "none", cursor: "pointer", padding: 0,
                        textAlign: "left",
                        fontFamily: "'Nouveau Hippie JNL', 'Monotype Corsiva', cursive",
                        fontSize: "clamp(1.8rem, 6vw, 2.8rem)",
                        fontWeight: 400, fontStyle: "italic",
                        color: isBgDark ? "#e8e4d9" : "#2a2620",
                        lineHeight: 1.1,
                      }}
                    >{s.title}</button>
                  ))}
                </div>
              </div>
            ));
          })()}
          {/* Divider */}
          <div style={{ borderTop: `1px solid ${isBgDark ? "#e8e4d9" : "#2a2620"}`, opacity: 0.2, width: "100%", margin: "2rem 0" }} />
          {/* Localização */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setTimeout(() => document.getElementById("info")?.scrollIntoView({ behavior: "smooth" }), 100);
            }}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: 0,
              textAlign: "left",
              fontFamily: "'Nouveau Hippie JNL', 'Monotype Corsiva', cursive",
              fontSize: "clamp(1.8rem, 6vw, 2.8rem)",
              fontWeight: 400, fontStyle: "italic",
              color: isBgDark ? "#e8e4d9" : "#2a2620",
              lineHeight: 1.1,
            }}
          >Localização</button>
        </div>
      )}

      {/* Blur overlay when plan is shown — covers everything except nav and SideNav */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 98, pointerEvents: "none",
        backdropFilter: planHovered ? "blur(8px)" : "none",
        WebkitBackdropFilter: planHovered ? "blur(8px)" : "none",
        backgroundColor: planHovered ? `${bgColor}80` : "transparent",
        transition: "backdrop-filter 0.35s ease, -webkit-backdrop-filter 0.35s ease, background-color 0.35s ease",
      }} />

      {/* Page content — dims to 30% when plan is hovered */}
      <div className="page-content">

      {/* Hero — full-screen horizontal-only slideshow */}
      <div id="hero" style={{
        position: "relative", width: "100vw", height: "100vh",
        overflow: "hidden", marginLeft: "calc(-50vw + 50%)",
      }}>
        {/* Full-screen image */}
        <img
          src={F35_H_LIST[heroHIdx]}
          alt=""
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            opacity: 1,
          }}
        />

        {/* Circle logo centered */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 2,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
            <img src={LOGO_CIRCLE} alt="Loft Vinte e Oito — Granja Vianna"
            className="hero-logo"
            style={{
              width: "min(260px, 22vw)", height: "auto",
              filter: "invert(1) sepia(0.18) saturate(0.7) brightness(0.94)",  /* warm parchment #e8e4d9 */
            }} />
        </div>
      </div>



      {/* Intro text — two columns, below hero */}
      <div style={{ backgroundColor: "#ede9df" }}>
      {/* Icon grid above intro text */}
      <div style={{
        padding: "5rem 0 0",
        maxWidth: "1200px",
        margin: "0 auto",
        paddingLeft: "clamp(2rem, 6vw, 5rem)",
        paddingRight: "clamp(2rem, 6vw, 5rem)",
        marginBottom: "3rem",
      }}>
        <div className="spec-row" style={{ display: "flex", flexWrap: "nowrap", gap: "0", alignItems: "flex-start", justifyContent: "center" }}>
          {([
            { label: "1 Suíte", sub: null, svg: <svg width="28" height="22" viewBox="0 0 28 22" fill="none" stroke="#2a2620" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="9" width="26" height="12" rx="1"/><path d="M1 9V5a1 1 0 011-1h4v5"/><path d="M22 4h4a1 1 0 011 1v4"/><rect x="5" y="4" width="8" height="5" rx="1"/><rect x="15" y="4" width="8" height="5" rx="1"/><line x1="1" y1="21" x2="1" y2="22"/><line x1="27" y1="21" x2="27" y2="22"/></svg> },
            { label: "84 m²", sub: "+ área privada externa", svg: <svg width="28" height="22" viewBox="0 0 28 22" fill="none" stroke="#2a2620" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="1" width="26" height="20" rx="1"/><line x1="1" y1="6" x2="4" y2="6"/><line x1="1" y1="11" x2="4" y2="11"/><line x1="1" y1="16" x2="4" y2="16"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="11" y1="1" x2="11" y2="4"/><line x1="16" y1="1" x2="16" y2="4"/><line x1="21" y1="1" x2="21" y2="4"/></svg> },
            { label: "Mobiliado", sub: null, svg: <svg width="28" height="22" viewBox="0 0 28 22" fill="none" stroke="#2a2620" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="22" height="10" rx="1"/><path d="M3 12H1V8a2 2 0 012-2h22a2 2 0 012 2v4h-2"/><line x1="5" y1="18" x2="5" y2="21"/><line x1="23" y1="18" x2="23" y2="21"/></svg> },
            { label: "Jardim privado", sub: null, svg: <svg width="28" height="22" viewBox="0 0 28 22" fill="none" stroke="#2a2620" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><line x1="14" y1="21" x2="14" y2="10"/><path d="M14 10 C14 10 8 8 8 3a6 6 0 0112 0c0 5-6 7-6 7z"/><path d="M14 14 C14 14 9 13 7 9"/><path d="M14 14 C14 14 19 13 21 9"/></svg> },
            { label: "1 Banheiro e 1 Lavabo", sub: null, svg: <svg width="28" height="22" viewBox="0 0 28 22" fill="none" stroke="#2a2620" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h20v4a8 8 0 01-16 0v-4z"/><path d="M4 10V6a3 3 0 016 0"/><line x1="14" y1="18" x2="14" y2="21"/><line x1="10" y1="21" x2="18" y2="21"/><circle cx="9" cy="5" r="1" fill="#2a2620" stroke="none"/></svg> },
            { label: "2 vagas", sub: "garagem coberta", svg: <svg width="28" height="22" viewBox="0 0 28 22" fill="none" stroke="#2a2620" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="8" width="26" height="10" rx="1"/><path d="M5 8L7 3h14l2 5"/><circle cx="8" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><line x1="1" y1="13" x2="27" y2="13"/></svg> },
            { label: "Elevador", sub: null, svg: <svg width="28" height="22" viewBox="0 0 28 22" fill="none" stroke="#2a2620" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="1" width="16" height="20" rx="1"/><line x1="14" y1="1" x2="14" y2="21"/><polyline points="9,7 12,4 15,7"/><polyline points="9,15 12,18 15,15"/></svg> },
            { label: "Portaria 24h", sub: null, svg: <svg width="28" height="22" viewBox="0 0 28 22" fill="none" stroke="#2a2620" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="1" width="26" height="20" rx="1"/><rect x="11" y="10" width="6" height="11" rx="0.5"/><circle cx="14" cy="6" r="2.5"/><line x1="1" y1="7" x2="27" y2="7"/></svg> },
            { label: "Piscina coletiva", sub: null, svg: <svg width="28" height="22" viewBox="0 0 28 22" fill="none" stroke="#2a2620" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M1 16 C5 13 9 19 14 16 C19 13 23 19 27 16"/><path d="M1 20 C5 17 9 21 14 20 C19 17 23 21 27 20"/><circle cx="14" cy="5" r="2.5"/><path d="M14 7.5v5l-3 3"/><path d="M14 10l3 2"/></svg> },
          ] as Array<{label: string; sub: string|null; svg: React.ReactNode}>).map((spec, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 1rem" }}>
              <div style={{ opacity: 0.75, marginBottom: "0.5rem" }}>{spec.svg}</div>
              <p style={{ fontFamily: "'Rubik', sans-serif", fontSize: "14px", fontWeight: 700, color: "#2a2620", margin: 0, lineHeight: 1.3, whiteSpace: "nowrap" }}>{spec.label}</p>
              {spec.sub && <p style={{ fontFamily: "'Rubik', sans-serif", fontSize: "0.88rem", fontWeight: 300, color: "#2a2620", opacity: 0.5, margin: "0.1rem 0 0 0", whiteSpace: "nowrap" }}>{spec.sub}</p>}
            </div>
          ))}
        </div>
      </div>
      <div style={{
        padding: "0 0 5rem",
        maxWidth: "1200px",
        margin: "0 auto",
        paddingLeft: "clamp(2rem, 6vw, 5rem)",
        paddingRight: "clamp(2rem, 6vw, 5rem)",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem 6rem",
          alignItems: "start",
        }} className="intro-grid">
          <p style={{
            fontFamily: "'Highway Gothic', 'Barlow Condensed', sans-serif",
            fontSize: "14px",
            fontWeight: 300,
            color: "#2a2620", lineHeight: 1.85, margin: 0,
            letterSpacing: "0.04em",
          }}>
            O Loft 28 fica dentro do condomínio Grand Loft, na Granja Vianna, a poucos quilometros de São Paulo. A parte interna do loft foi concebido inteiramente do zero: elétrica, revestimentos, azulejos, mobiliário embutido e objetos de decoração foram pensados em conjunto, peça por peça. Grande parte dos móveis e objetos foi desenhada pelos próprios moradores ao lado do arquiteto Jorge Nakano.
          </p>
          <p style={{
            fontFamily: "'Highway Gothic', 'Barlow Condensed', sans-serif",
            fontSize: "14px",
            fontWeight: 300,
            color: "#2a2620", lineHeight: 1.85, margin: 0,
            letterSpacing: "0.04em",
          }}>
            A estética do espaço nasce das viagens e das experiências acumuladas pelos moradores no Brasil e no exterior, traduzidas em materiais naturais, soluções criativas para optimizar o espaço interno e uma paleta que dialoga com a mata ao redor. O resultado é um lugar pensado para um casal que busca tranquilidade e contato com a natureza sem abrir mão da praticidade e da proximidade com a cidade.
          </p>
        </div>

        {/* Diferenciais — after two-column text */}
        <div style={{ marginTop: "3rem" }}>
          <p style={{
            fontFamily: "'Highway Gothic', 'Barlow Condensed', sans-serif",
            fontSize: "0.72rem", fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase",
            color: "#2a2620", opacity: 0.45, margin: "0 0 1.2rem 0",
          }}></p>
          <ul className="diferenciais-list" style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "0.4rem 3rem" }}>
            {[
              "Arquitetura contemporânea",
              "Fechadura eletrônica",
              "Ambientes integrados",
              "Suíte com dimmer",
              "Tomada USB no living e suíte",
              "Fiação subterrânea",
              "Wi-Fi",
              "Reuúso de água nas áreas comuns",
              "Ar condicionado",
            ].map((item, i) => (
              <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#2a2620", opacity: 0.4, flexShrink: 0 }} />
                <span style={{ fontFamily: "'Rubik', sans-serif", fontSize: "0.88rem", fontWeight: 300, color: "#2a2620", letterSpacing: "0.02em" }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>{/* end intro bg */}

      {/* Térreo floor plan */}
      <div id="terreo-plan" style={{ padding: "5rem 0 4rem", backgroundColor: SECTION_COLORS.living ?? "#e2ddd0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p style={{
              fontFamily: "'Highway Gothic', 'Barlow Condensed', sans-serif",
              fontSize: "0.85rem", fontWeight: 300,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "#2a2620", opacity: 0.5, margin: "0 0 0.4rem 0",
            }}>Planta Baixa</p>
            <h2 style={{
              fontFamily: "'Nouveau Hippie JNL', 'Monotype Corsiva', cursive",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 400, fontStyle: "italic",
              color: "#2a2620", lineHeight: 1.05, margin: 0,
            }}>Térreo</h2>
          </div>
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/TERREO_16dca045.webp"
            alt="Planta Térreo"
            style={{
              width: "100%", height: "auto", display: "block",
              filter: "invert(1) sepia(1) saturate(1.5) hue-rotate(5deg) brightness(0.18) invert(0)",
            }}
          />
        </div>
      </div>

      {/* Sections */}
      {SECTIONS.filter(s => s.id !== "work" && s.id !== "bed" && s.id !== "bath" && s.id !== "pool").map((s) => (
        <Section key={s.id} section={s} />
      ))}

      {/* 1º Andar floor plan */}
      <div id="primeiro-andar-plan" style={{ padding: "5rem 0 4rem", backgroundColor: SECTION_COLORS.work ?? "#ddd8cc" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p style={{
              fontFamily: "'Highway Gothic', 'Barlow Condensed', sans-serif",
              fontSize: "0.85rem", fontWeight: 300,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "#2a2620", opacity: 0.5, margin: "0 0 0.4rem 0",
            }}>Planta Baixa</p>
            <h2 style={{
              fontFamily: "'Nouveau Hippie JNL', 'Monotype Corsiva', cursive",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 400, fontStyle: "italic",
              color: "#2a2620", lineHeight: 1.05, margin: 0,
            }}>1º Andar</h2>
          </div>
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/primeiroandar_d9068452.png"
            alt="Planta 1º Andar"
            style={{
              width: "50%", maxWidth: "700px", height: "auto", display: "block", margin: "0 auto",
              filter: "invert(1) sepia(1) saturate(1.5) hue-rotate(5deg) brightness(0.18) invert(0)",
            }}
          />
        </div>
      </div>

      {/* Remaining sections: 1º Andar rooms + pool */}
      {SECTIONS.filter(s => s.id === "work" || s.id === "bed" || s.id === "bath" || s.id === "pool").map((s) => (
        <Section key={s.id} section={s} />
      ))}

      {/* Info Section */}
      <InfoSection />

      {/* Fixed WhatsApp contact button */}
      <a
        href="https://wa.me/5511982652518"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          backgroundColor: "#2a2620",
          color: "#f5f0e8",
          textDecoration: "none",
          padding: "0.65rem 1.1rem",
          fontFamily: "'Highway Gothic', 'Barlow Condensed', sans-serif",
          fontSize: "0.78rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontWeight: 300,
          boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
          transition: "opacity 0.2s ease",
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Contato
      </a>

      {/* End logo + address */}
      <div style={{
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        padding: "4rem 0 8rem", gap: "1.5rem",
      }}>
        <img src={LOGO_CIRCLE} alt="Loft Vinte e Oito"
          style={{ width: "240px", height: "auto", opacity: 0.9 }} />
        <div style={{ textAlign: "center" }}>
          <p style={{
            fontFamily: "'Highway Gothic', 'Barlow Condensed', sans-serif",
            fontSize: "0.72rem", fontWeight: 300, letterSpacing: "0.18em", textTransform: "uppercase",
            color: "#2a2620", margin: "0 0 0.25rem 0", lineHeight: 1.6,
          }}>Alameda São Luiz, 300</p>
          <p style={{
            fontFamily: "'Highway Gothic', 'Barlow Condensed', sans-serif",
            fontSize: "0.72rem", fontWeight: 300, letterSpacing: "0.18em", textTransform: "uppercase",
            color: "#2a2620", margin: 0, lineHeight: 1.6,
          }}>Granja Vianna — Cotia, SP</p>
        </div>
      </div>
      </div>{/* end page-content */}
    </div>
  );
}

// ─── GallerySection ─────────────────────────────────────────────────────────
// Assets already used in sections (excluded from gallery):
//   Sections use: LIVING_WIDE, VID_LIVING_3, dining CDN photos, LAVABO_4, LAVABO CDN jpg,
//   outside_1 CDN jpg, loft_35mm__areaexterna, loft_35mm__cozinha3, kitchen CDN webp,
//   LIVING_STOOL, work CDN photos, bed_1 CDN jpg, bed video, bath video, bath_1 CDN jpg,
//   pool photo CDN webp, VID_POOL_1
// F35 items already in sections: index 2 (saladejantar), 4 (areaexterna), 7 (cozinha3)
const F35_GALLERY = F35.filter((_, i) => ![1, 2, 4, 7].includes(i));

const GALLERY_ITEMS: Array<{ type: "photo" | "video"; src: string }> = [
  // Videos (formerly line 2, now line 1)
  { type: "video",  src: VID_LIVING_NEW },
  { type: "video",  src: VID_LIVING_5 },
  { type: "video",  src: VID_LIVING_1 },
  { type: "video",  src: VID_LIVING_4 },
  { type: "video",  src: VID_HERO_ORIG },
  // Photos (formerly line 1, now line 2)
  { type: "photo",  src: BATH_NEW },
  { type: "photo",  src: LIVING_PLANTS },
  { type: "photo",  src: LAVABO_1 },
  { type: "photo",  src: LAVABO_2 },
  { type: "photo",  src: LAVABO_3 },
  // Remaining videos (pos 11–13, VID_POOL_3 removed)
  { type: "video",  src: VID_OUTSIDE },
  { type: "video",  src: VID_LAVABO },
  { type: "photo",  src: CLOSET_PHOTO },
  // 35mm film photos not already in sections
  ...F35_GALLERY.map(src => ({ type: "photo" as const, src })),
];

function GallerySection({ bgColor }: { bgColor: string }) {
  const [lb, setLb] = useState<number | null>(null);
  const photoSrcs = GALLERY_ITEMS.filter(i => i.type === "photo").map(i => i.src);
  const textColor = "#2a2620";

  return (
    <section id="gallery" style={{ padding: "4rem 0 5rem", backgroundColor: bgColor }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{
            fontFamily: "'Nouveau Hippie JNL', 'Monotype Corsiva', cursive",
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            fontWeight: 400, fontStyle: "italic",
            color: textColor, lineHeight: 1.05, margin: "0 0 1.2rem 0",
          }}>Galeria</h2>
        </div>

        {/* 4-column thumbnail grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "0.6rem",
        }}>
          {GALLERY_ITEMS.map((item, i) => {
            if (item.type === "video") {
              return (
                <div key={i} style={{ overflow: "hidden", aspectRatio: "1 / 1" }}>
                  <video
                    src={item.src}
                    autoPlay muted loop playsInline
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
              );
            }
            const pIdx = photoSrcs.indexOf(item.src);
            return (
              <div
                key={i}
                onClick={() => setLb(pIdx >= 0 ? pIdx : 0)}
                style={{ overflow: "hidden", aspectRatio: "1 / 1", cursor: "zoom-in" }}
                onMouseEnter={e => { const img = e.currentTarget.querySelector("img"); if (img) img.style.opacity = "0.8"; }}
                onMouseLeave={e => { const img = e.currentTarget.querySelector("img"); if (img) img.style.opacity = "1"; }}
              >
                <img
                  src={item.src} alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "opacity 0.25s ease" }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {lb !== null && (
        <Lightbox images={photoSrcs} index={lb} onClose={() => setLb(null)} />
      )}
    </section>
  );
}

// ─── Amenities ────────────────────────────────────────────────────────────────
const AMENITIES = [
  "Arquitetura contemporânea",
  "Fachada com pele de vidro",
  "Porta de entrada pivotante",
  "Fechadura eletrônica",
  "Ambientes integrados",
  "Living garden",
  "Suíte com dimmer",
  "Tomada USB no living e suítes",
  "Rooftop",
  "Bike Sharing",
  "Fiação subterrânea",
  "Wi-Fi",
  "Central de monitoramento",
  "Bacias sanitárias com sistema dual flux",
  "Aquecimento solar na piscina",
  "Iluminação com sensores de presença",
  "Torneiras com temporizador nas áreas comuns",
  "Projeto paisagístico com espécies nativas",
  "Lixeiras seletivas",
  "Reúso de água nas áreas comuns",
  "Infraestrutura para ar condicionado",
  "Infraestrutura para automação",
  "Tomada para cabideiro térmico nos banheiros",
];

function InfoSection() {
  return (
    <section id="info" style={{ padding: "8rem 0 10rem" }}>
      <div className="container">
        <div style={{ marginBottom: "5rem" }}>
          <h2 style={{
            fontFamily: "'Nouveau Hippie JNL', 'Monotype Corsiva', cursive",
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 400, fontStyle: "italic",
            color: "#2a2620", lineHeight: 1.05, margin: "0 0 1.5rem 0",
          }}>Localização</h2>
          <p style={{
            fontFamily: "'Rubik', sans-serif",
            fontSize: "13px", fontWeight: 300, letterSpacing: "0.02em",
            color: "#2a2620", opacity: 0.85, lineHeight: 1.8,
            maxWidth: "640px", margin: "0 0 2rem 0",
          }}>Localizado na Alameda São Luiz, o loft tem apenas 4 anos e foi projetado para quem busca praticidade no dia a dia. A apenas alguns passos do centro comercial Granjardim, com restaurantes como Noriyuki Sushi Bar, Vendinha e Garden Bar & Restaurante, além de moda, lazer e serviços na área de saúde. Fica pertinho também do Shopping Granja Vianna e do Colégio Anglo Leonardo Da Vinci.</p>

          {/* Nearby places — moved here, below location text */}
          <div style={{ marginTop: "2.5rem", marginBottom: "3rem" }}>
            <div className="nearby-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
              {[
                { name: "Noriyuki Sushi Bar", desc: "Japão contemporâneo no Granjardim", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/eRfKieGEUDPP_fcb48e75.jpg" },
                { name: "Vendinha Bar e Cozinha", desc: "Cozinha brasileira contemporânea", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/RMA1axwbVtCb_24598957.jpg" },
                { name: "Shopping Granja Vianna", desc: "Moda, lazer e gastronomia", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/l6AGW2Rnnvhu_a19d8b28.jpg" },
                { name: "Pizzaria Basílica", desc: "Pizza artesanal em forno a lenha", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/basilica_restaurant_ab8e8c12.jpg" },
                { name: "Colégio Rio Branco", desc: "Educação de excelência na Granja Vianna", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/colegio_rio_branco_2938c070.jpg" },
                { name: "Shopping Square", desc: "Compras e entretenimento", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/l6AGW2Rnnvhu_a19d8b28.jpg" },
                { name: "Padaria Deola", desc: "Pão artesanal e confeitaria", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/fYkaLMssTH4Tfcy8DVGZCv/basilica_restaurant_ab8e8c12.jpg" },
              ].map((place, i) => (
                <div key={i} style={{ overflow: "hidden" }}>
                  <div style={{ height: "200px", overflow: "hidden", marginBottom: "0.8rem" }}>
                    <img src={place.img} alt={place.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                    />
                  </div>
                   <p style={{ fontFamily: "'Highway Gothic', 'Barlow Condensed', sans-serif", fontSize: "13px", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2a2620", margin: "0 0 0.25rem 0" }}>{place.name}</p>
                  <p style={{ fontFamily: "'Rubik', sans-serif", fontSize: "0.72rem", fontWeight: 300, color: "#2a2620", opacity: 0.6, margin: 0 }}>{place.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Property specs with SVG icons — now shown above intro text */}
          <div style={{ display: "none" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, auto)", gap: "1.2rem 3.5rem", justifyContent: "start" }}>
              {[
                {
                  label: "1 Suíte",
                  sub: null,
                  svg: <svg width="28" height="22" viewBox="0 0 28 22" fill="none" stroke="#2a2620" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="9" width="26" height="12" rx="1"/><path d="M1 9V5a1 1 0 011-1h4v5"/><path d="M22 4h4a1 1 0 011 1v4"/><rect x="5" y="4" width="8" height="5" rx="1"/><rect x="15" y="4" width="8" height="5" rx="1"/><line x1="1" y1="21" x2="1" y2="22"/><line x1="27" y1="21" x2="27" y2="22"/></svg>,
                },
                {
                  label: "84 m²",
                  sub: "+ área privada externa",
                  svg: <svg width="28" height="22" viewBox="0 0 28 22" fill="none" stroke="#2a2620" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="1" width="26" height="20" rx="1"/><line x1="1" y1="6" x2="4" y2="6"/><line x1="1" y1="11" x2="4" y2="11"/><line x1="1" y1="16" x2="4" y2="16"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="11" y1="1" x2="11" y2="4"/><line x1="16" y1="1" x2="16" y2="4"/><line x1="21" y1="1" x2="21" y2="4"/></svg>,
                },
                {
                  label: "Mobiliado",
                  sub: null,
                  svg: <svg width="28" height="22" viewBox="0 0 28 22" fill="none" stroke="#2a2620" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="22" height="10" rx="1"/><path d="M3 12H1V8a2 2 0 012-2h22a2 2 0 012 2v4h-2"/><line x1="5" y1="18" x2="5" y2="21"/><line x1="23" y1="18" x2="23" y2="21"/></svg>,
                },
                {
                  label: "Jardim privado",
                  sub: null,
                  svg: <svg width="28" height="22" viewBox="0 0 28 22" fill="none" stroke="#2a2620" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><line x1="14" y1="21" x2="14" y2="10"/><path d="M14 10 C14 10 8 8 8 3a6 6 0 0112 0c0 5-6 7-6 7z"/><path d="M14 14 C14 14 9 13 7 9"/><path d="M14 14 C14 14 19 13 21 9"/></svg>,
                },
                {
                  label: "1 Banheiro e 1 Lavabo",
                  sub: null,
                  svg: <svg width="28" height="22" viewBox="0 0 28 22" fill="none" stroke="#2a2620" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h20v4a8 8 0 01-16 0v-4z"/><path d="M4 10V6a3 3 0 016 0"/><line x1="14" y1="18" x2="14" y2="21"/><line x1="10" y1="21" x2="18" y2="21"/><circle cx="9" cy="5" r="1" fill="#2a2620" stroke="none"/></svg>,
                },
                {
                  label: "2 vagas",
                  sub: "garagem coberta",
                  svg: <svg width="28" height="22" viewBox="0 0 28 22" fill="none" stroke="#2a2620" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="8" width="26" height="10" rx="1"/><path d="M5 8L7 3h14l2 5"/><circle cx="8" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><line x1="1" y1="13" x2="27" y2="13"/></svg>,
                },
                {
                  label: "Elevador",
                  sub: null,
                  svg: <svg width="28" height="22" viewBox="0 0 28 22" fill="none" stroke="#2a2620" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="1" width="16" height="20" rx="1"/><line x1="14" y1="1" x2="14" y2="21"/><polyline points="9,7 12,4 15,7"/><polyline points="9,15 12,18 15,15"/></svg>,
                },
                {
                  label: "Portaria 24h",
                  sub: null,
                  svg: <svg width="28" height="22" viewBox="0 0 28 22" fill="none" stroke="#2a2620" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="1" width="26" height="20" rx="1"/><rect x="11" y="10" width="6" height="11" rx="0.5"/><circle cx="14" cy="6" r="2.5"/><line x1="1" y1="7" x2="27" y2="7"/></svg>,
                },
                {
                  label: "Piscina coletiva",
                  sub: null,
                  svg: <svg width="28" height="22" viewBox="0 0 28 22" fill="none" stroke="#2a2620" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M1 16 C5 13 9 19 14 16 C19 13 23 19 27 16"/><path d="M1 20 C5 17 9 21 14 20 C19 17 23 21 27 20"/><circle cx="14" cy="5" r="2.5"/><path d="M14 7.5v5l-3 3"/><path d="M14 10l3 2"/></svg>,
                },
              ].map((spec, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <div style={{ flexShrink: 0, marginTop: "2px", opacity: 0.75 }}>{spec.svg}</div>
                  <div>
                    <p style={{
                      fontFamily: "'Rubik', sans-serif",
                      fontSize: "0.88rem", fontWeight: 400,
                      color: "#2a2620", margin: 0, lineHeight: 1.3,
                    }}>{spec.label}</p>
                    {spec.sub && <p style={{
                      fontFamily: "'Rubik', sans-serif",
                      fontSize: "0.88rem", fontWeight: 300,
                      color: "#2a2620", opacity: 0.5, margin: "0.1rem 0 0 0",
                    }}>{spec.sub}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="map-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", height: "460px", marginBottom: "5rem" }}>
          {/* Street View — left */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!4v1775714000000!6m8!1m7!1s2L1wEH7uungbtgtFvxe67A!2m2!1d-23.5816928!2d-46.8364132!3f196!4f0!5f0.7820865974627469"
            width="100%"
            height="100%"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Loft Vinte e Oito — Street View"
          />
          {/* Map — right */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d936.7!2d-46.8365861!3d-23.5822255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cfaaa644dce3f1%3A0xbe7b0cdef1cca05a!2sGran%20Loft!5e0!3m2!1spt-BR!2sbr!4v1744163000001"
            width="100%"
            height="100%"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Loft Vinte e Oito — Mapa"
          />
        </div>


      </div>
    </section>
  );
}
