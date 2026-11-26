export const household = { name: "The Hartleys", members: "Maya & Tom Hartley + 2 children", city: "Leeds" };

export const months = {
  "2026-09": { label: "September 2026", income: 3850, scale: 0.94 },
  "2026-10": { label: "October 2026", income: 3980, scale: 1.0 },
  "2026-11": { label: "November 2026", income: 4050, scale: 1.03 },
};

export const categories = [
  { id: "groceries", name: "Groceries", planned: 520, spent: 487.35, color: "#2e7d4f" },
  { id: "housing", name: "Housing & rent", planned: 1150, spent: 1150, color: "#1d4d33" },
  { id: "transport", name: "Transport", planned: 210, spent: 246.80, color: "#c47a12" },
  { id: "children", name: "Children & school", planned: 180, spent: 154.20, color: "#7a9e43" },
  { id: "utilities", name: "Utilities", planned: 240, spent: 218.60, color: "#4a7a8a" },
  { id: "dining", name: "Dining & treats", planned: 150, spent: 171.45, color: "#b3362b" },
  { id: "health", name: "Health", planned: 120, spent: 86.00, color: "#6b7fa3" },
  { id: "leisure", name: "Leisure & gifts", planned: 160, spent: 132.90, color: "#e8a63d" },
];

export const transactions = [
  { date: "2026-11-25", payee: "Tesco Extra, Kirkstall", cat: "groceries", amount: -64.18 },
  { date: "2026-11-24", payee: "Northern Trains", cat: "transport", amount: -38.50 },
  { date: "2026-11-23", payee: "Hartley & Co — Tom salary", cat: "income", amount: 2120 },
  { date: "2026-11-22", payee: "Leeds City Council", cat: "utilities", amount: -142.00 },
  { date: "2026-11-21", payee: "Sainsbury's Local", cat: "groceries", amount: -41.27 },
  { date: "2026-11-20", payee: "Maya Hartley — NHS pay", cat: "income", amount: 1930 },
  { date: "2026-11-19", payee: "Boots Pharmacy", cat: "health", amount: -24.99 },
  { date: "2026-11-18", payee: "Landlord — rent", cat: "housing", amount: -1150 },
  { date: "2026-11-17", payee: "School dinner account", cat: "children", amount: -46.00 },
  { date: "2026-11-16", payee: "Shell petrol, A660", cat: "transport", amount: -52.30 },
  { date: "2026-11-15", payee: "Pizza Express, city centre", cat: "dining", amount: -58.75 },
  { date: "2026-11-14", payee: "Aldi, Meanwood", cat: "groceries", amount: -73.40 },
  { date: "2026-11-13", payee: "Octopus Energy", cat: "utilities", amount: -76.60 },
  { date: "2026-11-12", payee: "Waterstones — books", cat: "leisure", amount: -29.98 },
  { date: "2026-11-11", payee: "Kids' football subs", cat: "children", amount: -35.00 },
  { date: "2026-11-10", payee: "Morrisons", cat: "groceries", amount: -55.12 },
  { date: "2026-11-09", payee: "Cinema tickets ×4", cat: "leisure", amount: -42.00 },
  { date: "2026-11-08", payee: "Dentist — check-up", cat: "health", amount: -61.01 },
];

export const goals = [
  { name: "Emergency fund", target: 6000, saved: 4150, monthly: 250, note: "3 months of essentials" },
  { name: "Cornwall holiday 2027", target: 1800, saved: 960, monthly: 140, note: "Cottage + travel, August" },
  { name: "Car replacement", target: 4500, saved: 1320, monthly: 180, note: "Replace the 2016 estate" },
  { name: "Kids' bikes", target: 600, saved: 410, monthly: 65, note: "Two bikes for spring" },
];

export const bills = [
  { name: "Rent — landlord", amount: 1150, due: "2026-12-01", cat: "housing", paid: false },
  { name: "Octopus Energy (elec + gas)", amount: 118.40, due: "2026-12-03", cat: "utilities", paid: false },
  { name: "Council tax — Leeds", amount: 142.00, due: "2026-12-05", cat: "utilities", paid: true },
  { name: "Broadband — Virgin Media", amount: 39.00, due: "2026-12-07", cat: "utilities", paid: false },
  { name: "Mobile phones ×2", amount: 54.00, due: "2026-12-09", cat: "utilities", paid: false },
  { name: "Car insurance (monthly)", amount: 62.75, due: "2026-12-12", cat: "transport", paid: false },
];

export const history = [
  { m: "Jun", income: 3720, spent: 3310 },
  { m: "Jul", income: 3780, spent: 3495 },
  { m: "Aug", income: 3810, spent: 3580 },
  { m: "Sep", income: 3850, spent: 3342 },
  { m: "Oct", income: 3980, spent: 3401 },
  { m: "Nov", income: 4050, spent: 2647 },
];

export const money = (n) => "£" + Math.abs(n).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const catName = (id) => (categories.find(c => c.id === id)?.name) || (id === "income" ? "Income" : id);
