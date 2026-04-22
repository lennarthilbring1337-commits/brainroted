# 🎬 Video Integration Guide

Videos werden jetzt **direkt auf dem p5.js Canvas** gerendert — nicht als DOM-Overlays. Das bedeutet präzise Kontrolle über Platzierung, Blend-Modi und Animation.

---

## 📹 Video-Setup

### 1. **Videos hinzufügen**

Füge Video-Dateien in `/content/videos/` ein:
```
generative-magazine/
├── content/
│   └── videos/
│       ├── clip1.mp4
│       ├── clip2.webm
│       └── clip3.ogg
```

### 2. **Manifest aktualisieren**

`/content/manifest.json`:
```json
{
  "images": [...],
  "videos": [
    "content/videos/clip1.mp4",
    "content/videos/clip2.webm",
    "content/videos/clip3.ogg"
  ],
  ...
}
```

### 3. **Server starten**
```zsh
python3 -m http.server 8000
```

---

## 🎯 Wie Videos funktionieren

### **Laden & Abspielen** (in `createP5Sketch()`)
```javascript
const videoSources = collageState.manifest?.videos ?? [];
loadedVideos = videoSources.map((src) => {
  const vid = document.createElement('video');
  vid.src = src;
  vid.loop = true;           // Loopt endlos
  vid.muted = true;          // Stumm (zur Vermeidung von Autoplay-Problemen)
  vid.playsInline = true;    // Auf Mobile abspielen
  vid.crossOrigin = 'anonymous'; // CORS-Support
  return vid;
});
```

### **Platzierung** (in `buildVideoPlan()`)
```javascript
function buildVideoPlan(p, videos = [], palette) {
  const videoElements = [];
  if (!videos.length) return videoElements;

  const videoCount = Math.min(videos.length, Math.floor(randomRange(1, 3)));

  for (let i = 0; i < videoCount; i++) {
    const video = videos[Math.floor(p.random(videos.length))];
    
    videoElements.push({
      video,                  // Video-Element
      x: p.random(...),       // X-Position
      y: p.random(...),       // Y-Position
      width: p.random(...),   // Breite auf Canvas
      height: p.random(...),  // Höhe auf Canvas
      rotation: p.random(...),// Rotation in Radiant
      opacity: p.random(...), // Transparenz (0-1)
      blend: pickRandom([...]), // Blend-Modus
      clipPath: '...',        // Optional: Clipping-Art
    });
  }

  return videoElements;
}
```

### **Rendern** (in `drawVideoLayer()`)
```javascript
function drawVideoLayer(p, videoElements = [], loadedVideos = []) {
  videoElements.forEach((elem, idx) => {
    const vid = elem.video;
    if (!vid || vid.readyState < 2) return; // Video muss spielbar sein

    p.push();
    p.globalAlpha = elem.opacity;
    p.translate(elem.x, elem.y);
    p.rotate(elem.rotation || 0);
    
    if (elem.blend) {
      p.blendMode(elem.blend);
    }

    p.image(vid, -elem.width / 2, -elem.height / 2, elem.width, elem.height);
    p.pop();
  });
}
```

---

## 🎛 Video-Parameter tunen

### **Größe**
```javascript
// Klein (wie Stempel):
width: p.random(150, 350),
height: p.random(100, 250),

// Mittel:
width: p.random(300, 600),
height: p.random(200, 400),

// Groß (dominant):
width: p.random(600, 1200),
height: p.random(400, 800),
```

### **Platzierung**
```javascript
// Zentriert:
x: A3_WIDTH / 2,
y: A3_HEIGHT / 2,

// Random übers ganze Canvas:
x: p.random(0, A3_WIDTH),
y: p.random(0, A3_HEIGHT),

// Obere Hälfte:
y: p.random(0, A3_HEIGHT / 2),

// Nur rechts:
x: p.random(A3_WIDTH * 0.5, A3_WIDTH),
```

### **Blend-Modi**
```javascript
// Zur Auswahl:
// p.BLEND       — normal (Standard)
// p.MULTIPLY    — dunkler (unter dem Hintergrund)
// p.SCREEN      — heller (leuchtet auf)
// p.OVERLAY     — Kontrast-Effekt
// p.LIGHTEN     — nur hellere Pixel
// p.DARKEN      — nur dunklere Pixel

// Für Video besonders geeignet:
blend: pickRandom([p.SCREEN, p.OVERLAY, p.LIGHTEN, p.MULTIPLY]),
```

### **Rotation**
```javascript
// Keine Rotation:
rotation: 0,

// Leichte Rotation:
rotation: p.random(-0.2, 0.2),

// Wilde Rotation:
rotation: p.random(-1, 1),

// 45° (0.785 Radiant):
rotation: 0.785,
```

### **Transparenz**
```javascript
// Sehr subtil:
opacity: p.random(0.1, 0.3),

// Mittel:
opacity: p.random(0.4, 0.7),

// Fast opak:
opacity: p.random(0.7, 0.95),

// Komplett transparent (= nicht sichtbar):
opacity: 0,
```

### **Anzahl Videos**
```javascript
// Maximal 1 Video:
const videoCount = Math.min(videos.length, 1);

// 1–2 Videos:
const videoCount = Math.min(videos.length, Math.floor(randomRange(1, 2)));

// 1–3 Videos:
const videoCount = Math.min(videos.length, Math.floor(randomRange(1, 3)));

// 2–5 Videos:
const videoCount = Math.min(videos.length, Math.floor(randomRange(2, 5)));
```

---

## 📹 Video-Tipps & Tricks

### **Autoplay & Stumm**
Videos starten automatisch stumm. Um Sound zu aktivieren:
```javascript
// In buildVideoPlan():
const video = videos[...];
video.muted = false;
video.volume = 0.3;

// Oder in der Komposition:
{
  video,
  audioEnabled: true,
  audioVolume: 0.3,
}
```

### **Video-Formate**
- **MP4** — am besten für Browser-Kompatibilität
- **WebM** — kleinere Dateigrößen, gute Qualität
- **OGG** — ältere Browser, weniger genutzt

**Empfohlenes Encoding:**
```bash
# MP4 (H.264)
ffmpeg -i input.mov -c:v libx264 -crf 23 -c:a aac output.mp4

# WebM (VP8/VP9)
ffmpeg -i input.mov -c:v libvpx-vp9 -crf 30 output.webm
```

### **Video-Dauer & Länge**
Kurze Videos (1–10 Sekunden) funktionieren besser:
- Schnelle Schnitte & Effekte
- Loops sind weniger offensichtlich
- Laden schneller

### **Clipping (gerundete Ecken)**
p5.js zeichnet standardmäßig ohne Clipping. Für Clipping:
```javascript
// Vereinfachte Variante: Rechteck über das Video zeichnen
p.clip(() => {
  p.rect(-elem.width / 2, -elem.height / 2, elem.width, elem.height);
});
p.image(vid, -elem.width / 2, -elem.height / 2, elem.width, elem.height);
```

---

## 🎬 Häufige Fragen

**F: Video wird nicht angezeigt.**
A: 
1. Prüfe, ob die Datei in `/content/videos/` existiert
2. Prüfe, ob der Pfad in `manifest.json` korrekt ist
3. Browser-Konsole auf Fehler prüfen (F12)
4. Video-Format überprüfen (MP4 ist am sichersten)

**F: Video blockiert (schwarzer Bildschirm).**
A:
1. Das Video wird möglicherweise noch heruntergeladen
2. Warte ein paar Sekunden oder nutze kleinere Video-Dateien
3. Prüfe, ob `vid.readyState >= 2` bevor es gerendert wird

**F: Kann ich mehrere Videos gleichzeitig abspielen?**
A: Ja, `buildVideoPlan()` erstellt bis zu 3 Video-Instanzen pro Collage. Erhöhe `videoCount` für mehr.

**F: Video ist zu dunkel/hell.**
A:
1. Nutze andere Blend-Modi (`p.SCREEN`, `p.LIGHTEN`)
2. Erhöhe die `opacity`
3. Nutze Farb-Filter (mit `drawingContext`)

**F: Video lädt nicht automatisch.**
A: Browser-Autoplay-Policies sind streng. Videos müssen:
- `muted` sein (automatisches Abspielen)
- Oder: User muss einmal klicken (generiert neue Collage → Videos starten)

---

## 🎯 Beispiel-Szenarien

### **Subtile Video-Overlays** (wie im Referenzbild)
```javascript
function buildVideoPlan(p, videos = [], palette) {
  const videoElements = [];
  if (!videos.length) return videoElements;

  // Nur 1–2 Videos, sehr subtil
  const videoCount = Math.min(videos.length, Math.floor(randomRange(1, 2)));

  for (let i = 0; i < videoCount; i++) {
    const video = videos[i % videos.length];
    
    videoElements.push({
      video,
      x: p.random(A3_WIDTH * 0.2, A3_WIDTH * 0.8),
      y: p.random(A3_HEIGHT * 0.2, A3_HEIGHT * 0.8),
      width: p.random(250, 450),
      height: p.random(180, 320),
      rotation: p.random(-0.2, 0.2),
      opacity: p.random(0.4, 0.7),
      blend: p.OVERLAY,
      clipPath: null,
    });
  }

  return videoElements;
}
```

### **Dominante Video-Stücke**
```javascript
// Große, weniger transparente Videos
width: p.random(600, 1000),
height: p.random(400, 700),
opacity: p.random(0.75, 0.95),
blend: p.SCREEN, // Heller, leuchtend
```

### **Viele kleine Video-Fragmente** (Collage-Stil)
```javascript
const videoCount = Math.min(videos.length, 5); // Bis zu 5 Videos

// Kleine Größen:
width: p.random(150, 300),
height: p.random(100, 200),
opacity: p.random(0.3, 0.6),
rotation: p.random(-0.4, 0.4),
```

---

**Videos sind jetzt ein integrales Teil deiner Collage!** 🎥✨
