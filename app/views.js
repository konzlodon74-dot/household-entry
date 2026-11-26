import { categories, transactions, goals, bills, history, money, catName } from "./data.js";
import { donut, bars, trendChart, ring } from "./charts.js";

export const state = { month: "2026-11", txFilter: "all", txSearch: "", extraTx: [], paid: new Set(bills.filter(b => b.paid).map(b => b.name)) };

export function scaledCats(months) {
  const s = months[state.month]?.scale ?? 1;
  return categories.map(c => ({ ...c, spent: Math.round(c.spent * s * 100) / 100 }));
}

export function totals(months) {
  const income = months[state.month].income;
  const spent = scaledCats(months).reduce((a, c) => a + c.spent, 0);
  return { income, spent, left: income - spent, rate: ((income - spent) / income) * 100 };
}

export function viewDashboard(months) {
  const t = totals(months), cats = scaledCats(months);
  const recent = [...state.extraTx, ...transactions].slice(0, 6);
  return `<div class="kpis">
    <div class="card"><h3>Income</h3><div class="big">${money(t.income)}</div><p>Two salaries, paid monthly</p></div>
    <div class="card"><h3>Spent so far</h3><div class="big">${money(t.spent)}</div><p>${((t.spent / t.income) * 100).toFixed(0)}% of income</p></div>
    <div class="card"><h3>Left to spend</h3><div class="big">${money(t.left)}</div><p>Before savings transfers</p></div>
    <div class="card"><h3>Savings rate</h3><div class="big">${t.rate.toFixed(1)}%</div><p>Target 20% · on track</p></div></div>
  <div class="grid2">
    <div class="card"><h2>Where the money went</h2>
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center">${donut(cats.map(c => ({ label: c.name, value: c.spent, color: c.color })))}
      <ul style="list-style:none;padding:0;margin:0">${cats.map(c => `<li style="font-size:14px;margin:4px 0"><span style="display:inline-block;width:11px;height:11px;border-radius:3px;background:${c.color};margin-right:6px"></span>${c.name} — ${money(c.spent)}</li>`).join("")}</ul></div></div>
    <div class="card"><h2>Recent transactions</h2><table><thead><tr><th>Date</th><th>Payee</th><th class="num">Amount</th></tr></thead>
      <tbody>${recent.map(x => `<tr><td>${x.date.slice(5)}</td><td>${x.payee}<br><small>${catName(x.cat)}</small></td><td class="num">${x.amount >= 0 ? "+" : "−"}${money(x.amount)}</td></tr>`).join("")}</tbody></table>
      <p><a href="#transactions">See all transactions →</a></p></div>
  </div>`;
}

export function viewBudget(months) {
  const cats = scaledCats(months);
  const planned = cats.reduce((a, c) => a + c.planned, 0), spent = cats.reduce((a, c) => a + c.spent, 0);
  return `<div class="card"><h2>Planned vs spent — ${months[state.month].label}</h2>
    <p>Total plan ${money(planned)} · spent ${money(spent)} · ${spent <= planned ? money(planned - spent) + " under plan" : money(spent - planned) + " over plan"}. Two categories are over: transport and dining.</p>
    ${bars(cats)}
    <table><thead><tr><th>Category</th><th class="num">Planned</th><th class="num">Spent</th><th class="num">Difference</th></tr></thead>
    <tbody>${cats.map(c => `<tr><td>${c.name}</td><td class="num">${money(c.planned)}</td><td class="num">${money(c.spent)}</td><td class="num">${c.spent > c.planned ? "−" + money(c.spent - c.planned) : "+" + money(c.planned - c.spent)}</td></tr>`).join("")}</tbody></table></div>`;
}

export function viewTransactions() {
  const all = [...state.extraTx, ...transactions];
  const q = state.txSearch.toLowerCase();
  const rows = all.filter(x => (state.txFilter === "all" || x.cat === state.txFilter) && (x.payee.toLowerCase().includes(q) || catName(x.cat).toLowerCase().includes(q)));
  const opts = ["all", ...categories.map(c => c.id), "income"];
  return `<div class="card"><h2>Transactions</h2>
    <div class="toolbar"><select id="txFilter" aria-label="Filter by category">${opts.map(o => `<option value="${o}" ${state.txFilter === o ? "selected" : ""}>${o === "all" ? "All categories" : catName(o)}</option>`).join("")}</select>
    <input type="search" id="txSearch" placeholder="Search payee or category…" value="${state.txSearch}" aria-label="Search transactions"></div>
    <p>${rows.length} of ${all.length} transactions · net ${money(rows.reduce((a, x) => a + x.amount, 0))}</p>
    <table><thead><tr><th>Date</th><th>Payee</th><th>Category</th><th class="num">Amount</th></tr></thead>
    <tbody>${rows.map(x => `<tr><td>${x.date}</td><td>${x.payee}</td><td>${catName(x.cat)}</td><td class="num">${x.amount >= 0 ? "+" : "−"}${money(x.amount)}</td></tr>`).join("") || '<tr><td colspan="4">No matches — try another search.</td></tr>'}</tbody></table>
    <h3>Add a transaction</h3>
    <form class="addtx" id="addTx">
      <input required name="payee" placeholder="Payee" aria-label="Payee">
      <input required name="amount" type="number" step="0.01" placeholder="Amount (use − for spending)" aria-label="Amount">
      <input required name="date" type="date" value="2026-11-26" aria-label="Date">
      <select name="cat" aria-label="Category">${categories.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}<option value="income">Income</option></select>
      <button type="submit">Add</button>
    </form></div>`;
}

export function viewGoals() {
  return `<div class="grid2">${goals.map(g => {
    const pct = Math.round((g.saved / g.target) * 100);
    const monthsLeft = Math.ceil((g.target - g.saved) / g.monthly);
    return `<div class="card"><div class="jar">${ring(pct, "#2e7d4f")}<div><h2 style="margin:0">${g.name}</h2>
      <p>${money(g.saved)} of ${money(g.target)} · ${g.note}</p>
      <p>At ${money(g.monthly)}/month: <strong>${monthsLeft} months to go</strong> (${money(g.target - g.saved)} remaining)</p></div></div></div>`;
  }).join("")}</div>
  <div class="card" style="margin-top:14px"><h2>Savings summary</h2>
  <p>Total saved ${money(goals.reduce((a, g) => a + g.saved, 0))} toward ${money(goals.reduce((a, g) => a + g.target, 0))} across ${goals.length} goals. Monthly contributions total ${money(goals.reduce((a, g) => a + g.monthly, 0))}.</p></div>`;
}

export function viewBills() {
  const today = new Date("2026-11-26T00:00:00");
  const rows = bills.map(b => {
    const due = new Date(b.due + "T00:00:00");
    const days = Math.round((due - today) / 86400000);
    const paid = state.paid.has(b.name);
    return { ...b, days, paid };
  }).sort((a, b) => a.days - b.days);
  const dueTotal = rows.filter(r => !r.paid).reduce((a, r) => a + r.amount, 0);
  return `<div class="card"><h2>Upcoming bills</h2><p>${money(dueTotal)} still to pay before 12 December. Tick a bill when it leaves the account.</p>
    <table><thead><tr><th>Bill</th><th>Due</th><th class="num">Amount</th><th>Status</th></tr></thead>
    <tbody>${rows.map(r => `<tr><td><strong>${r.name}</strong><br><small>${catName(r.cat)}</small></td>
      <td>${r.due}<br><span class="tag ${r.paid ? "" : r.days <= 7 ? "warn" : ""}">${r.paid ? "paid" : "in " + r.days + " days"}</span></td>
      <td class="num">${money(r.amount)}</td>
      <td><button class="ghost billtoggle" data-bill="${r.name}">${r.paid ? "Mark unpaid" : "Mark paid"}</button></td></tr>`).join("")}</tbody></table></div>`;
}

export function viewReports(months) {
  const cats = scaledCats(months);
  const avgSave = history.reduce((a, h) => a + (h.income - h.spent), 0) / history.length;
  const top = [...cats].sort((a, b) => b.spent - a.spent)[0];
  return `<div class="card"><h2>Six-month trend</h2>${trendChart(history)}
    <p>Average monthly saving over six months: <strong>${money(avgSave)}</strong>. Income rose from £3,720 (June) to £4,050 (November); spending peaked in August at £3,580 (school holidays).</p></div>
  <div class="grid2" style="margin-top:14px">
    <div class="card"><h2>Category table — ${months[state.month].label}</h2>
      <table><thead><tr><th>Category</th><th class="num">Spent</th><th class="num">Share</th></tr></thead>
      <tbody>${cats.map(c => `<tr><td>${c.name}</td><td class="num">${money(c.spent)}</td><td class="num">${((c.spent / cats.reduce((a, x) => a + x.spent, 0)) * 100).toFixed(1)}%</td></tr>`).join("")}</tbody></table></div>
    <div class="card"><h2>Insights</h2>
      <p>• Biggest cost is <strong>${top.name}</strong> at ${money(top.spent)} — rent is fixed, so the lever is elsewhere.</p>
      <p>• Transport is £36.80 over its £210 plan (two train fares + petrol); dining is £21.45 over. Together they explain the month's overspend.</p>
      <p>• Groceries came in £32.65 under plan — the switch to Aldi for the big shop saved roughly £18/week.</p>
      <p>• At the current savings rate the emergency fund reaches £6,000 in about 8 months.</p></div>
  </div>`;
}
