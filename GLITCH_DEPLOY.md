# Deploy to Glitch.com (Free & Easiest)

Glitch is the easiest option - no CLI needed!

## Steps

1. **Go to Glitch**: https://glitch.com

2. **Create New Project**:
   - Click "New Project" → "Import from GitHub"
   - Or click "New Project" → "glitch-hello-node" → then replace code

3. **Upload your files**:
   - Click "Tools" → "Import from GitHub" (if you have repo)
   - Or manually copy files:
     - `server.js`
     - `package.json`

4. **Glitch auto-deploys**:
   - Your app is live immediately!
   - URL will be like: `https://your-project-name.glitch.me`

5. **Use in apps as**: `wss://your-project-name.glitch.me`

## Manual Setup (No GitHub)

1. Go to https://glitch.com/edit/#!/remix/glitch-hello-node
2. Delete existing files
3. Create `package.json`:
   ```json
   {
     "name": "iot-control-server",
     "version": "1.0.0",
     "description": "WebSocket server for IoT device control",
     "main": "server.js",
     "scripts": {
       "start": "node server.js"
     },
     "dependencies": {
       "ws": "^8.14.2"
     }
   }
   ```

4. Create `server.js` - copy content from your server.js

5. Click "Tools" → "Logs" to see it running

6. Get your URL from the "Share" button

## Pros & Cons

**Pros**:
- Easiest setup (no CLI)
- Instant deployment
- Free forever
- Built-in code editor

**Cons**:
- Sleeps after 5 minutes of inactivity
- Takes ~10 seconds to wake up
- Limited to 4000 requests/hour

## Keep Alive (Optional)

To prevent sleeping, use a service like UptimeRobot to ping your app every 5 minutes.

## Perfect For

- Testing and development
- Personal projects
- Quick demos
