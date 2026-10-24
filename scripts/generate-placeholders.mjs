/**
 * Generates the architectural line-drawing PLACEHOLDER artwork in
 * public/images/placeholders. These stand in for real photography until the
 * firm supplies its own images; replace the files (or the `src` values in
 * /data) with real, approved photographs.
 *
 *   node scripts/generate-placeholders.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images", "placeholders");
mkdirSync(OUT, { recursive: true });

const W = 1600;
const H = 900;

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const between = (r, min, max) => min + (max - min) * r();
const int = (r, min, max) => Math.round(between(r, min, max));

const GOLD = "#b18a4a";

const palettes = {
  dark: {
    skyTop: "#151815",
    skyBottom: "#2a2e29",
    ground: "#111311",
    volume: "#232622",
    volumeAlt: "#2e322d",
    line: "#f7f5f0",
    lineOpacity: 0.5,
    glass: GOLD,
    glassOpacity: 0.5,
    glow: GOLD,
    slab: "#f7f5f0",
  },
  light: {
    skyTop: "#f4f1ea",
    skyBottom: "#e3ddd0",
    ground: "#d9d2c3",
    volume: "#fbfaf6",
    volumeAlt: "#ece7dc",
    line: "#222522",
    lineOpacity: 0.55,
    glass: GOLD,
    glassOpacity: 0.4,
    glow: GOLD,
    slab: "#222522",
  },
  muted: {
    skyTop: "#d9d6cd",
    skyBottom: "#c9c5b9",
    ground: "#aaa597",
    volume: "#cfcbbf",
    volumeAlt: "#bdb9ac",
    line: "#222522",
    lineOpacity: 0.45,
    glass: "#77765e",
    glassOpacity: 0.3,
    glow: "#77765e",
    slab: "#4b4d46",
  },
};

function frame(p, body, { grid = true } = {}) {
  const gridLines = grid
    ? `<g stroke="${p.line}" stroke-opacity="0.05" stroke-width="1">${Array.from({ length: 17 }, (_, i) => `<path d="M${i * 100} 0V${H}"/>`).join("")}${Array.from({ length: 10 }, (_, i) => `<path d="M0 ${i * 100}H${W}"/>`).join("")}</g>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Architectural placeholder illustration">
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.skyTop}"/><stop offset="1" stop-color="${p.skyBottom}"/></linearGradient>
<linearGradient id="lit" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.glass}" stop-opacity="${p.glassOpacity}"/><stop offset="1" stop-color="${p.glass}" stop-opacity="${p.glassOpacity * 0.25}"/></linearGradient>
<radialGradient id="glow" cx="0.5" cy="1" r="0.8"><stop offset="0" stop-color="${p.glow}" stop-opacity="0.22"/><stop offset="1" stop-color="${p.glow}" stop-opacity="0"/></radialGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#sky)"/>
${gridLines}
${body}
</svg>`;
}

/** A modern residence in elevation. */
function elevation(seed, tone = "dark", opts = {}) {
  const p = palettes[tone];
  const r = rng(seed);
  const ground = opts.ground ?? 690;
  const cx = 800 + int(r, -60, 60);

  const lowW = int(r, 560, 700);
  const lowH = int(r, 170, 210);
  const lowX = cx - lowW / 2 - int(r, 20, 90);

  const upW = int(r, 620, 780);
  const upH = int(r, 190, 240);
  const upX = lowX + int(r, 110, 220);
  const upY = ground - lowH - upH;

  const sunX = r() > 0.5 ? int(r, 1180, 1420) : int(r, 180, 420);
  const treeX = sunX > 800 ? int(r, 170, 330) : int(r, 1260, 1440);

  const slatStart = upX + upW * 0.62;
  const slats = Array.from({ length: Math.floor((upW * 0.36) / 15) }, (_, i) => `<path d="M${slatStart + i * 15} ${upY + 16}V${upY + upH - 8}"/>`).join("");
  const mullions = (x, y, w, h, step) => Array.from({ length: Math.floor(w / step) - 1 }, (_, i) => `<path d="M${x + (i + 1) * step} ${y}V${y + h}"/>`).join("");

  const lowGlassX = lowX + 40;
  const lowGlassW = lowW * 0.56;
  const upGlassX = upX + 40;
  const upGlassW = upW * 0.5;

  const body = `
<ellipse cx="${cx}" cy="${ground}" rx="760" ry="190" fill="url(#glow)"/>
<circle cx="${sunX}" cy="${int(r, 170, 250)}" r="${int(r, 70, 100)}" fill="none" stroke="${GOLD}" stroke-opacity="0.55" stroke-width="1.5"/>
<rect x="0" y="${ground}" width="${W}" height="${H - ground}" fill="${p.ground}"/>
<path d="M0 ${ground}H${W}" stroke="${p.line}" stroke-opacity="${p.lineOpacity}" stroke-width="2"/>

<!-- tree (outline only) -->
<g stroke="${p.line}" stroke-opacity="0.28" fill="none" stroke-width="1.5">
<path d="M${treeX} ${ground}V${ground - 150}"/>
<circle cx="${treeX}" cy="${ground - 215}" r="86"/>
<circle cx="${treeX - 54}" cy="${ground - 170}" r="52"/>
<circle cx="${treeX + 56}" cy="${ground - 176}" r="58"/>
</g>

<!-- ground-floor volume -->
<rect x="${lowX}" y="${ground - lowH}" width="${lowW}" height="${lowH}" fill="${p.volume}" stroke="${p.line}" stroke-opacity="${p.lineOpacity}" stroke-width="2"/>
<rect x="${lowGlassX}" y="${ground - lowH + 28}" width="${lowGlassW}" height="${lowH - 28}" fill="url(#lit)"/>
<g stroke="${p.line}" stroke-opacity="0.35" stroke-width="1.5">${mullions(lowGlassX, ground - lowH + 28, lowGlassW, lowH - 28, lowGlassW / 6)}</g>
<rect x="${lowX + lowW * 0.7}" y="${ground - lowH + 30}" width="${lowW * 0.2}" height="${lowH - 30}" fill="${p.volumeAlt}" stroke="${p.line}" stroke-opacity="0.35" stroke-width="1.5"/>

<!-- upper volume, cantilevered -->
<rect x="${upX}" y="${upY}" width="${upW}" height="${upH}" fill="${p.volumeAlt}" stroke="${p.line}" stroke-opacity="${p.lineOpacity}" stroke-width="2"/>
<rect x="${upGlassX}" y="${upY + 26}" width="${upGlassW}" height="${upH - 52}" fill="url(#lit)"/>
<g stroke="${p.line}" stroke-opacity="0.35" stroke-width="1.5">${mullions(upGlassX, upY + 26, upGlassW, upH - 52, upGlassW / 4)}</g>
<g stroke="${p.line}" stroke-opacity="0.32" stroke-width="2">${slats}</g>

<!-- slabs -->
<rect x="${upX - 36}" y="${upY - 16}" width="${upW + 72}" height="16" fill="${p.slab}" fill-opacity="0.9"/>
<rect x="${upX - 8}" y="${upY + upH - 2}" width="${upW + 16}" height="12" fill="${p.slab}" fill-opacity="0.7"/>
<rect x="${lowX + lowW * 0.3}" y="${ground - lowH - 2}" width="${lowW * 0.36}" height="9" fill="${p.slab}" fill-opacity="0.8"/>

<!-- drafting guides + dimension ticks -->
<g stroke="${GOLD}" stroke-opacity="0.45" stroke-width="1" stroke-dasharray="6 8">
<path d="M0 ${upY - 16}H${W}"/><path d="M0 ${ground - lowH}H${W}"/>
</g>
<g stroke="${GOLD}" stroke-opacity="0.6" stroke-width="1.5">
<path d="M${lowX} ${ground + 56}H${lowX + lowW}"/>
<path d="M${lowX} ${ground + 46}V${ground + 66}"/><path d="M${lowX + lowW} ${ground + 46}V${ground + 66}"/>
<path d="M${lowX - 56} ${upY - 16}V${ground}"/>
<path d="M${lowX - 66} ${upY - 16}H${lowX - 46}"/><path d="M${lowX - 66} ${ground}H${lowX - 46}"/>
</g>`;
  // Optional enlargement anchored on the ground line (used for the hero and
  // closing-CTA artwork so the building is bolder and offset clear of the headline).
  const scale = opts.scale ?? 1;
  const shiftX = opts.shiftX ?? 0;
  const placed =
    scale === 1 && shiftX === 0
      ? body
      : `<g transform="translate(${W / 2 + shiftX} ${ground}) scale(${scale}) translate(${-W / 2} ${-ground})">${body}</g>`;
  return frame(p, placed);
}

/** A multi-storey commercial frame. */
function commercial(seed, tone = "dark") {
  const p = palettes[tone];
  const r = rng(seed);
  const ground = 720;
  const floors = int(r, 5, 7);
  const bays = int(r, 6, 8);
  const bayW = 96;
  const floorH = 82;
  const totalW = bays * bayW;
  const x0 = 800 - totalW / 2;
  const top = ground - floors * floorH - 60;

  let cells = "";
  for (let f = 0; f < floors; f += 1) {
    for (let b = 0; b < bays; b += 1) {
      const lit = r() > 0.55;
      cells += `<rect x="${x0 + b * bayW + 8}" y="${ground - (f + 1) * floorH - 60 + 10}" width="${bayW - 16}" height="${floorH - 20}" fill="${lit ? "url(#lit)" : p.volumeAlt}" stroke="${p.line}" stroke-opacity="0.22" stroke-width="1"/>`;
    }
  }
  const columns = Array.from({ length: bays + 1 }, (_, i) => `<path d="M${x0 + i * bayW} ${top}V${ground}"/>`).join("");
  const slabs = Array.from({ length: floors + 1 }, (_, i) => `<path d="M${x0 - 12} ${ground - i * floorH - 60}H${x0 + totalW + 12}"/>`).join("");

  const body = `
<ellipse cx="800" cy="${ground}" rx="780" ry="190" fill="url(#glow)"/>
<rect x="0" y="${ground}" width="${W}" height="${H - ground}" fill="${p.ground}"/>
<path d="M0 ${ground}H${W}" stroke="${p.line}" stroke-opacity="${p.lineOpacity}" stroke-width="2"/>
<rect x="${x0 - 40}" y="${ground - 60}" width="${totalW + 80}" height="60" fill="${p.volume}" stroke="${p.line}" stroke-opacity="${p.lineOpacity}" stroke-width="2"/>
<rect x="${x0 + bayW}" y="${ground - 52}" width="${bayW * 2}" height="52" fill="url(#lit)"/>
<rect x="${x0}" y="${top}" width="${totalW}" height="${ground - 60 - top}" fill="${p.volume}" stroke="${p.line}" stroke-opacity="${p.lineOpacity}" stroke-width="2"/>
${cells}
<g stroke="${p.line}" stroke-opacity="0.5" stroke-width="2">${columns}</g>
<g stroke="${p.line}" stroke-opacity="0.65" stroke-width="3">${slabs}</g>
<rect x="${x0 + totalW * 0.58}" y="${top - 42}" width="${totalW * 0.28}" height="42" fill="${p.volumeAlt}" stroke="${p.line}" stroke-opacity="${p.lineOpacity}" stroke-width="2"/>
<g stroke="${GOLD}" stroke-opacity="0.45" stroke-width="1" stroke-dasharray="6 8"><path d="M0 ${top}H${W}"/><path d="M0 ${ground - 60}H${W}"/></g>
<g stroke="${GOLD}" stroke-opacity="0.6" stroke-width="1.5"><path d="M${x0 + totalW + 70} ${top}V${ground}"/><path d="M${x0 + totalW + 60} ${top}H${x0 + totalW + 80}"/><path d="M${x0 + totalW + 60} ${ground}H${x0 + totalW + 80}"/></g>`;
  return frame(p, body);
}

/** A floor plan with walls, doors and furniture. */
function plan(seed, tone = "light") {
  const p = palettes[tone];
  const r = rng(seed);
  const x0 = 330;
  const y0 = 150;
  const pw = 940;
  const ph = 600;

  const rooms = [];
  (function split(x, y, w, h, depth) {
    const canV = w > 300;
    const canH = h > 260;
    if (depth > 3 || (!canV && !canH) || (depth > 1 && r() < 0.28)) {
      rooms.push({ x, y, w, h });
      return;
    }
    const vertical = canV && (!canH || w / h > 1 + (r() - 0.5) * 0.4);
    if (vertical) {
      const s = between(r, 0.38, 0.62) * w;
      split(x, y, s, h, depth + 1);
      split(x + s, y, w - s, h, depth + 1);
    } else {
      const s = between(r, 0.4, 0.6) * h;
      split(x, y, w, s, depth + 1);
      split(x, y + s, w, h - s, depth + 1);
    }
  })(x0, y0, pw, ph, 0);

  const lineC = p.line;
  let furniture = "";
  let doors = "";
  rooms.forEach((room, i) => {
    const kind = i % 4;
    const cxr = room.x + room.w / 2;
    const cyr = room.y + room.h / 2;
    if (kind === 0) {
      furniture += `<rect x="${cxr - 70}" y="${cyr - 52}" width="140" height="104" rx="4" fill="none" stroke="${lineC}" stroke-opacity="0.4" stroke-width="2"/><rect x="${cxr - 62}" y="${cyr - 44}" width="52" height="32" rx="6" fill="none" stroke="${lineC}" stroke-opacity="0.35" stroke-width="1.5"/><rect x="${cxr + 8}" y="${cyr - 44}" width="52" height="32" rx="6" fill="none" stroke="${lineC}" stroke-opacity="0.35" stroke-width="1.5"/>`;
    } else if (kind === 1) {
      furniture += `<rect x="${cxr - 90}" y="${cyr - 28}" width="180" height="56" rx="14" fill="none" stroke="${lineC}" stroke-opacity="0.4" stroke-width="2"/><rect x="${cxr - 36}" y="${cyr + 52}" width="72" height="34" rx="3" fill="none" stroke="${lineC}" stroke-opacity="0.3" stroke-width="1.5"/>`;
    } else if (kind === 2) {
      furniture += `<circle cx="${cxr}" cy="${cyr}" r="44" fill="none" stroke="${lineC}" stroke-opacity="0.4" stroke-width="2"/>${[0, 90, 180, 270].map((a) => `<circle cx="${cxr + Math.cos((a * Math.PI) / 180) * 66}" cy="${cyr + Math.sin((a * Math.PI) / 180) * 66}" r="13" fill="none" stroke="${lineC}" stroke-opacity="0.3" stroke-width="1.5"/>`).join("")}`;
    } else {
      furniture += `<rect x="${room.x + 24}" y="${room.y + 24}" width="${Math.min(150, room.w - 48)}" height="34" fill="none" stroke="${lineC}" stroke-opacity="0.35" stroke-width="2"/><rect x="${room.x + 24}" y="${room.y + 58}" width="34" height="${Math.min(96, room.h - 82)}" fill="none" stroke="${lineC}" stroke-opacity="0.35" stroke-width="2"/>`;
    }
    const doorX = room.x + room.w * 0.3;
    doors += `<rect x="${doorX}" y="${room.y + room.h - 5}" width="66" height="10" fill="${p.skyBottom}"/><path d="M${doorX} ${room.y + room.h}a66 66 0 0 1 66 -66" fill="none" stroke="${GOLD}" stroke-opacity="0.7" stroke-width="1.5"/><path d="M${doorX} ${room.y + room.h}v-66" stroke="${GOLD}" stroke-opacity="0.7" stroke-width="1.5"/>`;
  });

  const walls = rooms.map((room) => `<rect x="${room.x}" y="${room.y}" width="${room.w}" height="${room.h}" fill="none"/>`).join("");
  const dims = `<g stroke="${GOLD}" stroke-opacity="0.65" stroke-width="1.5"><path d="M${x0} ${y0 - 40}H${x0 + pw}"/><path d="M${x0} ${y0 - 50}V${y0 - 30}"/><path d="M${x0 + pw} ${y0 - 50}V${y0 - 30}"/><path d="M${x0 - 46} ${y0}V${y0 + ph}"/><path d="M${x0 - 56} ${y0}H${x0 - 36}"/><path d="M${x0 - 56} ${y0 + ph}H${x0 - 36}"/></g>`;

  const body = `
<rect x="${x0}" y="${y0}" width="${pw}" height="${ph}" fill="${p.volume}" fill-opacity="0.8"/>
<g stroke="${p.line}" stroke-opacity="${p.lineOpacity}" stroke-width="7" stroke-linejoin="miter">${walls}</g>
<rect x="${x0}" y="${y0}" width="${pw}" height="${ph}" fill="none" stroke="${p.line}" stroke-opacity="0.8" stroke-width="13"/>
${doors}
${furniture}
${dims}`;
  return frame(p, body);
}

const files = {
  "hero.svg": elevation(4, "dark", { ground: 730, scale: 1.2, shiftX: 120 }),
  "cta.svg": elevation(17, "dark", { ground: 730, scale: 1.15, shiftX: 100 }),
  "why.svg": elevation(23, "light", { ground: 700 }),
  "service-residential.svg": elevation(3, "light"),
  "service-commercial.svg": commercial(8, "dark"),
  "service-interior.svg": plan(12, "light"),
  "service-renovation.svg": elevation(31, "light", { ground: 700 }),
  "service-turnkey.svg": elevation(9, "dark"),
  "service-architecture.svg": plan(5, "dark"),
  "project-residential-cover.svg": elevation(41, "dark"),
  "project-residential-2.svg": plan(42, "light"),
  "project-residential-3.svg": elevation(43, "light"),
  "project-commercial-cover.svg": commercial(51, "light"),
  "project-commercial-2.svg": commercial(52, "dark"),
  "project-commercial-3.svg": plan(53, "dark"),
  "project-interior-cover.svg": plan(61, "light"),
  "project-interior-2.svg": plan(62, "dark"),
  "project-interior-3.svg": plan(63, "light"),
  "project-renovation-before.svg": elevation(71, "muted"),
  "project-renovation-after.svg": elevation(71, "light"),
  "project-renovation-cover.svg": elevation(71, "light"),
  "project-renovation-2.svg": plan(72, "light"),
  "blog-1.svg": elevation(81, "light"),
  "blog-2.svg": plan(82, "dark"),
  "blog-3.svg": elevation(83, "dark"),
};

for (const [name, svg] of Object.entries(files)) {
  writeFileSync(join(OUT, name), svg);
}
console.log(`Wrote ${Object.keys(files).length} placeholder images to ${OUT}`);
