param(
    [ValidateRange(1, 65535)]
    [int]$Port = 4000,
    [switch]$Background
)

$ErrorActionPreference = 'Stop'
$rubyCommand = Get-Command ruby.exe -ErrorAction SilentlyContinue
if ($rubyCommand) {
    $rubyPath = $rubyCommand.Source
} else {
    $rubyPath = Join-Path $PSScriptRoot '..\tools\Ruby33-x64\bin\ruby.exe'
    if (-not (Test-Path -LiteralPath $rubyPath)) {
        throw 'Ruby was not found. Install Ruby+Devkit and open a new PowerShell window.'
    }
    $rubyPath = (Resolve-Path -LiteralPath $rubyPath).Path
}
$env:Path = "$(Split-Path -Parent $rubyPath);$env:Path"
$runtimePath = Join-Path $PSScriptRoot '.jekyll-local'
New-Item -ItemType Directory -Path $runtimePath -Force | Out-Null
$pidPath = Join-Path $runtimePath 'server.pid'

if (Test-Path -LiteralPath $pidPath) {
    $serverId = [int](Get-Content -LiteralPath $pidPath)
    $existingServer = Get-CimInstance Win32_Process -Filter "ProcessId = $serverId"
    if ($existingServer -and $existingServer.ExecutablePath -eq $rubyPath -and
        $existingServer.CommandLine -like '*jekyll serve*') {
        Write-Host "The Jekyll server is already running (PID $serverId)."
        return
    }
}
if (Get-NetTCPConnection -State Listen -LocalPort $Port -ErrorAction SilentlyContinue) {
    throw "Port $Port is already in use. Choose another port with -Port."
}

Push-Location $PSScriptRoot
try {
    & $rubyPath -S bundle config set --local path vendor/bundle
    if ($LASTEXITCODE -ne 0) { throw 'Could not configure Bundler.' }
    & $rubyPath -S bundle check
    if ($LASTEXITCODE -ne 0) {
        & $rubyPath -S bundle install
        if ($LASTEXITCODE -ne 0) { throw 'Dependency installation failed.' }
    }
    $serverArgs = @('-S', 'bundle', 'exec', 'jekyll', 'serve',
        '--host', '127.0.0.1', '--port', "$Port",
        '--config', '_config.yml,_config.local.yml',
        '--destination', '.jekyll-local/site', '--force_polling')
    if ($Background) {
        $server = Start-Process -FilePath $rubyPath -ArgumentList $serverArgs `
            -WorkingDirectory $PSScriptRoot -WindowStyle Hidden -PassThru `
            -RedirectStandardOutput (Join-Path $runtimePath 'server.log') `
            -RedirectStandardError (Join-Path $runtimePath 'server-error.log')
        Set-Content -LiteralPath $pidPath -Value $server.Id -Encoding ascii
        $startupTimer = [System.Diagnostics.Stopwatch]::StartNew()
        $ready = $false
        while ($startupTimer.Elapsed.TotalSeconds -lt 120) {
            $server.Refresh()
            if ($server.HasExited) {
                Remove-Item -LiteralPath $pidPath
                $details = Get-Content -LiteralPath (Join-Path $runtimePath 'server-error.log') -Tail 12
                throw "Jekyll failed to start. See $runtimePath\server-error.log`n$($details -join "`n")"
            }
            $client = New-Object System.Net.Sockets.TcpClient
            try {
                $connection = $client.ConnectAsync('127.0.0.1', $Port)
                if ($connection.Wait(250) -and $client.Connected) {
                    $ready = $true
                    break
                }
            } catch {
                # The port stays closed until the initial build finishes.
            } finally {
                $client.Dispose()
            }
            Start-Sleep -Milliseconds 250
        }
        if (-not $ready) { throw "Jekyll is still starting. Check the logs in $runtimePath." }
        Write-Host "Running http://localhost:$Port (PID $($server.Id)). Logs: $runtimePath"
    } else {
        Write-Host "Starting http://localhost:$Port. Press Ctrl+C to stop."
        & $rubyPath @serverArgs
        if ($LASTEXITCODE -ne 0) { throw 'The Jekyll server stopped with an error.' }
    }
} finally {
    Pop-Location
}
