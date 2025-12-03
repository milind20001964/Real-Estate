# Launch server and client dev servers in separate PowerShell windows
$root = Split-Path -Parent $MyInvocation.MyCommand.Definition

$serverDir = Join-Path $root 'server'
$clientDir = Join-Path $root 'client'

Write-Host "Starting server in new window..."
Start-Process -FilePath powershell -ArgumentList "-NoExit","-Command","cd '$serverDir'; npm run dev" -WindowStyle Normal

Start-Sleep -Milliseconds 300
Write-Host "Starting client in new window..."
Start-Process -FilePath powershell -ArgumentList "-NoExit","-Command","cd '$clientDir'; npm run dev" -WindowStyle Normal

Write-Host "Both dev servers launched. Check the opened terminals."