# 🎨 Color Blocks & Graphics Guide

Die neuen **Color Blocks** sind farbige grafische Elemente (Balken, Rechtecke, Blasen), die wie im Referenzbild präzise platziert werden. Sie erzeugen eine strukturierte, aber immer noch generative Komposition.

---

## 🎭 Drei Arten von Color Blocks

### 1. **Rect** (Rechteck)
- Rotation möglich
- Optionaler Stroke (Umriss)
- Abrundete Ecken (8px Radius)
- Variable Größe

```javascript
{
  type: 'rect',
  x: 500,          // X-Position
  y: 600,          // Y-Position
  w: 200,          // Breite
  h: 150,          // Höhe
  color: '#00ff41',       // Farbe
  opacity: 0.25,   // Transparenz (0-1)
  rotation: 0.2,   // Rotation in Radiant
  stroke: '#ff006e',      // Umriss-Farbe (null = kein Stroke)
  strokeWeight: 4, // Dicke des Umrisses
}
```

### 2. **Bar** (Balken)
- Horizontal oder vertikal
- Ganze Breite oder Höhe
- Subtile, strukturierende Elemente

```javascript
{
  type: 'bar',
  x: 0,               // X-Position (bei vertikal: feste 0)
  y: 800,             // Y-Position (bei horizontal: feste Position)
  w: 2480,            // Breite (A3_WIDTH bei horizontalem Balken)
  h: 60,              // Höhe
  color: '#ffff00',   // Farbe
  opacity: 0.15,      // Sehr subtil
  stroke: null,       // Keine Strokes bei Balken
}
```

### 3. **Circle** (Kreis/Blase)
- Runde Formen
- Optional mit Stroke
- Wie Farbflecken/Blasen

```javascript
{
  type: 'circle',
  x: 1000,        // Mittelpunkt X
  y: 1200,        // Mittelpunkt Y
  r: 180,         // Radius
  color: '#ff00ff',   // Farbe
  opacity: 0.2,   // Transparenz
  stroke: '#00f5ff',  // Stroke-Farbe
  strokeWeight: 3,    // Stroke-Dicke
}
```

---

## 🎛 Dynamische Parameter in `buildColorBlocksPlan()`

```javascript
function buildColorBlocksPlan(p, palette) {
  const blocks = [];
  const blockCount = Math.floor(randomRange(4, 8)); // <-- Anzahl tunen
  
  for (let i = 0; i < blockCount; i++) {
    const blockType = pickRandom(['rect', 'bar', 'circle']); // <-- Art wählen
    const color = pickRandom(neonAccents); // <-- Farbe aus Palette
    // ...
  }
}
```

### Parameter zum Tunen

| Parameter | Aktuell | Effekt |
|-----------|---------|--------|
| `blockCount` | 4–8 | Wie viele Color Blocks pro Collage |
| `blockType` | rect, bar, circle | Welche Arten häufiger vorkommen |
| `opacity` | 0.08–0.45 | Wie durchsichtig die Blöcke sind |
| `color` | neonAccents | Welche Farben verwendet werden |
| `rotation` (rect) | -0.3–0.3 | Wie wild die Rotation ist |
| `strokeWeight` | 2–8 | Dicke der Umrisse |

---

## 💡 Tuning-Ideen

### **Für mehr Struktur & weniger Chaos:**
```javascript
const blockCount = Math.floor(randomRange(2, 4)); // Weniger Blöcke
opacity: p.random(0.05, 0.2), // Subtiler
rotation: p.random(-0.1, 0.1), // Weniger Rotation
```

### **Für mehr Chaos & Wildheit:**
```javascript
const blockCount = Math.floor(randomRange(8, 15)); // Viele Blöcke
opacity: p.random(0.3, 0.6), // Mehr sichtbar
// Balken-Chance erhöhen:
const blockType = pickRandom(['bar', 'bar', 'bar', 'rect', 'circle']);
rotation: p.random(-0.8, 0.8); // Wilde Rotation
```

### **Nur gelbe Balken (wie im Referenzbild):**
```javascript
// In buildColorBlocksPlan(), statt color = pickRandom():
const color = Math.random() > 0.7 ? '#ffff00' : pickRandom(neonAccents);
// Oder: nur yellow für bars
if (blockType === 'bar') {
  color = '#ffff00';
}
```

### **Große, dominante Blöcke:**
```javascript
// In rect-Block:
w: p.random(300, 600), // Größer
h: p.random(200, 400),
// In circle:
r: p.random(200, 400), // Größere Blasen
```

---

## 🔗 Integration in p5.js Rendering

Render-Reihenfolge im `renderPoster()`:

```
1. Background (Neon-Noise)
2. Color Blocks ← NEU
3. Image Fragments
4. Videos ← NEU
5. Typography (Glyphs)
```

Das bedeutet: **Color Blocks sitzen über dem Hintergrund, aber unter Bildern und Videos.**

Um sie **oben** zu platzieren (über Bildern), ändere die Reihenfolge in `renderPoster()`:

```javascript
drawFragmentsLayer(p, comp.fragments);
drawVideoLayer(p, comp.videoElements, loadedVideos);
drawColorBlocksLayer(p, comp.colorBlocks);  // NACH Bildern/Videos
drawGlyphLayer(p, comp.glyphs);
```

---

## 🎯 Häufige Fragen

**F: Wie platziere ich einen Block an einer exakten Position?**
A: In `buildColorBlocksPlan()`, ersetze `p.random()` mit festen Werten:
```javascript
x: A3_WIDTH * 0.3,  // 30% von links
y: A3_HEIGHT * 0.5, // 50% von oben
```

**F: Wie mache ich einen Block blinkend/animiert?**
A: Nutze `p.frameCount` für Animation:
```javascript
opacity: 0.2 + Math.sin(p.frameCount * 0.02) * 0.15, // Blinkt
rotation: Math.sin(p.frameCount * 0.01), // Dreht sich
```

**F: Wie entferne ich alle Balken?**
A: Ändere `blockType = pickRandom()`:
```javascript
const blockType = pickRandom(['rect', 'circle']); // Balken entfernt
```

**F: Kann ich Gradienten in den Blöcken nutzen?**
A: Ja! Nutze `drawingContext` für Canvas-Gradienten:
```javascript
const grad = p.drawingContext.createLinearGradient(...);
p.drawingContext.fillStyle = grad;
p.fill(grad);
```

---

## 🎬 Beispiel-Szenario

Für ein Poster wie im Referenzbild mit:
- 5–7 Color Blocks
- Mehrere blaue horizontale Balken
- 2–3 neon-gelbe/magenta Rechtecke
- Subtile, teils transparente Blasen

```javascript
function buildColorBlocksPlan(p, palette) {
  const blocks = [];
  
  // 1. Gelbe/Magenta Balken (oben/unten)
  for (let i = 0; i < 3; i++) {
    blocks.push({
      type: 'bar',
      x: 0,
      y: i === 0 ? 400 : i === 1 ? 1200 : 2600,
      w: A3_WIDTH,
      h: p.random(80, 140),
      color: i === 0 ? '#ffff00' : '#ff006e',
      opacity: 0.25,
      stroke: null,
    });
  }
  
  // 2. Blaue Rechtecke (rechts/links)
  blocks.push({
    type: 'rect',
    x: A3_WIDTH * 0.15,
    y: A3_HEIGHT * 0.4,
    w: 350,
    h: 500,
    color: '#00f5ff',
    opacity: 0.2,
    stroke: '#00f5ff',
    strokeWeight: 3,
  });
  
  // 3. Grüne Blasen (unten)
  blocks.push({
    type: 'circle',
    x: A3_WIDTH * 0.8,
    y: A3_HEIGHT * 0.75,
    r: 200,
    color: '#00ff41',
    opacity: 0.15,
    stroke: null,
  });
  
  return blocks;
}
```

---

**Viel Spaß beim Tunen der Color Blocks!** 🎨✨
