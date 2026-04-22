#!/usr/bin/env python3
"""
Auto-Content Scanner (Python Version)

Nutze diesen Scanner, wenn PHP/Node.js nicht verfügbar sind.
Generiert ein scan.json mit allen Dateien aus den content/ Ordnern.

Nutzung:
    python3 scanner.py
    
Dann öffne: http://localhost:8000/content/scan.json
"""

import os
import json
from pathlib import Path

BASE_DIR = Path(__file__).parent
CONTENT_DIR = BASE_DIR / 'content'

# Unterstützte Dateitypen
EXTENSIONS = {
    'images': {'jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'},
    'videos': {'mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'},
    'texts': {'txt', 'md'},
    'audio': {'mp3', 'ogg', 'wav', 'm4a', 'flac'},
    'fonts': {'ttf', 'otf', 'woff', 'woff2'},
}

def scan_folder(folder_type):
    """Scanne einen Ordner und gib alle unterstützten Dateien zurück."""
    folder_path = CONTENT_DIR / folder_type
    files = []
    
    if not folder_path.exists():
        return files
    
    try:
        for file in folder_path.iterdir():
            if file.is_file():
                ext = file.suffix.lower().lstrip('.')
                if ext in EXTENSIONS.get(folder_type, set()):
                    files.append(f'content/{folder_type}/{file.name}')
    except Exception as err:
        print(f'⚠️ Fehler beim Scannen von {folder_path}: {err}')
    
    return sorted(files)

def generate_manifest():
    """Generiere Manifest aus allen Ordnern."""
    return {
        'images': scan_folder('images'),
        'videos': scan_folder('videos'),
        'texts': scan_folder('texts'),
        'audio': scan_folder('audio'),
        'fonts': scan_folder('fonts'),
    }

def main():
    """Generiere und speichere manifest."""
    manifest = generate_manifest()
    output_file = CONTENT_DIR / 'scan.json'
    
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(manifest, f, indent=2, ensure_ascii=False)
        
        print('✅ Scan abgeschlossen!')
        print(f'📁 Datei gespeichert: {output_file}')
        print()
        print('📊 Erkannte Dateien:')
        for folder_type, files in manifest.items():
            print(f'   {folder_type}: {len(files)} Datei(en)')
        
        print()
        print('🌐 Öffne im Browser: http://localhost:8000/content/scan.json')
        print()
        
    except Exception as err:
        print(f'❌ Fehler beim Speichern: {err}')

if __name__ == '__main__':
    main()
