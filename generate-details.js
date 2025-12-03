const fs = require('fs')
const path = require('path')

const repoRoot = path.join(__dirname, '..')
const dataFile = path.join(repoRoot, 'server', 'data', 'properties.json')
const outDir = path.join(repoRoot, 'client')

function safe(v){ return v==null?'':v }

const properties = JSON.parse(fs.readFileSync(dataFile, 'utf8'))

properties.forEach(p => {
  const outFile = path.join(outDir, `property-${p.id}.html`)
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${safe(p.title)} — RealEstate</title>
  <link rel="stylesheet" href="./src/styles.css">
  <style>
    body { background: var(--bg); }
    .page { max-width:1100px; margin: 28px auto; padding: 0 16px; }
    .header-static { display:flex; align-items:center; justify-content:space-between; margin-bottom:18px }
    .header-static h1 { margin:0; font-size:22px }
  </style>
</head>
<body>
  <div class="page">
    <div class="header-static">
      <h1 class="page-title">RealEstate</h1>
      <nav>
        <a href="#" class="btn">Sign in</a>
      </nav>
    </div>

    <div class="details">
      <a href="/listing.html" class="back">← Back to listings</a>
      <div class="details-top">
        <div>
          <h1>${safe(p.title)}</h1>
          <p class="location">${safe(p.location)}</p>
        </div>
        <div class="contact-box">
          <p><strong>Request info</strong></p>
          <p class="price-large">$${Number(p.price).toLocaleString()}</p>
          <a class="btn" href="mailto:info@example.com?subject=Inquiry%20about%20${encodeURIComponent(safe(p.title))}">Contact Agent</a>
        </div>
      </div>

      <div class="images-grid">
        <img src="${p.images[0]}" alt="${safe(p.title)} 1" style="grid-column: span 2; height: 340px;" />
        <img src="${p.images[1]}" alt="${safe(p.title)} 2" />
        <img src="${p.images[2]}" alt="${safe(p.title)} 3" />
      </div>

      <div class="desc">
        <div class="specs">
          <div><strong>Bedrooms</strong><div>${safe(p.bedrooms)}</div></div>
          <div><strong>Bathrooms</strong><div>${safe(p.bathrooms)}</div></div>
          <div><strong>Area</strong><div>${safe(p.area)} sqft</div></div>
        </div>
        <p>${safe(p.description)}</p>
        <p><strong>Features:</strong> ${p.features.join(', ')}</p>
      </div>
    </div>
  </div>
</body>
</html>`

  fs.writeFileSync(outFile, html, 'utf8')
  console.log('Written', outFile)
})
