import { months } from "./data.js";
import { state, viewDashboard, viewBudget, viewTransactions, viewGoals, viewBills, viewReports } from "./views.js";

const view = document.getElementById("view");
const title = document.getElementById("pagetitle");
const sub = document.getElementById("pagesub");
const sel = document.getElementById("monthSelect");
const navLinks = [...document.querySelectorAll("#nav a")];

sel.innerHTML = Object.entries(months).map(([k, v]) => `<option value="${k}">${v.label}</option>`).join("");
sel.value = state.month;

const routes = {
  dashboard: { t: "Dashboard", s: "The month at a glance for the Hartley household", f: () => viewDashboard(months) },
  budget: { t: "Budget", s: "Planned versus spent, category by category", f: () => viewBudget(months) },
  transactions: { t: "Transactions", s: "Every payment in and out — filter, search, add", f: () => viewTransactions() },
  goals: { t: "Savings goals", s: "Jars filling toward the things that matter", f: () => viewGoals() },
  bills: { t: "Bills", s: "What's due, when, and what's already paid", f: () => viewBills() },
  reports: { t: "Reports", s: "Six months of income, spending and plain-English insights", f: () => viewReports(months) },
};

function route() {
  const key = (location.hash.replace("#", "") || "dashboard");
  const r = routes[key] || routes.dashboard;
  title.textContent = r.t;
  sub.textContent = r.s;
  view.innerHTML = r.f();
  navLinks.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + key));
  wire(key);
}

function wire(key) {
  if (key === "transactions") {
    document.getElementById("txFilter")?.addEventListener("change", e => { state.txFilter = e.target.value; route(); });
    const search = document.getElementById("txSearch");
    search?.addEventListener("input", e => {
      state.txSearch = e.target.value;
      const pos = search.selectionStart;
      route();
      const again = document.getElementById("txSearch");
      again?.focus(); again?.setSelectionRange(pos, pos);
    });
    document.getElementById("addTx")?.addEventListener("submit", e => {
      e.preventDefault();
      const fd = new FormData(e.target);
      state.extraTx.unshift({ date: fd.get("date"), payee: fd.get("payee"), cat: fd.get("cat"), amount: Number(fd.get("amount")) });
      route();
    });
  }
  if (key === "bills") {
    document.querySelectorAll(".billtoggle").forEach(btn => btn.addEventListener("click", () => {
      const name = btn.dataset.bill;
      state.paid.has(name) ? state.paid.delete(name) : state.paid.add(name);
      route();
    }));
  }
}

sel.addEventListener("change", () => { state.month = sel.value; route(); });
window.addEventListener("hashchange", route);
route();
