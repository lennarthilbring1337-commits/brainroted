# 🔧 Installation & Setup-Optionen

Wähle eine Option basierend auf deinem System:

---

## 🥇 Option 1: Python (Empfohlen — funktioniert überall!)

### Voraussetzung:
- Python 3.x installiert (meist vorinstalliert auf Mac/Linux)

### Setup:
```zsh
cd /Users/olihilbring/Desktop/FH\ Dortmund/HTML\ \:\:\ CSS\ Kurs\ WISE2526/html/generative-magazine

# Server starten:
python3 -m http.server 8000
```

### Im Browser:
```
http://localhost:8000
```

### Auto-Scanner:
Der Scanner lädt automatisch, wenn Python den Directory Index bereitstellt.

---

## 🥈 Option 2: Python Scanner (für zusätzliche Kontrolle)

### Wenn du den Scanner manuell ausführen möchtest:
```zsh
cd generative-magazine

# Scanner ausführen:
python3 scanner.py

# Dann Server starten:
python3 -m http.server 8000
```

Das generiert `content/scan.json` mit allen erkannten Dateien.

---

## 🥉 Option 3: Node.js (für separaten Scan-Server)

### Voraussetzung:
- Node.js & npm installiert
- Installieren: https://nodejs.org/

### Setup:
```zsh
cd generative-magazine

# Terminal 1 — Scan-Server:
node scan-server.js
# Läuft auf http://localhost:3000

# Terminal 2 — Hauptseite (neues Terminal):
python3 -m http.server 8000
# Läuft auf http://localhost:8000
```

### Im Browser:
```
http://localhost:8000
```

Der Node.js Server stellt `/content/scan.json` auf Port 3000 bereit.

---

## Option 4: PHP (falls auf deinem System verfügbar)

### Voraussetzung:
- PHP 7.4+ installiert
- Nur für Fortgeschrittene!

### Setup:
```zsh
cd generative-magazine

# Server starten:
php -S localhost:8000
```

PHP lädt automatisch `content/scan.php` und generiert die Datei-Liste.

---

## 🎯 Welche Option wähle ich?

| Situation | Option | Grund |
|-----------|--------|-------|
| Ich bin Anfänger | Python (1) | Einfach, funktioniert überall |
| Ich möchte Kontrolle | Python Scanner (2) | Manuell aktualisierbar |
| Ich habe Node.js | Node.js (3) | Professioneller Ansatz |
| Ich habe PHP | PHP (4) | Wenn vorhanden |

### Empfehlung: **Option 1** (Python Server)
- ✅ Einfach
- ✅ Zuverlässig
- ✅ Keine zusätzliche Installation nötig

---

## ✅ Schnellcheck nach Installation

1. **Server läuft?**
   ```
   Öffne http://localhost:8000
   Du solltest die Seite sehen.
   ```

2. **Auto-Scanner funktioniert?**
   ```
   Öffne http://localhost:8000/content/scan.json
   Du solltest eine JSON-Liste mit Dateien sehen.
   ```

3. **Bilder werden geladen?**
   ```
   Klick auf das Poster → neue Collage sollte entstehen.
   Wenn Bilder fehlen → mehr Dateien in content/images/ kopieren.
   ```

---

## 📝 Beispiel: Von Grund auf

```zsh
# 1. In den generative-magazine Ordner navigieren
cd /Users/olihilbring/Desktop/FH\ Dortmund/HTML\ \:\:\ CSS\ Kurs\ WISE2526/html/generative-magazine

# 2. Bilder hinzufügen
cp ~/Downloads/*.jpg content/images/
cp ~/Videos/*.mp4 content/videos/

# 3. Scanner ausführen (optional)
python3 scanner.py

# 4. Server starten
python3 -m http.server 8000

# 5. Browser öffnen
# http://localhost:8000

# 6. Fertig! Klick auf die Seite → Neue Collage!
```

---

## 🚀 Nächste Schritte

1. **Wähle eine Setup-Option** (empfohlen: Python)
2. **Server starten**
3. **Bilder/Videos hinzufügen** (kopieren in content/ Ordner)
4. **Browser neuladen** (F5)
5. **Klicken & generieren!** 🎉

---

## 💬 Fragen?

Siehe auch:
- `AUTO_SCANNER.md` — Detaillierte Dokumentation
- `QUICK_START.md` — Schnelleinstieg
- `WILD_SETUP.md` — Vollständige Setup-Anleitung

---

**Viel Spaß!** 🎨✨
