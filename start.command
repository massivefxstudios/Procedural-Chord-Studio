#!/bin/bash
# Bulundugumuz dizine git
cd "$(dirname "$0")"

echo ""
echo " === procedural-realtime - Chord Studio (Mac) ==="
echo ""
echo " Sunucu baslatiliyor: http://localhost:8000"
echo " Tarayici otomatik acilacak..."
echo ""
echo " Kapatmak icin bu pencereyi kapatabilirsiniz (Terminal)."
echo ""

# Python 3 ile sunucuyu baslat
python3 server.py
