# 🚀 Quick Start — Auto-Scanner aktiviert!

## ⚡ 3 Schritte zum Starten

### 1️⃣ Server starten
```zsh
cd /Users/olihilbring/Desktop/FH\ Dortmund/HTML\ \:\:\ CSS\ Kurs\ WISE2526/html/generative-magazine

python3 -m http.server 8000
```

### 2️⃣ Browser öffnen
Gehe zu: **http://localhost:8000**

### 3️⃣ Inhalte hinzufügen
Kopiere Dateien in die entsprechenden Ordner:
```zsh
# Bilder:
cp ~/Downloads/*.jpg content/images/
cp ~/Downloads/*.png content/images/

# Videos:
cp ~/Videos/*.mp4 content/videos/

# Texte:
cp ~/my-text.txt content/texts/

# Audio:
cp ~/music/*.mp3 content/audio/
```

**Seite neuladen** → Alles wird automatisch erkannt! ✨

---

## 🎯 Das war's!

Keine manifest.json mehr bearbeiten. Einfach:
1. Dateien kopieren
2. Seite neuladen
3. Klick auf Poster → neue Collage!

---

## 📁 Unterstützte Dateitypen

| Ordner | Dateitypen |
|--------|-----------|
| `content/images/` | jpg, png, gif, webp, svg, bmp |
| `content/videos/` | mp4, webm, ogg, mov, avi, mkv |
| `content/texts/` | txt, md |
| `content/audio/` | mp3, ogg, wav, m4a, flac |
| `content/fonts/` | ttf, otf, woff, woff2 |

---

## 🔧 Falls etwas nicht funktioniert

**Auto-Scan testen:**
Öffne in Browser: http://localhost:8000/content/scan.json

Du solltest eine JSON-Liste aller Dateien sehen.

**Mit Node.js Server (alternativ):**
```zsh
# Terminal 1:
node scan-server.js

# Terminal 2:
python3 -m http.server 8000
```

---

**Fertig! Jetzt wild generativ werden!** 🎨🔥✨
