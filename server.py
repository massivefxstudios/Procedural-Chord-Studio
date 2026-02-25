import http.server
import socketserver
import json
import subprocess
import os
import sys
import webbrowser
import threading

PORT = 8000
DIRECTORY = "ArrangerApp"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # Suppress noisy GET logs, only show API calls
        if '/api/' in args[0]:
            print(f"[API] {args[0]} -> {args[1]}")

    def end_headers(self):
        # Add CORS headers to every response so the browser never blocks requests
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        # Handle the browser's CORS preflight request
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/analyze':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)

            try:
                data = json.loads(post_data)
                url = data.get('url')

                if not url:
                    raise ValueError("URL bos birakildi.")

                print(f"\n[Analiz Basladi] URL: {url}")

                # Run analyze.py using the same Python environment
                result = subprocess.run(
                    [sys.executable, 'analyze.py', url],
                    capture_output=True,
                    text=True,
                    encoding='utf-8',
                    errors='replace',
                    cwd=os.path.dirname(os.path.abspath(__file__))  # Always run from this file's dir
                )

                output = result.stdout
                print(f"[analyze.py Output]\n{output}")

                if result.returncode != 0:
                    stderr_out = result.stderr or "Bilinmeyen hata"
                    raise RuntimeError(f"analyze.py hata verdi:\n{stderr_out[:500]}")

                chords = "Akorlar tespit edilemedi."
                if "Estimated sequence of chords:" in output:
                    chords_part = output.split("Estimated sequence of chords:")[1].split("====================")[0].strip()
                    if chords_part:
                        chords = chords_part

                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'status': 'success', 'chords': chords}).encode('utf-8'))

            except Exception as e:
                print(f"[API Hata] {str(e)}")
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'status': 'error', 'message': str(e)}).encode('utf-8'))
            return

        # Serve static files for anything else
        super().do_GET()


def open_browser():
    """Open default browser after a short delay to let the server start."""
    import time
    time.sleep(1.0)
    webbrowser.open(f"http://localhost:{PORT}")


if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)  # Ensure CWD is always the project root

    if not os.path.exists(DIRECTORY):
        print(f"Hata: '{DIRECTORY}' klasoru bulunamadi. server.py'nin Chord_Program klasorunden calistigini kontrol edin.")
        sys.exit(1)

    print("="*50)
    print("  procedural-realtime | Chord Studio")
    print("="*50)
    print(f"  Adres: http://localhost:{PORT}")
    print(f"  Tarayici otomatik aciliyor...")
    print(f"  Durdurmak icin: Ctrl+C")
    print("="*50)

    # Open browser in a background thread
    threading.Thread(target=open_browser, daemon=True).start()

    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nSunucu durduruldu.")
            httpd.server_close()
