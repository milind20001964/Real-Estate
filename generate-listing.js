const fs = require('fs')
const path = require('path')

const repoRoot = path.join(__dirname, '..')
const dataFile = path.join(repoRoot, 'server', 'data', 'properties.json')
const outFile = path.join(repoRoot, 'client', 'listing.html')

function safe(v){ return v==null?'':v }

const properties = JSON.parse(fs.readFileSync(dataFile, 'utf8'))

const head = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>RealEstate — Listings</title>
  <link rel="stylesheet" href="./src/styles.css">
  <style>
    body { background: var(--bg); }
    .page { max-width:1100px; margin: 28px auto; padding: 0 16px; }
    .header-static { display:flex; align-items:center; justify-content:space-between; margin-bottom:18px }
    .header-static h1 { margin:0; font-size:22px }
    .controls { margin-bottom:18px; display:flex; gap:12px; align-items:center }
    .searchbar input{ width: 100%; padding:10px 12px }
    .filters select, .filters input{ padding:8px;border-radius:6px }
    .card .thumb{ height:160px }
  </style>
</head>
<body>
  <div class="page">
    <div class="header-static">
      <h1>RealEstate</h1>
      <nav>
        <a href="#" class="btn">Sign in</a>
      </nav>
    </div>

    <div class="controls">
      <div class="searchbar" style="flex:1">
        <input type="search" placeholder="Search by city, street, or title">
      </div>
      <div class="filters">
        <select aria-label="Sort">
          <option>Newest</option>
          <option>Price: Low → High</option>
          <option>Price: High → Low</option>
        </select>
      </div>
    </div>

    <div class="grid">
`

const foot = `
    </div>

    <div style="margin-top:18px; text-align:center; color:var(--muted)">Pagination • Page 1</div>
  </div>
</body>
</html>`

const items = properties.map(p => {
  return `      <div class="card">
        <div class="thumb-wrap">
          <img class="thumb" src="${safe(p.thumbnail)}" alt="${safe(p.title)}">
          <div class="price-badge">$${Number(p.price).toLocaleString()}</div>
        </div>
        <div class="card-body">
          <h3>${safe(p.title)}</h3>
          <p class="location">${safe(p.location)}</p>
          <p class="meta">${safe(p.bedrooms)} bd • ${safe(p.bathrooms)} ba • ${safe(p.area)} sqft</p>
          <div class="card-actions">
            <a class="btn" href="/property/${p.id}">View details</a>
            <a class="btn ghost" href="mailto:info@example.com?subject=Inquiry%20about%20${encodeURIComponent(safe(p.title))}">Contact</a>
          </div>
        </div>
      </div>`
}).join('\n')

const out = head + items + foot

fs.writeFileSync(outFile, out, 'utf8')
console.log('Generated', outFile)
