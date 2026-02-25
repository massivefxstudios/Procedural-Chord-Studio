import sys
import os
import numpy as np
import librosa
from yt_dlp import YoutubeDL
import imageio_ffmpeg

# Set FFMPEG for yt-dlp and librosa
ffmpeg_path = imageio_ffmpeg.get_ffmpeg_exe()
os.environ["FFMPEG_BINARY"] = ffmpeg_path
os.environ["PATH"] += os.pathsep + os.path.dirname(ffmpeg_path)

import subprocess
import glob

def download_audio(url):
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': 'raw_audio.%(ext)s',
        'quiet': True,
        'nocheckcertificate': True,
    }
    # Clean previous runs
    for f in glob.glob("raw_audio.*") + ["final_audio.wav"]:
        if os.path.exists(f):
            try:
                os.remove(f)
            except:
                pass
                
    with YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
        
    raw_file = glob.glob("raw_audio.*")[0]
    
    print("Converting to wav using ffmpeg...")
    subprocess.run([ffmpeg_path, '-y', '-i', raw_file, 'final_audio.wav'], capture_output=True)
    
    return 'final_audio.wav'

def extract_chords(audio_path):
    print("Loading audio into librosa...")
    y, sr = librosa.load(audio_path, sr=22050)
    print("Computing chroma features (this might take a few seconds)...")
    chroma = librosa.feature.chroma_cqt(y=y, sr=sr)
    
    # 12 major chords, 12 minor chords
    templates = []
    chord_names = []
    notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    
    for i in range(12):
        # Major: 1, 3, 5 (0, 4, 7 semitones)
        t_maj = np.zeros(12)
        t_maj[(np.array([0, 4, 7]) + i) % 12] = 1
        templates.append(t_maj)
        chord_names.append(notes[i])
        
        # Minor: 1, m3, 5 (0, 3, 7 semitones)
        t_min = np.zeros(12)
        t_min[(np.array([0, 3, 7]) + i) % 12] = 1
        templates.append(t_min)
        chord_names.append(notes[i] + 'm')
        
    templates = np.array(templates)
    
    hop_length = 512
    fps = sr / hop_length
    window_frames = int(fps * 2.0) # 2 seconds resolution
    
    estimated_chords = []
    for j in range(0, chroma.shape[1], window_frames):
        chunk = chroma[:, j:j+window_frames].mean(axis=1)
        # Normalize chunk
        if chunk.sum() > 0:
            chunk = chunk / chunk.sum()
        
        # Match template
        scores = np.dot(templates, chunk)
        best_match = np.argmax(scores)
        estimated_chords.append(chord_names[best_match])
        
    # Compress consecutive duplicates
    compressed_chords = []
    for c in estimated_chords:
        if not compressed_chords or compressed_chords[-1] != c:
            compressed_chords.append(c)
            
    return compressed_chords

if __name__ == "__main__":
    url = sys.argv[1]
    print(f"Downloading from {url}...")
    try:
        audio_file = download_audio(url)
    except Exception as e:
        print(f"Error downloading: {e}")
        sys.exit(1)
        
    chords = extract_chords(audio_file)
    print("\n====================")
    print("Estimated sequence of chords:")
    print(" - ".join(chords))
    print("====================")
