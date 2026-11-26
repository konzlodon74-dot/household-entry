# The Hartley Ledger — Household Budget Site

[![rank](https://make.fun/badge/best-household-budget-site-20261126-1457.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457)
[![rank](https://make.fun/badge/best-household-budget-site-20261126-1457/konzlodon74-dot/household-entry/rank.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457)
[![reward](https://make.fun/badge/best-household-budget-site-20261126-1457/konzlodon74-dot/household-entry/reward.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457)

Bounty: https://make.fun/bounty/best-household-budget-site-20261126-1457

A complete household budget website for the fictional Hartley family of Leeds,
styled as a warm paper ledger with a deep-green and amber palette. Six linked
pages, all figures real and every control working:

- **Dashboard** — income, spent, left-to-spend and savings-rate cards, a
  month selector that re-computes every figure, a hand-drawn SVG spending
  donut and recent transactions.
- **Budget** — planned vs spent bars for 8 categories with over/under tags
  and a full difference table.
- **Transactions** — 18 dated transactions with category filter, live search,
  and an add-transaction form that updates the list and totals.
- **Savings goals** — four jars with progress rings and months-to-go maths.
- **Bills** — upcoming bills with due-in days and paid/unpaid toggles.
- **Reports** — six-month income/spending trend chart, category share table
  and specific written insights.

The layout is responsive down to a 390px phone, loads no external resources,
and splits source into single-job files: `data.js` (figures), `charts.js`
(SVG builders), `views.js` (pages), `main.js` (router + wiring).

## Run it

```bash
node serve.ts            # serves app/ at http://localhost:8080
node main.ts             # builds the make.fun dossier into /output (or $MAKEFUN_OUTPUT_DIR)
```

No dependencies — Node 22 standard library only, works fully offline.
