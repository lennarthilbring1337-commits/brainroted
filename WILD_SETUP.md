# 🔥 WILD GENERATIVE COLLAGE STUDIO 🔥

Dieses Projekt erzeugt intensive, psychedelische, chaotische Collagen im A3-Format mit deinen eigenen Bildern. Die visuelle Ästhetik lehnt sich an wilde digitale Poster an (siehe Referenzbild).

**✨ NEU: Auto-Content-Scanner!** — Keine manifest.json mehr nötig. Einfach Dateien in die Ordner kopieren, und alles wird automatisch geladen!

---

## 📋 Setup & lokales Starten

### 1. **Mit Python 3** (einfachste Methode):
```zsh
cd /Users/olihilbring/Desktop/FH\ Dortmund/HTML\ \:\:\ CSS\ Kurs\ WISE2526/html/generative-magazine
python3 -m http.server 8000
```
Öffne dann: **http://localhost:8000**

✅ Auto-Scanner funktioniert automatisch!

### 2. **Mit Python Scanner** (optional):
Falls du den Scanner manuell ausführen möchtest:
```zsh
python3 scanner.py
```
Das generiert eine neue `content/scan.json` basierend auf den aktuellen Dateien.

### 3. **Mit Node.js Scanner** (alternative):
```zsh
node scan-server.js
# Läuft auf Port 3000, gibt /content/scan.json aus
```

---

## 🎨 Content hinzufügen — Super einfach!

Kopiere einfach Dateien in die Ordner:

```zsh
# Bilder:
cp ~/Downloads/*.jpg content/images/
cp ~/Pictures/*.png content/images/

# Videos:
cp ~/Videos/*.mp4 content/videos/

# Texte:
cp ~/Documents/text.txt content/texts/

# Audio:
cp ~/Music/*.mp3 content/audio/
```

**Seite im Browser neuladen** → Alles wird automatisch geladen! ✨

---

## ✅ Auto-Scanner erkannt folgende Dateitypen:

| Ordner | Formate |
|--------|---------|
| `/content/images/` | jpg, jpeg, png, gif, webp, svg, bmp |
| `/content/videos/` | mp4, webm, ogg, mov, avi, mkv |
| `/content/texts/` | txt, md |
| `/content/audio/` | mp3, ogg, wav, m4a, flac |
| `/content/fonts/` | ttf, otf, woff, woff2 |

---

## 🎛 Code-Struktur & Anpassungen

### **Ebenen (in `js/main.js`)**:

#### 0. **Color Blocks Layer** (NEU!) (`buildColorBlocksPlan` + `drawColorBlocksLayer`)
Farbige grafische Elemente wie im Referenzbild (Balken, Rechtecke, Blasen).

**Typen**:
- `rect` — Rechtecke mit Rotation
- `bar` — Horizontale oder vertikale Balken (ganz über die Breite/Höhe)
- `circle` — Farbige Kreise/Blasen mit optionalen Strokes

**Tunen**:
```javascript
// In buildColorBlocksPlan():
const blockCount = Math.floor(randomRange(4, 8)); // Mehr/weniger Blöcke: 4-8 → 2-12

// Mehr Balken:
// Ändere: const blockType = pickRandom(['rect', 'bar', 'circle']);
// Zu: const blockType = pickRandom(['bar', 'bar', 'rect', 'circle']); // bar 2x häufiger

// Transparenz:
opacity: p.random(0.15, 0.45), // 0.15-0.45 → 0.05-0.6 (intensiver/subtiler)

// Stroke (Umriss):
stroke: p.random(0, 1) > 0.6 ? pickRandom(neonAccents) : null, // 0.6 → 0.4 für mehr Strokes
```

#### 1. **Video Layer** (NEU!) (`buildVideoPlan` + `drawVideoLayer`)
Videos werden **direkt auf dem p5.js Canvas** gerendert (nicht als DOM-Layer).

**Features**:
- 1–3 Videos pro Collage
- Präzise Platzierung mit Rotation
- Blend-Modi (SCREEN, OVERLAY, LIGHTEN, MULTIPLY)
- Opacity-Animation

**Tunen**:
```javascript
// In buildVideoPlan():
const videoCount = Math.min(videos.length, Math.floor(randomRange(1, 3))); // 1-3 → 1-5

// Größere Videos:
width: p.random(240, 640), // 240-640 → 300-800
height: p.random(160, 480), // 160-480 → 200-600

// Wildere Platzierung:
x: p.random(A3_WIDTH * 0.05, A3_WIDTH * 0.95), // statt 0.1-0.8
y: p.random(A3_HEIGHT * 0.05, A3_HEIGHT * 0.95),

// Mehr Rotation:
rotation: p.random(-0.8, 0.8), // statt -0.3-0.3
```

#### 2. **Background Layer** (`createBackgroundLayer`)
- Dunkler Gradient (dunkle Neon-Hintergründe)
- Psychedelische Noise-Spiralen
- Glitch-Linien (vertikal/horizontal)
- Intensive Neon-Punkt-Cluster
- Fluid-Art-ähnliche organische Farbflecken

**Tunen**:
```javascript
// In createBackgroundLayer():
// Mehr Spiralen: Ändere `y += 80` zu `y += 40`
// Hellere Glitch-Linien: Ändere `alpha` von `0.12` zu `0.25`
// Mehr Speckles: Ändere Loop von 1200 zu 2000
```

#### 2. **Background Layer** (`createBackgroundLayer`)
- **20–35 Bild-Fragmente** pro Collage
- Jedes Fragment wird mit **2–6 Stamps/Cluster** erweitert
- Aggressive Blend-Modi: MULTIPLY, SCREEN, OVERLAY, HARD_LIGHT, DODGE, BURN
- Wilde Rotationen und Überlappennung

**Tunen**:
```javascript
// Mehr/weniger Fragmente:
const totalFragments = Math.max(18, Math.floor(randomRange(20, 35))); // 20-35 → 15-25

// Mehr Stamps pro Fragment:
const stampCount = Math.floor(p.random(2, 6)); // 2-6 → 3-10

// Wildere Rotationen:
rotation: p.random(-3, 3), // statt -0.9 zu 0.9

// Aggressivere Transparenz:
a: baseAlpha * p.random(0.15, 0.85), // statt 0.25-0.9
```

#### 3. **Fragment Layer** (`buildFragmentsPlan`)
- **2–4 typografische Elemente** mit Neon-Farben
- Dicke Strokes (6–18px)
- Aggressive Animationen: Rotation, Shear, Mouse-Interaktion
- Ständiges Driften durch Perlin-Noise

**Tunen**:
```javascript
// Größere Fonts:
const size = p.random(A3_WIDTH * 0.06, A3_WIDTH * 0.16); // statt 0.04-0.13

// Dickere Strokes:
strokeWeightBase: p.random(10, 24), // statt 6-18

// Mehr Glyphe:
const glyphCount = Math.max(3, Math.floor(randomRange(3, 6))); // statt 2-4

// Intensivere Mouse-Interaktion:
p.rotate(glyph.baseRotation + mouseInfluence * 1.5); // statt * 0.8
```

### **Farb-Paletten** (in `js/main.js`)
```javascript
// Neon-Grün, Magenta, Cyan, Gold, Orange, Lila
const neonBase = ['#00ff41', '#ff006e', '#00f5ff', '#ffbe0b', '#fb5607', '#8338ec'];

// Sauer/Acid-Neon
const acidBase = ['#39ff14', '#ffff00', '#ff10f0', '#00ffff', '#ff1493'];

// Dunkle Hintergründe
const darkBase = ['#0a0e27', '#1a1a3e', '#0f0f2e'];
```

**Neue Farben hinzufügen**:
```javascript
const neonBase = ['#00ff41', '#ff006e', '#ff00ff', '#ff0099', ...]; // Deine Hex-Codes
```

---

## 🎬 Interaktion

- **Klick auf das Poster** → neue Collage regenerieren
- **Maus über dem Poster** → Typografie reagiert (Rotation, Dicke)
- **Jede Regeneration** → komplett neue Anordnung, Farben, Fragmente, Color Blocks, Videos

---

## 🎨 CSS Anpassungen (in `css/style.css`)

```css
:root {
  --bg-a: #00ff41;      /* Neon-Grün: ändere für andere Accentfarbe */
  --bg-b: #ff006e;      /* Neon-Magenta */
  --frame: #0a0a0a;     /* sehr dunkel */
  --paper: #0a0e27;     /* dark blue/purple */
}

.poster-frame {
  /* Neon Glow um den Rahmen */
  box-shadow: 0 20px 80px rgba(0, 255, 65, 0.25), 0 0 60px rgba(255, 0, 110, 0.15);
  filter: saturate(1.15) contrast(1.15); /* Globale Sättigung/Kontrast */
}
```

---

## 🚀 Optionale Features zum Erweitern

### 1. **Export-Button** (PNG speichern)
```javascript
// Taste 'S' drücken → Canvas als PNG exportieren
window.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 's') {
    const canvas = document.querySelector('canvas');
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `collage_${Date.now()}.png`;
    link.click();
  }
});
```

### 2. **Auto-Play Videos mit Sound** (optional)
```javascript
// In buildVideoPlan(), Video mit Audio starten:
const video = videos[Math.floor(p.random(videos.length))];
video.muted = false;  // Sound einschalten
video.volume = 0.3;   // Lautstärke
```

### 3. **3D-ähnliche Perspektive für Videos**
p5.js unterstützt keine 3D-Transformationen direkt auf 2D-Canvas, aber du kannst:
- **Perspektiv-Verzerrung** mit `drawingContext.transform()` hinzufügen
- **Skalierung basierend auf Mausposition** (Parallax-Effekt)

### 4. **Mehr generative Muster im Hintergrund**
```javascript
// In createBackgroundLayer(), Muster hinzufügen:
// Wabenstruktur, Wellen, fraktale Formen, etc.
```

### 5. **Zufällige Text-Inputs**
Füge in `content/text/` weitere `.txt`-Dateien hinzu; sie werden bei jedem Reload gemischt.

---

## 🐛 Troubleshooting

**Problem**: Bilder werden nicht angezeigt.
- **Lösung**: Nutze Option B (manifest.json) statt automatischer Erkennung. Definiere die Pfade explizit.

**Problem**: Typografie sichtbar, aber sehr klein/groß.
- **Lösung**: Ändere in `buildGlyphPlan`:
  ```javascript
  const size = p.random(A3_WIDTH * 0.04, A3_WIDTH * 0.13); // größer/kleiner
  ```

**Problem**: Zu viele Fragmente / Performance-Probleme.
- **Lösung**: Reduziere in `buildFragmentsPlan`:
  ```javascript
  const totalFragments = Math.max(10, Math.floor(randomRange(10, 20))); // statt 20-35
  const stampCount = Math.floor(p.random(1, 3)); // statt 2-6
  ```

**Problem**: Farben sind nicht intensiv/leuchtend genug.
- **Lösung**: 
  1. In CSS, erhöhe `filter: saturate(1.3)` auf `saturate(1.5)` oder höher.
  2. In `createBackgroundLayer()`, erhöhe Neon-Opazitäten.
  3. Nutze neonBase + acidBase statt Pastellfarben.

---

## 📐 Canvas-Größe

Das Canvas ist auf **A3-Format** (2480 × 3508px) eingestellt. Um zu ändern:
```javascript
const A3_WIDTH = 2480;   // 2480 für A3
const A3_HEIGHT = 3508;  // 3508 für A3
```

Oder für A4:
```javascript
const A3_WIDTH = 1920;   // A4
const A3_HEIGHT = 2560;  // A4
```

---

## 🎯 Nächste Schritte

1. **Bilder hochladen** in `/content/images/`
2. **Lokaler Server starten** (Python oder Node)
3. **Klicken & generieren** — wild!
4. **Tunen** — Farben, Fragmentanzahl, Animationen
5. **Exportieren** oder speichern (Screenshot/Browser-Tools)

---

## 📝 Lizenz & Credits

- **p5.js** — Creative Coding Bibliothek
- **GSAP** — Animation Bibliothek (optional für DOM-Elemente)
- Deine Bilder — add & unleash! 🎨

---

**Viel Spaß beim Erstellen wilder Collagen!** 🔥✨
