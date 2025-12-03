# Install dependencies for server and client
# Compute the repository root (script lives in ./scripts)
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$repoRoot = Split-Path -Parent $scriptDir

Write-Host "Installing server dependencies..."
Push-Location (Join-Path $repoRoot 'server')
npm install
Pop-Location

Write-Host "Installing client dependencies..."
Push-Location (Join-Path $repoRoot 'client')
npm install
Pop-Location

Write-Host "Done. Run `npm run dev` from the repo root to start both." 