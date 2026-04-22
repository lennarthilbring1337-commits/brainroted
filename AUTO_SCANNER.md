# 🔄 Auto-Content Scanner

Deine Generative Magazine lädt jetzt **automatisch ALLE Dateien** aus den Content-Ordnern — ohne `manifest.json` manuell zu bearbeiten!

---

## ⚡ Wie es funktioniert

### **Prioritäts-Reihenfolge:**

1. **Auto-Scan** (neu!) — `/content/scan.json`
   - Wird vom Server generiert
   - Scannt alle Ordner automatisch
   - **Empfohlen** für einfaches Handling

2. **Fallback: manifest.json** 
   - Falls Auto-Scan nicht verfügbar
   - Jetzt leer (minimal)

3. **Fallback: Directory Index**
   - Falls beide fehlschlagen
   - Wird von Python/Node automatisch bereitgestellt

---

## 🚀 Setup

### **Option 1: Mit Python (einfachste Methode)**

```zsh
cd generative-magazine
python3 -m http.server 8000
```

Öffne: **http://localhost:8000**

✅ Auto-Scan funktioniert automatisch (Python zeigt Directory Index an)

---

### **Option 2: Mit Node.js Scanner (separate Server)**

**Terminal 1** — Scanner starten:
```zsh
node scan-server.js
```
Läuft auf: http://localhost:3000

**Terminal 2** — Hauptseite (neues Terminal):
```zsh
cd generative-magazine
python3 -m http.server 8000
```

✅ Beide Server kommunizieren, Auto-Scan lädt von Port 3000

---

### **Option 3: Mit PHP**

Falls dein Server PHP hat:

```zsh
cd generative-magazine
php -S localhost:8000
```

✅ `content/scan.php` wird automatisch genutzt

---

## 📁 Dateien hochladen — Das war's!

Einfach Dateien in die Ordner kopieren:

```
generative-magazine/
├── content/
│   ├── images/
│   │   ├── foto1.jpg
│   │   ├── foto2.png
│   │   └── ...mehr Bilder
│   ├── videos/
│   │   ├── clip1.mp4
│   │   ├── clip2.webm
│   │   └── ...mehr Videos
│   ├── texts/
│   │   ├── manifesto.txt
│   │   ├── poetry.txt
│   │   └── ...mehr Texte
│   ├── audio/
│   │   ├── synth.mp3
│   │   ├── beats.ogg
│   │   └── ...mehr Audio
│   └── fonts/
│       ├── custom.ttf
│       └── ...mehr Fonts
```

**Seite neu laden** → Alle Dateien werden automatisch geladen! 🎉

---

## 🎯 Unterstützte Dateitypen

### **Bilder** (`/content/images/`)
- `jpg`, `jpeg`, `png`, `gif`, `webp`, `bmp`, `svg`

### **Videos** (`/content/videos/`)
- `mp4`, `webm`, `ogg`, `mov`, `avi`, `mkv`

### **Texte** (`/content/texts/`)
- `txt`, `md` (Markdown)

### **Audio** (`/content/audio/`)
- `mp3`, `ogg`, `wav`, `m4a`, `flac`

### **Fonts** (`/content/fonts/`)
- `ttf`, `otf`, `woff`, `woff2`

---

## 🔧 Wie es technisch funktioniert

### **1. Auto-Scan mit Python** (Standard)
```
Browser → index.html
       → js/main.js
       → fetch('content/scan.json')
       → Python Server gibt Directory Index zurück
       → Dateien automatisch erkannt!
```

### **2. Auto-Scan mit Node.js** (Separat)
```
Browser → index.html
       → js/main.js
       → fetch('content/scan.json')
       → Node.js Scanner (port 3000)
       → scan-server.js generiert JSON
       → Alle Dateien aufgelistet!
```

### **3. Auto-Scan mit PHP**
```
Browser → index.html
       → js/main.js
       → fetch('content/scan.json')
       → scan.php scannt Ordner
       → JSON mit allen Dateien
```

---

## 📊 Debug & Troubleshooting

### **Prüfe, ob Auto-Scan funktioniert:**

Öffne in Browser: **http://localhost:8000/content/scan.json**

Du solltest sehen:
```json
{
  "images": [
    "content/images/foto1.jpg",
    "content/images/foto2.png"
  ],
  "videos": [
    "content/videos/clip1.mp4"
  ],
  "texts": [
    "content/texts/manifesto.txt"
  ],
  "audio": [],
  "fonts": []
}
```

### **Keine Dateien sichtbar?**

1. **Überprüfe Dateipfade**:
   ```zsh
   ls content/images/
   ls content/videos/
   ls content/texts/
   ```

2. **Überprüfe Browser-Konsole** (F12):
   - Fehler bei `fetch('content/scan.json')`?
   - Sind die Dateitypen korrekt?

3. **Teste mit Python directory listing**:
   ```zsh
   python3 -c "import http.server; http.server.SimpleHTTPRequestHandler.list_directory(None, 'content/images')"
   ```

4. **Nutze Node.js Server**:
   ```zsh
   node scan-server.js
   ```
   Dann öffne: http://localhost:3000/content/scan.json

---

## 🎨 Inhalt verwalten

### **Bilder hinzufügen:**
```zsh
# Kopiere Bilder in:
cp ~/Downloads/foto1.jpg content/images/
cp ~/Pictures/grafik.png content/images/

# Seite neuladen → Auto-Scan findet sie!
```

### **Videos hinzufügen:**
```zsh
cp ~/Videos/clip.mp4 content/videos/
# Seite neuladen
```

### **Texte hinzufügen:**
```zsh
# Neue Textdatei erstellen:
echo "Mein wilder Text" > content/texts/wild-text.txt
# Oder kopieren:
cp ~/my-text.txt content/texts/manifesto.txt
# Seite neuladen
```

### **Alles aktualisieren ohne Neuladen:**
```javascript
// In Browser-Konsole (F12):
location.reload();
// oder Taste F5
```

---

## 🔌 Fallback: Manuelle manifest.json (wenn Auto-Scan nicht funktioniert)

Falls Auto-Scan fehlschlägt, kannst du noch immer manuell eintragen:

```json
{
  "images": [
    "content/images/foto1.jpg",
    "content/images/foto2.png"
  ],
  "videos": [
    "content/videos/clip.mp4"
  ],
  "texts": [
    "content/texts/manifesto.txt"
  ],
  "audio": [
    "content/audio/synth.mp3"
  ],
  "fonts": [
    { "name": "MyFont", "file": "content/fonts/myfont.ttf" }
  ]
}
```

Aber das ist **nicht mehr nötig!** Auto-Scan übernimmt das für dich. 🎉

---

## 🚀 Best Practice

1. **Server starten**:
   ```zsh
   python3 -m http.server 8000
   ```

2. **Dateien in Ordner kopieren**:
   ```zsh
   cp /pfad/zu/bildern/* content/images/
   cp /pfad/zu/videos/* content/videos/
   ```

3. **Browser öffnen**: http://localhost:8000

4. **Klicken & generieren!** Die Seite lädt alles automatisch.

---

## 💡 Advanced: Scan-Server für Produktion

Falls du einen **dedizierten Scan-Server** brauchst (z.B. für größere Mengen):

```zsh
# Separat starten:
node scan-server.js &

# Dann deine Hauptseite:
python3 -m http.server 8000 &

# Beide laufen parallel!
```

Der Node.js Server gibt die Datei-Liste zur Verfügung, während die Seite weiter auf Port 8000 läuft.

---

## 📝 Zusammenfassung

| Vorher | Nachher |
|--------|---------|
| Jede Datei in manifest.json eintragen | Einfach in Ordner kopieren! |
| Manifest editieren, speichern | Auto-Scan erkennt alles |
| Fehleranfällig | Zuverlässig |
| Statisch | Dynamisch |

**Jetzt: Einfach Dateien hochladen, Seite neuladen — fertig!** 🚀✨

---

**Viel Spaß!**
