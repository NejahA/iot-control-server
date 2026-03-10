const WebSocket = require('ws');

const PORT = process.env.PORT || 3001;
const wss = new WebSocket.Server({ 
    port: PORT,
    perMessageDeflate: false
});

const devices = new Map();

console.log(`IoT Control Server running on port ${PORT}`);

wss.on('connection', (ws) => {
    console.log('New client connected');
    
    ws.on('message', (data) => {
        try {
            const message = JSON.parse(data.toString());
            handleMessage(ws, message);
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });
    
    ws.on('close', () => {
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
    
    devices.forEach((ws) => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(message);
        }
    });
}
