# Deploy to Fly.io (Free)

## Prerequisites

Install Fly CLI:

**Windows (PowerShell)**:
```powershell
iwr https://fly.io/install.ps1 -useb | iex
```

**Or via npm**:
```bash
npm install -g flyctl
```

## Deploy Steps

1. **Login to Fly.io**:
   ```bash
   fly auth login
   ```

2. **Navigate to server folder**:
   ```bash
   cd iot-device-control/server
   ```

3. **Launch app** (creates fly.toml config):
   ```bash
   fly launch
   ```
   
   Answer the prompts:
   - App name: `iot-control-server` (or your choice)
   - Region: Choose closest to you
   - PostgreSQL: No
   - Redis: No
   - Deploy now: Yes

4. **Get your URL**:
   ```bash
   fly status
   ```
   
   Your URL will be like: `https://iot-control-server.fly.dev`

5. **Use in apps as**: `wss://iot-control-server.fly.dev`

## Manual fly.toml Configuration

If you need to create `fly.toml` manually:

```toml
app = "iot-control-server"
primary_region = "iad"

[build]
  builder = "heroku/buildpacks:20"

[env]
  PORT = "8080"

[[services]]
  internal_port = 8080
  protocol = "tcp"

  [[services.ports]]
    handlers = ["http"]
    port = 80

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443
```

## Redeploy

After making changes:
```bash
fly deploy
```

## View Logs

```bash
fly logs
```

## Free Tier

- 3 shared-cpu-1x VMs free
- 160GB outbound data transfer
- No credit card required initially
