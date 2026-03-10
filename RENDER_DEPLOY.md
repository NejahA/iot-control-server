# Deploy to Render.com (Free)

## Quick Deploy Steps

1. **Create a Render account**: https://render.com (sign up with GitHub)

2. **Create New Web Service**:
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository (or use "Public Git repository" if not on GitHub)

3. **Configure the service**:
   - **Name**: `iot-control-server`
   - **Root Directory**: `iot-device-control/server` (if deploying from repo root)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

4. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment (takes 2-3 minutes)

5. **Get your WebSocket URL**:
   - After deployment, you'll see a URL like: `https://iot-control-server.onrender.com`
   - Use this in your apps as: `wss://iot-control-server.onrender.com`

## Without GitHub

If you don't have the code on GitHub:

1. Create a new GitHub repository
2. Push your server folder:
   ```bash
   cd iot-device-control/server
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/iot-control-server.git
   git push -u origin main
   ```
3. Follow steps above

## Alternative: Deploy via Render Blueprint

The `render.yaml` file is already configured. Just:
1. Push to GitHub
2. Go to Render dashboard
3. Click "New +" → "Blueprint"
4. Connect your repo
5. Render will auto-configure from `render.yaml`

## Update Your Apps

Once deployed, update the server URLs in:

**Windows App** (`windows-wpf/MainWindow.xaml`):
```xml
<TextBox x:Name="ServerUrlBox" Width="400" Text="wss://your-app.onrender.com" />
```

**Android App** (`android-app/app/src/main/res/layout/activity_main.xml`):
```xml
android:text="wss://your-app.onrender.com"
```

## Important Notes

- Free tier sleeps after 15 minutes of inactivity
- First connection after sleep takes ~30 seconds to wake up
- Use `wss://` (secure WebSocket) not `ws://`
- No credit card required for free tier
