#!/bin/bash
# 🎨 Generative Magazine Setup Guide
# Ein visueller Überblick über dein Projekt

echo ""
echo "╔═══════════════════════════════════════════════════════════════════╗"
echo "║                   🔥 WILD GENERATIVE MAGAZINE 🔥                 ║"
echo "║                                                                   ║"
echo "║  ✨ AUTO-SCANNER AKTIVIERT ✨                                     ║"
echo "║  → Keine manifest.json mehr nötig!                               ║"
echo "║  → Dateien einfach kopieren                                      ║"
echo "║  → Auto-Scan erkennt sie automatisch!                            ║"
echo "╚═══════════════════════════════════════════════════════════════════╝"
echo ""

echo "📚 DOKUMENTATION (Lese in dieser Reihenfolge):"
echo ""
echo "  1️⃣  START_HERE.md .................. Überblick (LESEN!)"
echo "  2️⃣  QUICK_START.md ................. 3 Schritte zum Start"
echo "  3️⃣  INSTALL.md ..................... Setup-Optionen"
echo "  4️⃣  AUTO_SCANNER_SUMMARY.md ........ Problem & Lösung"
echo "  5️⃣  AUTO_SCANNER.md ................ Vollständige Doku"
echo "  6️⃣  COLOR_BLOCKS_GUIDE.md .......... Grafische Elemente"
echo "  7️⃣  VIDEO_GUIDE.md ................. Videos nutzen"
echo "  8️⃣  WILD_SETUP.md .................. Alles im Überblick"
echo "  9️⃣  README_DOCS.md ................. Dokumentations-Index"
echo ""

echo "⚡ SCHNELLSTART:"
echo ""
echo "  $ cd generative-magazine"
echo "  $ python3 -m http.server 8000"
echo "  $ open http://localhost:8000"
echo ""
echo "  → Klick auf Poster = neue Collage!"
echo ""

echo "📁 DATEIEN HINZUFÜGEN:"
echo ""
echo "  # Bilder:"
echo "  $ cp ~/Downloads/*.jpg content/images/"
echo ""
echo "  # Videos:"
echo "  $ cp ~/Videos/*.mp4 content/videos/"
echo ""
echo "  # Texte:"
echo "  $ cp ~/text.txt content/texts/"
echo ""
echo "  # Audio:"
echo "  $ cp ~/music/*.mp3 content/audio/"
echo ""
echo "  → Seite neuladen (F5)"
echo "  → Alles wird automatisch erkannt! ✨"
echo ""

echo "🎯 SCANNER-OPTIONEN:"
echo ""
echo "  🥇 Python (Standard):"
echo "     python3 -m http.server 8000"
echo ""
echo "  🥈 Python Scanner (manuell):"
echo "     python3 scanner.py"
echo ""
echo "  🥉 Node.js Scanner (alternativ):"
echo "     node scan-server.js"
echo ""

echo "📊 BEREITS ERKANNT:"
echo ""
# Schneller Check ob scan.json existiert
if [ -f "content/scan.json" ]; then
  echo "  ✅ content/scan.json existiert!"
  echo ""
  # Python script to extract counts
  python3 << 'EOF'
import json
try:
  with open('content/scan.json', 'r') as f:
    data = json.load(f)
    print(f"  📷 Bilder: {len(data.get('images', []))} Datei(en)")
    print(f"  🎬 Videos: {len(data.get('videos', []))} Datei(en)")
    print(f"  📝 Texte: {len(data.get('texts', []))} Datei(en)")
    print(f"  🔊 Audio: {len(data.get('audio', []))} Datei(en)")
    print(f"  🔤 Fonts: {len(data.get('fonts', []))} Datei(en)")
except Exception as e:
  print(f"  ⚠️ Fehler beim Lesen: {e}")
EOF
else
  echo "  ⚠️ scan.json noch nicht generiert"
  echo "  → Führe aus: python3 scanner.py"
fi
echo ""

echo "🆕 NEUE FUNKTIONEN:"
echo ""
echo "  ✨ Auto-Scanner"
echo "     Erkennt alle Dateien automatisch"
echo ""
echo "  🎨 Color Blocks"
echo "     Grafische Elemente (Balken, Rechtecke, Blasen)"
echo ""
echo "  🎬 Canvas Videos"
echo "     Videos direkt auf den Canvas gerendert"
echo ""
echo "  🔥 Wild Aesthetics"
echo "     Neon-Farben, psychedelisch, chaotisch"
echo ""

echo "╔═══════════════════════════════════════════════════════════════════╗"
echo "║  START: Öffne START_HERE.md oder QUICK_START.md                   ║"
echo "║  Setup: Öffne INSTALL.md                                         ║"
echo "║  Help:  Öffne AUTO_SCANNER.md (Troubleshooting)                   ║"
echo "╚═══════════════════════════════════════════════════════════════════╝"
echo ""
echo "🚀 Viel Spaß beim Generieren! 🎨✨"
echo ""
