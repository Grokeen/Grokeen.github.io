$ErrorActionPreference = 'Stop'
$pidPath = Join-Path $PSScriptRoot '.jekyll-local\server.pid'
if (-not (Test-Path -LiteralPath $pidPath)) {
    Write-Host 'No background server is recorded.'
    return
}
$serverId = [int](Get-Content -LiteralPath $pidPath)
$server = Get-CimInstance Win32_Process -Filter "ProcessId = $serverId"
if ($server) {
    $localRuby = Join-Path $PSScriptRoot '..\tools\Ruby33-x64\bin\ruby.exe'
    $rubyCommand = Get-Command ruby.exe -ErrorAction SilentlyContinue
    $rubyPaths = @()
    if (Test-Path -LiteralPath $localRuby) { $rubyPaths += (Resolve-Path -LiteralPath $localRuby).Path }
    if ($rubyCommand) { $rubyPaths += $rubyCommand.Source }
    if ($server.ExecutablePath -notin $rubyPaths -or $server.CommandLine -notlike '*jekyll serve*') {
        throw "PID $serverId does not match this Jekyll server."
    }
    & taskkill.exe /PID $serverId /T /F | Out-Null
    if ($LASTEXITCODE -ne 0) { throw "Could not stop Jekyll (PID $serverId)." }
    Write-Host "Stopped Jekyll (PID $serverId)."
}
Remove-Item -LiteralPath $pidPath
