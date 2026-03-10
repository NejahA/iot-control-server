# Deploying IoT Control Server

## Why Not Vercel?

Vercel doesn't support WebSocket connections because it's designed for serverless functions that have short execution times. WebSockets need persistent connections.

## Recommended: Railway.app (Easiest & Free)

### Steps:

1. **Create a Railway account**: https://railway.app
2. **Install Railway CLI** (optional):
   ```bash
   npm i -g @railway/cli
   ```

3. **Deploy via GitHub** (Recommended):
   - Push your code to GitHub
   - Go to Railway dashboard
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect Node.js and deploy
   - Copy the public URL (will be like: `https://your-app.railway.app`)

4. **Deploy via CLI**:
   ```bash
   cd server
   railway login
   railway init
   railway up
   ```

5. **Get your WebSocket URL**:
   - Railway will give you a URL like: `https://iot-control-production.up.railway.app`
   - Use it as: `wss://iot-control-production.up.railway.app` (note: wss not ws)

### Update Your Apps:
- Windows: Change to `wss://your-railway-url.railway.app`
- Android: Change to `wss://your-railway-url.railway.app`

---

## Alternative: Render.com (Also Free)

### Steps:

1. **Create account**: https://render.com
2. **Create New Web Service**
3. **Connect your GitHub repo**
4. **Configure**:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: Free
5. **Deploy**
6. **Get URL**: Will be like `https://iot-control.onrender.com`
7. **Use as**: `wss://iot-control.onrender.com`

---

## Alternative: Fly.io

### Steps:

1. **Install Fly CLI**: https://fly.io/docs/hands-on/install-flyctl/
2. **Login**:
   ```bash
   fly auth login
   ```
3. **Deploy**:
   ```bash
   cd server
   fly launch
   fly deploy
   ```
4. **Get URL**: `wss://your-app.fly.dev`

---

## Quick Deploy to Railway (No GitHub)

If you don't want to use GitHub:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Navigate to server folder
cd server

# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up

# Get the URL
railway domain
```

Then update your apps with the Railway URL using `wss://` instead of `ws://`.

---

## Environment Variables

If you need to set the PORT (Railway/Render handle this automatically):

**Railway**: Add in dashboard under Variables
**Render**: Add in dashboard under Environment
**Fly.io**: Use `fly secrets set PORT=3001`

---

## Testing Your Deployment

Once deployed, test with:

```bash
# Install wscat for testing
npm install -g wscat

# Test connection (replace with your URL)
wscat -c wss://your-app.railway.app
```

Then send a test message:
```json
{"type":"register","deviceId":"test123","deviceName":"TestDevice","platform":"Test"}
```

---

## Cost Comparison

| Platform | Free Tier | WebSocket Support | Ease of Use |
|----------|-----------|-------------------|-------------|
| Railway  | 500 hours/month | ✅ Yes | ⭐⭐⭐⭐⭐ |
| Render   | 750 hours/month | ✅ Yes | ⭐⭐⭐⭐ |
| Fly.io   | 3 VMs free | ✅ Yes | ⭐⭐⭐ |
| Vercel   | Unlimited | ❌ No | N/A |

**Recommendation**: Use Railway for the easiest setup!
