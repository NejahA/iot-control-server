# IoT Control Server

WebSocket server for IoT device control and communication.

## Local Development

```bash
npm install
npm start
```

Server runs on port 3001 by default.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions to Railway, Render, or Fly.io.

**Note**: This server requires WebSocket support and cannot be deployed to Vercel.

## Environment Variables

- `PORT`: Server port (default: 3001)

## API

### WebSocket Messages

**Register Device:**
```json
{
  "type": "register",
  "deviceId": "unique-id",
  "deviceName": "Device Name",
  "platform": "Windows|Android"
}
```

**Send Command:**
```json
{
  "type": "command",
  "to": "target-device-id",
  "from": "sender-device-id",
  "command": "command text"
}
```

**Device List (Server → Client):**
```json
{
  "type": "device_list",
  "devices": [
    {
      "deviceId": "id",
      "deviceName": "name",
      "platform": "platform"
    }
  ]
}
```

**Command Received (Server → Client):**
```json
{
  "type": "command",
  "from": "sender-device-id",
  "command": "command text"
}
```
