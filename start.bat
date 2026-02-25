@echo off
echo.
echo  === procedural-realtime - Chord Studio ===
echo.
echo  Sunucu baslatiliyor: http://localhost:8000
echo  Tarayici otomatik acilacak...
echo.
echo  Kapatmak icin bu pencereyi kapatabilirsiniz.
echo.

:: Browsere python tarafindan aciliyor

:: Start the Python server (blocking - keeps the window open)
python server.py

pause
