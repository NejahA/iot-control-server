const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

// Create HTTP server
const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading page');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.url.endsWith('.png')) {
        // Serve any PNG file from public folder
        const filename = path.basename(req.url);
        fs.readFile(path.join(__dirname, 'public', filename), (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('Not found');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(data);
        });
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

const wss = new WebSocket.Server({ 
    server: server,
    perMessageDeflate: false
});

const devices = new Map();
const allClients = new Set();

console.log(`IoT Control Server starting...`);

wss.on('connection', (ws) => {
    console.log('New client connected');
    allClients.add(ws);
    
    // Send current device list to newly connected client
    sendDeviceListTo(ws);
    
    ws.on('message', (data) => {
        try {
            const message = JSON.parse(data.toString());
            handleMessage(ws, message);
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });
    
    ws.on('close', () => {
        allClients.delete(ws);
        for (const [deviceId, client] of devices.entries()) {
            if (client === ws) {
                devices.delete(deviceId);
                console.log(`Device ${deviceId} disconnected`);
                broadcastDeviceList();
                break;
            }
        }
    });
});

function handleMessage(ws, message) {
    switch (message.type) {
        case 'register':
            devices.set(message.deviceId, ws);
            ws.deviceId = message.deviceId;
            ws.deviceName = message.deviceName;
            ws.platform = message.platform;
            console.log(`Device registered: ${message.deviceName} (${message.deviceId})`);
            broadcastDeviceList();
            break;
            
        case 'command':
            const targetDevice = devices.get(message.to);
            if (targetDevice && targetDevice.readyState === WebSocket.OPEN) {
                targetDevice.send(JSON.stringify({
                    type: 'command',
                    from: message.from,
                    command: message.command
                }));
                console.log(`Command sent from ${message.from} to ${message.to}: ${message.command}`);
            }
            break;
            
        case 'chat':
            const chatTarget = devices.get(message.to);
            if (chatTarget && chatTarget.readyState === WebSocket.OPEN) {
                chatTarget.send(JSON.stringify({
                    type: 'chat',
                    from: message.from,
                    fromName: message.fromName,
                    message: message.message,
                    timestamp: new Date().toISOString()
                }));
                console.log(`Chat from ${message.fromName} to ${message.to}: ${message.message}`);
            }
            break;
    }
}

function sendDeviceListTo(ws) {
    const deviceList = Array.from(devices.entries()).map(([id, client]) => ({
        deviceId: id,
        deviceName: client.deviceName,
        platform: client.platform
    }));
    
    const message = JSON.stringify({
        type: 'device_list',
        devices: deviceList
    });
    
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
    }
}

function broadcastDeviceList() {
    const deviceList = Array.from(devices.entries()).map(([id, ws]) => ({
        deviceId: id,
        deviceName: ws.deviceName,
        platform: ws.platform
    }));
    
    const message = JSON.stringify({
        type: 'device_list',
        devices: deviceList
    });
    
    allClients.forEach((ws) => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(message);
        }
    });
}

// Start HTTP server
server.listen(PORT, () => {
    console.log(`IoT Control Server running on port ${PORT}`);
    console.log(`Web interface: http://localhost:${PORT}`);
});
