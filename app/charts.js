export function donut(parts, size = 200) {
  const total = parts.reduce((s, p) => s + p.value, 0) || 1;
  const r = 78, c = 2 * Math.PI * r;
  let off = 0;
  const segs = parts.map(p => {
    const len = (p.value / total) * c;
    const el = `<circle cx="100" cy="100" r="${r}" fill="none" stroke="${p.color}" stroke-width="26"
      stroke-dasharray="${len.toFixed(1)} ${(c - len).toFixed(1)}" stroke-dashoffset="${(-off).toFixed(1)}"
      transform="rotate(-90 100 100)"><title>${p.label}: £${p.value.toFixed(2)}</title></circle>`;
    off += len;
    return el;
  }).join("");
  return `<svg viewBox="0 0 200 200" width="${size}" height="${size}" role="img" aria-label="Spending by category">${segs}
    <text x="100" y="96" text-anchor="middle" font-size="15" fill="#1e2b22" font-weight="700">£${total.toFixed(0)}</text>
    <text x="100" y="114" text-anchor="middle" font-size="11" fill="#6b6a5e">spent</text></svg>`;
}

export function bars(rows) {
  const max = Math.max(...rows.map(r => Math.max(r.planned, r.spent)), 1);
  return rows.map(r => {
    const pct = Math.min(100, (r.spent / r.planned) * 100);
    const over = r.spent > r.planned;
    return `<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;font-size:14px">
      <strong>${r.name}</strong><span>£${r.spent.toFixed(2)} of £${r.planned.toFixed(0)}
      ${over ? '<span class="tag bad">over by £' + (r.spent - r.planned).toFixed(2) + '</span>' : '<span class="tag">£' + (r.planned - r.spent).toFixed(2) + ' left</span>'}</span></div>
      <div class="bar${over ? ' over' : ''}"><i style="width:${pct.toFixed(1)}%"></i></div></div>`;
  }).join("");
}

export function trendChart(history) {
  const W = 640, H = 240, pad = 36;
  const max = Math.max(...history.map(h => Math.max(h.income, h.spent))) * 1.1;
  const x = (i) => pad + (i * (W - pad * 2)) / (history.length - 1);
  const y = (v) => H - pad - (v / max) * (H - pad * 2);
  const line = (key, color) => {
    const pts = history.map((h, i) => `${x(i).toFixed(1)},${y(h[key]).toFixed(1)}`).join(" ");
    const dots = history.map((h, i) => `<circle cx="${x(i)}" cy="${y(h[key])}" r="3.5" fill="${color}"><title>${h.m}: £${h[key]}</title></circle>`).join("");
    return `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5"/>${dots}`;
  };
  const labels = history.map((h, i) => `<text x="${x(i)}" y="${H - 12}" text-anchor="middle" font-size="12" fill="#6b6a5e">${h.m}</text>`).join("");
  const grid = [0, 0.5, 1].map(f => {
    const v = max * f, yy = y(v);
    return `<line x1="${pad}" x2="${W - pad}" y1="${yy}" y2="${yy}" stroke="#d9cfb4" stroke-dasharray="3 3"/>
      <text x="${pad - 6}" y="${yy + 4}" text-anchor="end" font-size="11" fill="#6b6a5e">£${Math.round(v)}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Six month income and spending trend">${grid}
    ${line("income", "#2e7d4f")}${line("spent", "#c47a12")}${labels}
    <text x="${W - pad}" y="18" text-anchor="end" font-size="12" fill="#2e7d4f">— income</text>
    <text x="${W - pad}" y="34" text-anchor="end" font-size="12" fill="#c47a12">— spent</text></svg>`;
}

export function ring(pct, color) {
  const r = 34, c = 2 * Math.PI * r, len = (pct / 100) * c;
  return `<svg class="ring" viewBox="0 0 84 84" role="img" aria-label="${pct}% saved">
    <circle cx="42" cy="42" r="${r}" fill="none" stroke="#ece2c8" stroke-width="9"/>
    <circle cx="42" cy="42" r="${r}" fill="none" stroke="${color}" stroke-width="9"
      stroke-dasharray="${len.toFixed(1)} ${(c - len).toFixed(1)}" transform="rotate(-90 42 42)" stroke-linecap="round"/>
    <text x="42" y="47" text-anchor="middle" font-size="15" font-weight="700" fill="#1e2b22">${pct}%</text></svg>`;
}
