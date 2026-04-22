<?php
/**
 * Auto-Manifest Scanner
 * 
 * Scannt automatisch alle Dateien in /content/ Unterordnern
 * und gibt sie als JSON zurück. Keine manuelle manifest.json nötig!
 * 
 * Zugriff: /content/scan.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$baseDir = __DIR__;
$manifest = [
    'images' => [],
    'videos' => [],
    'texts' => [],
    'audio' => [],
    'fonts' => [],
];

// Unterstützte Dateitypen
$extensions = [
    'images' => ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'],
    'videos' => ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'],
    'texts' => ['txt', 'md'],
    'audio' => ['mp3', 'ogg', 'wav', 'm4a', 'flac'],
    'fonts' => ['ttf', 'otf', 'woff', 'woff2'],
];

// Scan folders
foreach ($manifest as $type => &$files) {
    $folderPath = $baseDir . '/content/' . $type;
    
    if (!is_dir($folderPath)) {
        continue;
    }
    
    $scanDir = scandir($folderPath);
    if ($scanDir === false) {
        continue;
    }
    
    foreach ($scanDir as $file) {
        if ($file === '.' || $file === '..' || is_dir($folderPath . '/' . $file)) {
            continue;
        }
        
        $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        
        if (in_array($ext, $extensions[$type])) {
            $files[] = "content/$type/" . $file;
        }
    }
    
    // Sortieren
    sort($files);
}

// Fallback: Wenn leer, nutze alte manifest.json
if (empty(array_filter($manifest))) {
    $oldManifest = $baseDir . '/content/manifest.json';
    if (file_exists($oldManifest)) {
        $manifest = json_decode(file_get_contents($oldManifest), true) ?? $manifest;
    }
}

echo json_encode($manifest, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
?>
