#!/usr/bin/env node
/**
 * Auto-Manifest Scanner (Node.js Version)
 * 
 * Startet einen einfachen Server, der automatisch alle Dateien
 * in /content/ scannt und als JSON bereitstellt.
 * 
 * Nutzung:
 *   node scan-server.js
 * 
 * Zugriff: http://localhost:3000/content/scan.json
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');

const PORT = 3000;
const BASE_DIR = __dirname;

// Unterstützte Dateitypen
const extensions = {
  images: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'],
  videos: ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'],
  texts: ['txt', 'md'],
  audio: ['mp3', 'ogg', 'wav', 'm4a', 'flac'],
  fonts: ['ttf', 'otf', 'woff', 'woff2'],
};

/**
 * Scanne einen Ordner und gib alle unterstützten Dateien zurück
 */
function scanFolder(type) {
  const folderPath = path.join(BASE_DIR, 'content', type);
  const files = [];

  if (!fs.existsSync(folderPath)) {
    return files;
  }

  try {
    const entries = fs.readdirSync(folderPath);

    entries.forEach((file) => {
      const fullPath = path.join(folderPath, file);
      const stat = fs.statSync(fullPath);

      if (stat.isFile()) {
        const ext = path.extname(file).toLowerCase().slice(1);

        if (extensions[type] && extensions[type].includes(ext)) {
          files.push(`content/${type}/${file}`);
        }
      }
    });
  } catch (err) {
    console.error(`Error scanning ${folderPath}:`, err.message);
  }

  return files.sort();
}

/**
 * Generiere Manifest aus allen Ordnern
 */
function generateManifest() {
  return {
    images: scanFolder('images'),
    videos: scanFolder('videos'),
    texts: scanFolder('texts'),
    audio: scanFolder('audio'),
    fonts: scanFolder('fonts'),
  };
}

/**
 * HTTP Server
 */
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (pathname === '/content/scan.json' || pathname === '/scan.json') {
    res.setHeader('Content-Type', 'application/json');
    const manifest = generateManifest();
    res.writeHead(200);
    res.end(JSON.stringify(manifest, null, 2));
  } else if (pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <head><title>Content Scanner</title></head>
        <body style="font-family: monospace; background: #1a1a2e; color: #00ff41; padding: 20px;">
          <h1>📁 Content Scanner</h1>
          <p>Generative Magazine Auto-Content Loader</p>
          <hr>
          <p><strong>Available Endpoints:</strong></p>
          <ul>
            <li><a href="/content/scan.json">/content/scan.json</a> — Manifest JSON</li>
            <li><a href="/scan.json">/scan.json</a> — Alias</li>
          </ul>
          <hr>
          <p><strong>Scanned Folders:</strong></p>
          <ul>
            <li>/content/images/ — JPG, PNG, GIF, WebP, SVG, BMP</li>
            <li>/content/videos/ — MP4, WebM, OGG, MOV, AVI, MKV</li>
            <li>/content/texts/ — TXT, MD</li>
            <li>/content/audio/ — MP3, OGG, WAV, M4A, FLAC</li>
            <li>/content/fonts/ — TTF, OTF, WOFF, WOFF2</li>
          </ul>
          <hr>
          <p style="color: #ff006e;">Add files to any of the folders above, then reload this page.</p>
        </body>
      </html>
    `);
  } else if (pathname === '/favicon.ico') {
    res.writeHead(404);
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`\n🎬 Content Scanner running at http://localhost:${PORT}`);
  console.log(`📁 Manifest available at: http://localhost:${PORT}/content/scan.json`);
  console.log(`\n📂 Monitored folders:`);
  console.log(`   - content/images/`);
  console.log(`   - content/videos/`);
  console.log(`   - content/texts/`);
  console.log(`   - content/audio/`);
  console.log(`   - content/fonts/`);
  console.log(`\nPress Ctrl+C to stop.\n`);
});
