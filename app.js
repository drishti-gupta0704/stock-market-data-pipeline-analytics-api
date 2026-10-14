// Change this to your local API URL (e.g. http://localhost:5000) if running locally.
const API_BASE = "https://stock-market-data-pipeline-analytics-api.onrender.com";
const $ = (id) => document.getElementById(id);
let currentSymbol = 'AAPL';
let resizeTimer;

async function api(path) {
  const response = await fetch(`${API_BASE}${path}`);
  const type = response.headers.get('content-type') || '';
  const body = type.includes('application/json') ? await response.json() : await response.text();
  if (!response.ok) throw new Error(body?.message || `Request failed (${response.status})`);
  return body;
}
function money(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—';
}
function number(value, digits = 2) {
  const n = Number(value);
  return Number.isFinite(n) ? n.toFixed(digits) : '—';
}
function timestamp(value) {
  if (!value) return '—';
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? String(value) : d.toLocaleString();
}
function setMessage(text, kind = '') {
  $('message').textContent = text;
  $('message').className = `message ${kind}`;
}
function changeClass(el, value) {
  el.classList.remove('positive', 'negative');
  const n = Number(value);
  if (Number.isFinite(n)) el.classList.add(n >= 0 ? 'positive' : 'negative');
}
async function loadStock(symbol) {
  currentSymbol = symbol.trim().toUpperCase();
  if (!/^[A-Z0-9.^_-]{1,10}$/.test(currentSymbol)) {
    setMessage('Enter a valid stock ticker symbol, for example AAPL or MSFT.', 'error');
    return;
  }
  $('symbolInput').value = currentSymbol;
  $('selectedSymbol').textContent = currentSymbol;
  $('chartSubtitle').textContent = `Recent stored prices for ${currentSymbol}`;
  $('exportOne').href = `${API_BASE}/export/csv/${encodeURIComponent(currentSymbol)}`;
  setMessage(`Loading ${currentSymbol} data…`);
  try {
    const result = await api(`/stocks/${encodeURIComponent(currentSymbol)}`);
    const stock = result.data || {};
    $('latestPrice').textContent = money(stock.price);
    $('priceChange').textContent = `${Number(stock.price_change) > 0 ? '+' : ''}${number(stock.price_change)}`;
    $('percentChange').textContent = `${Number(stock.percentage_change) > 0 ? '+' : ''}${number(stock.percentage_change)}%`;
    $('priceTimestamp').textContent = `Updated ${timestamp(stock.timestamp)}`;
    $('detailSymbol').textContent = stock.symbol || currentSymbol;
    $('detailPrice').textContent = money(stock.price);
    $('detailChange').textContent = number(stock.price_change);
    $('detailPercent').textContent = `${number(stock.percentage_change)}%`;
    $('detailTimestamp').textContent = timestamp(stock.timestamp);
    changeClass($('priceChange'), stock.price_change);
    changeClass($('percentChange'), stock.percentage_change);
    const source = result.source ? ` Data source: ${result.source}.` : '';
    setMessage(`${currentSymbol} loaded successfully.${source}`, 'success');
    await loadHistory(currentSymbol);
  } catch (error) {
    setMessage(`Could not load ${currentSymbol}: ${error.message}. Check the API URL or try again shortly.`, 'error');
    $('latestPrice').textContent = '—'; $('priceChange').textContent = '—'; $('percentChange').textContent = '—';
    $('detailSymbol').textContent = currentSymbol;
    $('detailPrice').textContent = '—'; $('detailChange').textContent = '—'; $('detailPercent').textContent = '—'; $('detailTimestamp').textContent = '—';
    drawChart([]);
  }
}
async function loadHistory(symbol) {
  try {
    const result = await api(`/stocks/history/${encodeURIComponent(symbol)}`);
    const records = Array.isArray(result.data) ? result.data : [];
    $('recordCount').textContent = `${records.length} record${records.length === 1 ? '' : 's'}`;
    drawChart(records.slice().reverse());
  } catch (error) {
    drawChart([]);
    setMessage(`Stock loaded, but history could not be fetched: ${error.message}`, 'error');
  }
}
async function loadMovers() {
  const endpoints = [
    { path: '/analytics/top-gainers', target: 'gainersBody', positive: true },
    { path: '/analytics/top-losers', target: 'losersBody', positive: false }
  ];
  await Promise.all(endpoints.map(async ({ path, target, positive }) => {
    const tbody = $(target);
    try {
      const result = await api(path);
      const rows = Array.isArray(result.data) ? result.data : result.data ? [result.data] : [];
      tbody.replaceChildren();
      if (!rows.length) { tbody.innerHTML = '<tr><td colspan="3" class="table-empty">No data available</td></tr>'; return; }
      rows.forEach(stock => {
        const tr = document.createElement('tr');
        const symbol = document.createElement('td'); symbol.textContent = stock.symbol || '—';
        const price = document.createElement('td'); price.textContent = money(stock.price);
        const change = document.createElement('td');
        const value = Number(stock.percentage_change);
        change.textContent = `${value > 0 ? '+' : ''}${number(value)}%`;
        change.className = Number.isFinite(value) ? (value >= 0 ? 'positive' : 'negative') : '';
        tr.append(symbol, price, change); tbody.appendChild(tr);
      });
    } catch (error) {
      tbody.innerHTML = `<tr><td colspan="3" class="table-empty">Could not load data</td></tr>`;
    }
  }));
}
function drawChart(records) {
  const canvas = $('priceChart');
  const wrap = canvas.parentElement;
  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(280, wrap.clientWidth);
  const height = Math.max(170, wrap.clientHeight);
  canvas.width = width * dpr; canvas.height = height * dpr;
  const ctx = canvas.getContext('2d'); ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, width, height);
  const points = records.map(r => ({ price: Number(r.price), time: r.timestamp })).filter(p => Number.isFinite(p.price));
  $('chartEmpty').style.display = points.length ? 'none' : 'grid';
  if (!points.length) return;
  const pad = { top: 14, right: 13, bottom: 27, left: 48 };
  const plotW = width - pad.left - pad.right, plotH = height - pad.top - pad.bottom;
  let min = Math.min(...points.map(p => p.price)), max = Math.max(...points.map(p => p.price));
  if (min === max) { min -= Math.max(1, min * .02); max += Math.max(1, max * .02); }
  const range = max - min; min -= range * .08; max += range * .08;
  const x = i => pad.left + (points.length === 1 ? plotW / 2 : i * plotW / (points.length - 1));
  const y = p => pad.top + (max - p) / (max - min) * plotH;
  ctx.font = '10px DM Sans, sans-serif'; ctx.fillStyle = '#98a2b3'; ctx.strokeStyle = '#edf0f6'; ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const val = max - (max - min) * i / 4, yy = pad.top + plotH * i / 4;
    ctx.beginPath(); ctx.moveTo(pad.left, yy); ctx.lineTo(width - pad.right, yy); ctx.stroke();
    ctx.textAlign = 'right'; ctx.fillText(`$${val.toFixed(2)}`, pad.left - 8, yy + 3);
  }
  const gradient = ctx.createLinearGradient(0, pad.top, 0, pad.top + plotH);
  gradient.addColorStop(0, 'rgba(76,111,232,.22)'); gradient.addColorStop(1, 'rgba(76,111,232,0)');
  ctx.beginPath(); points.forEach((p, i) => i ? ctx.lineTo(x(i), y(p.price)) : ctx.moveTo(x(i), y(p.price)));
  ctx.lineTo(x(points.length - 1), pad.top + plotH); ctx.lineTo(x(0), pad.top + plotH); ctx.closePath(); ctx.fillStyle = gradient; ctx.fill();
  ctx.beginPath(); points.forEach((p, i) => i ? ctx.lineTo(x(i), y(p.price)) : ctx.moveTo(x(i), y(p.price)));
  ctx.strokeStyle = '#5275e8'; ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke();
  const last = points[points.length - 1]; ctx.beginPath(); ctx.arc(x(points.length - 1), y(last.price), 4, 0, Math.PI * 2); ctx.fillStyle = '#5275e8'; ctx.fill();
  ctx.fillStyle = '#98a2b3'; ctx.textAlign = 'left'; ctx.fillText(points[0].time ? new Date(points[0].time).toLocaleDateString() : 'Oldest', pad.left, height - 7);
  ctx.textAlign = 'right'; ctx.fillText(last.time ? new Date(last.time).toLocaleDateString() : 'Latest', width - pad.right, height - 7);
}
async function refreshAll() {
  $('connectionText').textContent = 'Checking API…';
  $('refreshBtn').disabled = true;
  try {
    await api('/');
    $('connectionText').textContent = 'API reachable';
    document.querySelector('.status').classList.remove('offline');
  } catch {
    $('connectionText').textContent = 'API unavailable';
    document.querySelector('.status').classList.add('offline');
  }
  await Promise.all([loadStock(currentSymbol), loadMovers()]);
  $('refreshBtn').disabled = false;
}
$('searchForm').addEventListener('submit', e => { e.preventDefault(); loadStock($('symbolInput').value); });
$('refreshBtn').addEventListener('click', refreshAll);
$('exportAll').href = `${API_BASE}/export/csv`;
window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => loadHistory(currentSymbol), 180); });
refreshAll();
