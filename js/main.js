// Global runtime data for the magazine simulation.
const A3_WIDTH = 2480;
const A3_HEIGHT = 3508;

const collageState = {
  manifest: null,
  textSnippets: [],
  fontNames: [],
  audioEl: null,
  audioCtx: null,
  audioNodes: null,
  lastAudioTrack: null,
  ready: false,
  randomizeCanvas: null,
  activeTweens: [],
  currentPalette: null,
  composition: null,
  pointer: { x: A3_WIDTH / 2, y: A3_HEIGHT / 2 },
  isGenerating: false, // NEUE: Verhindere mehrfache gleichzeitige Calls
  stats: {
    regenCount: 0,
    startTime: null,
    timerInterval: null,
    dom: {
      button: null,
      panel: null,
      count: null,
      timer: null,
    },
  },
};

// WILD PSYCHEDELIC & NEON PALETTES für intensive Collagen
const neonBase = ['#00ff41', '#ff006e', '#00f5ff', '#ffbe0b', '#fb5607', '#ff006e', '#8338ec'];
const acidBase = ['#39ff14', '#ffff00', '#ff10f0', '#00ffff', '#ff1493', '#00ff7f', '#ff4500'];
const darkBase = ['#0a0e27', '#1a1a3e', '#0f0f2e', '#1f0f3d'];

// CMYK VOLLE PALETTE: Alle Cyan, Magenta, Yellow, Key/Black Kombinationen
const cmykBase = [
  // Pure CMYK
  '#00b0f0', '#0080d0', '#0050b0',  // Cyan shades
  '#ff00a8', '#d000a0', '#a00088',  // Magenta shades
  '#ffe600', '#ffcc00', '#ffb300',  // Yellow shades
  '#050505', '#1a1a1a', '#333333',  // Key/Black shades
  // CMYK Combinations
  '#00d9ff', '#00c0ff', '#0099ff',  // Cyan + mixes
  '#ff0099', '#ff00cc', '#ff0066',  // Magenta + mixes
  '#ffff00', '#ffff33', '#ffff66',  // Yellow + mixes
  '#00ff00', '#00d000', '#00a000',  // Green (Y+C mixes)
  '#ff0000', '#d00000', '#a00000',  // Red (M+Y mixes)
  '#0000ff', '#0000d0', '#0000a0',  // Blue (C+M mixes)
  '#ffaa00', '#ff9900', '#ff8800',  // Orange (Y+R mixes)
  '#aa00ff', '#9900ff', '#8800ff',  // Purple (M+B mixes)
  '#00ffaa', '#00ff99', '#00ff88',  // Cyan-Green (C+G mixes)
];

const neonAccents = [...neonBase, ...acidBase, ...cmykBase];
const accentPalette = [...neonAccents];

const glitchFilters = [
  'saturate(280%)',
  'contrast(180%)',
  'brightness(140%)',
  'hue-rotate(120deg) saturate(300%)',
  'invert(0.3) contrast(200%)',
  'saturate(200%) brightness(110%) contrast(150%)',
  'hue-rotate(45deg) saturate(250%)',
];

// ===== ALLE FARBEN KOMBINIERT: NEON + CMYK =====
const allColorSpectrum = [
  // Neon Basis
  ...neonBase,
  ...acidBase,
  // CMYK Full Spectrum
  ...cmykBase,
  // Zusätzliche Spektral-Mischungen
  '#ff2ecc71', '#2ecc71', '#27ae60',  // Neon Greens
  '#f39c12', '#e74c3c', '#c0392b',   // Neon Oranges & Reds
  '#9b59b6', '#8e44ad', '#6c3483',   // Deep Purples
  '#34495e', '#2c3e50', '#1c2833',   // Dark Grays
];

// Intensive, dunkle Hintergründe mit leuchtenden Accents
const collageBackdrops = [
  { top: '#0a0e27', bottom: '#1f0f3d' },
  { top: '#1a1a3e', bottom: '#0f0f2e' },
  { top: '#0f0a1f', bottom: '#2d1b3d' },
  { top: '#0d0620', bottom: '#1f0f3d' },
  { top: '#1a0a2e', bottom: '#16213e' },
];

const framePalette = ['#00ff41', '#ff006e', '#00f5ff', '#ffbe0b', '#fb5607', '#ff1493'];

const customFontFamilies = [
  'CH1 Ultra',
  'Block Ultra',
  'Sonar Ultra',
  'LLO Ultra',
  'TRB Ultra',
  'DRN Ultra',
  'KID Ultra',
  'Echo Ultra',
  'Rb Ultra',
  'Noise Two Ultra',
  'Vv Ultra',
  'TSU Ultra',
  'Ink Ultra',
  'Slice Ultra',
  'Ak Ultra',
  'Noise Ultra',
  'Fck Ultra',
];

const bundledFontEntries = [
  { name: 'CH1 Ultra', file: 'fonts/CH1_ultra.otf' },
  { name: 'Block Ultra', file: 'fonts/block_ultra.otf' },
  { name: 'Sonar Ultra', file: 'fonts/sonar_ultra.otf' },
  { name: 'LLO Ultra', file: 'fonts/LLO_ultra.otf' },
  { name: 'TRB Ultra', file: 'fonts/TRB_ultra.otf' },
  { name: 'DRN Ultra', file: 'fonts/DRN_ultra.otf' },
  { name: 'KID Ultra', file: 'fonts/KID_ultra.otf' },
  { name: 'Echo Ultra', file: 'fonts/echo_ultra.otf' },
  { name: 'Rb Ultra', file: 'fonts/Rb_ultra-Regular.ttf' },
  { name: 'Noise Two Ultra', file: 'fonts/NOISE2_ultra.otf' },
  { name: 'Vv Ultra', file: 'fonts/Vv_ultra-Regular.ttf' },
  { name: 'TSU Ultra', file: 'fonts/TSU_ultra.otf' },
  { name: 'Ink Ultra', file: 'fonts/INK_ultra.otf' },
  { name: 'Slice Ultra', file: 'fonts/slice_ultra.otf' },
  { name: 'Ak Ultra', file: 'fonts/Ak_ultra-Regular.ttf' },
  { name: 'Noise Ultra', file: 'fonts/Noise_ultra-Regular.ttf' },
  { name: 'Fck Ultra', file: 'fonts/Fck_ultra-Regular.ttf' },
];

const boldHeadlinePhrases = [
  'NOISE',
  'GLITCH',
  'SPAM',
  'VOID',
  'RUSH',
  'CTRL',
  'LAG',
  'FEED',
  'BURN',
  'TRASH',
  'DRIFT',
  'LOOP',
  'HYPE',
  'SWIPE',
  'CRASH',
  'MUTE',
  'RAGE',
  'DOOM',
].map((text) => text.toUpperCase());

const MAX_VIDEO_SOURCES = 12;
const MAX_VIDEO_PLANES = 10;
const MAX_DOM_OVERLAYS = 5;
const UI_EMOJIS = ['😵‍💫', '💀', '🧠', '📲', '💬', '⚠️', '⚡', '🌀', '🔔', '🧩'];
const UI_ICONS = ['▲', '◆', '✕', '◎', '▣', '▤', '↗', '↘', '↔', '↕'];
const UI_LABELS = [
  'SCROLL',
  'LIKE',
  'LIVE',
  'AD',
  'FEED',
  'GLITCH',
  'FOLLOW',
  'PING',
  'BUFFER',
  'NOISE',
];

window.addEventListener('DOMContentLoaded', async () => {
  console.log('🎬 Seite geladen, starte Preload...');
  try {
    await preloadExperience();
    console.log('✅ Preload fertig');
  } catch (err) {
    console.error('❌ Preload-Fehler:', err);
  }
  
  console.log('🔧 Erstelle p5-Sketch...');
  createP5Sketch();
  initInfoWidget();
  
  // EINFACH: Warte bis Canvas existiert, dann ONE Click-Handler
  const checkCanvas = setInterval(() => {
    const canvas = document.querySelector('#magazine-canvas');
    if (canvas) {
      clearInterval(checkCanvas);
      console.log('✅ Canvas gefunden, registriere Click-Handler');
      
      // NUR EINE Click-Registrierung auf Canvas
      canvas.addEventListener('click', () => {
        console.log('🖱️ Canvas click → generateCollage()');
        generateCollage();
      });
      
      console.log('✅ Ready für Clicks!');
    }
  }, 50); // Überprüfe alle 50ms
  
  // Sicherheit: Timeout nach 5 Sekunden
  setTimeout(() => {
    clearInterval(checkCanvas);
  }, 5000);
});

// Load everything the experience needs before the first draw.
async function preloadExperience() {
  const fallbackManifest = {
    images: [],
    videos: [],
    texts: [],
    audio: [],
    fonts: [],
  };

  console.log('📂 Starte Content-Discovery...');

  // 1. Versuche automatisches Scan-Manifest zu laden
  try {
    console.log('🔍 Versuche: content/scan.json');
    const scanResp = await fetch('content/scan.json', { cache: 'no-store' });
    if (scanResp.ok) {
      collageState.manifest = await scanResp.json();
      console.log('✅ Manifest aus Auto-Scan geladen!');
      console.log('   📊 Inhalte:');
      console.log('      - Bilder:', collageState.manifest.images?.length || 0);
      console.log('      - Videos:', collageState.manifest.videos?.length || 0);
      console.log('      - Texte:', collageState.manifest.texts?.length || 0);
      console.log('      - Audio:', collageState.manifest.audio?.length || 0);
      
      collageState.textSnippets = await loadTextSnippets(collageState.manifest.texts);
      collageState.fontNames = await loadFonts(collageState.manifest.fonts);
      setupAudio();
      return; // Fertig!
    }
  } catch (e) {
    console.warn('⚠️ scan.json nicht erreichbar:', e.message);
  }

  // 2. Fallback: Versuche alte manifest.json zu laden
  try {
    console.log('🔍 Versuche: content/manifest.json');
    const response = await fetch('content/manifest.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }
    collageState.manifest = await response.json();
    console.log('✅ Manifest aus manifest.json geladen', collageState.manifest);
  } catch (error) {
    console.warn('⚠️ manifest.json nicht gefunden, nutze Fallback:', error.message);
    collageState.manifest = fallbackManifest;
  }

  // 3. Lade Text & Fonts
  try {
    collageState.textSnippets = await loadTextSnippets(collageState.manifest.texts);
    collageState.fontNames = await loadFonts(collageState.manifest.fonts);
    console.log(`✅ ${collageState.textSnippets.length} Text-Snippets geladen`);
    console.log(`✅ ${collageState.fontNames.length} Fonts geladen`);
  } catch (err) {
    console.warn('⚠️ Fehler beim Laden von Texten/Fonts:', err.message);
  }

  // 4. Versuche automatische Bildentdeckung
  try {
    const discovered = await discoverImagesFallback();
    if (discovered && discovered.length && !(collageState.manifest?.images?.length)) {
      collageState.manifest = collageState.manifest || {};
      collageState.manifest.images = discovered;
      console.log(`✅ ${discovered.length} Bilder automatisch erkannt`);
    }
  } catch (e) {
    console.warn('⚠️ Automatische Bildentdeckung fehlgeschlagen:', e.message);
  }

  setupAudio();
  console.log('✅ Preload abgeschlossen. Manifest:', collageState.manifest);
}

// Try to fetch a directory listing from /content/images/ and parse image links.
// Works when the static server returns an index page with file links. Best-effort only.
async function discoverImagesFallback() {
  try {
    const resp = await fetch('content/images/');
    if (!resp.ok) return [];
    const text = await resp.text();
    // find hrefs to common image extensions
    const re = /href\s*=\s*"([^"]+\.(?:png|jpg|jpeg|webp|gif))"/gi;
    const found = [];
    let m;
    while ((m = re.exec(text))) {
      let href = m[1];
      // make relative to the content/images path if necessary
      if (!href.startsWith('content/images') && !href.startsWith('/')) {
        // common directory listing shows filenames only
        href = `content/images/${href}`;
      }
      if (!found.includes(href)) found.push(href);
    }
    return found;
  } catch (err) {
    return [];
  }
}

async function loadTextSnippets(paths = []) {
  const fallback = [
    'NOISE',
    'VOID',
    'LAG',
    'BURN',
    'CTRL',
    'SPAM',
    'RUSH',
    'LOOP',
    'CRASH',
    'HYPE',
  ];

  if (!paths.length) {
    return fallback;
  }

  const snippets = await Promise.all(
    paths.map(async (path) => {
      try {
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error('text missing');
        }
        const content = (await response.text()).trim();
        return content ? content.toUpperCase() : null;
      } catch (error) {
        console.warn('Text file failed', path, error);
        return null;
      }
    })
  );

  const filtered = snippets.filter(Boolean);
  return filtered.length ? filtered : fallback;
}

async function loadFonts(fontEntries = []) {
  const preferredEntries = fontEntries.length ? fontEntries : bundledFontEntries;
  const fallback = customFontFamilies.length ? [...customFontFamilies] : [];
  if (!preferredEntries.length || typeof FontFace === 'undefined') {
    return fallback;
  }

  const loadedNames = [];
  for (const fontEntry of preferredEntries) {
    try {
      const face = new FontFace(fontEntry.name, `url(${fontEntry.file})`);
      const loaded = await face.load();
      document.fonts.add(loaded);
      loadedNames.push(fontEntry.name);
    } catch (error) {
      console.warn('Font failed', fontEntry, error);
    }
  }

  return loadedNames.length ? loadedNames : fallback;
}

function setupAudio() {
  const hasAudio = Boolean(collageState.manifest?.audio?.length);
  if (!hasAudio) {
    return;
  }

  if (collageState.audioEl) {
    collageState.audioEl.remove();
    collageState.audioEl = null;
  }

  const audioEl = document.createElement('audio');
  audioEl.loop = false;
  audioEl.volume = 0.25;
  audioEl.muted = false;
  audioEl.preload = 'auto';
  audioEl.className = 'zine-audio';
  audioEl.style.display = 'none';
  audioEl.setAttribute('aria-hidden', 'true');
  audioEl.addEventListener('ended', () => {
    triggerAudio(true);
  });
  document.body.appendChild(audioEl);
  collageState.audioEl = audioEl;
  initAudioFx(audioEl);
}

function initAudioFx(audioEl) {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx || !audioEl) {
    return;
  }

  if (collageState.audioCtx && collageState.audioNodes) {
    return;
  }

  try {
    const audioCtx = new AudioCtx();
    const source = audioCtx.createMediaElementSource(audioEl);
    const inputGain = audioCtx.createGain();
    const lowpass = audioCtx.createBiquadFilter();
    const waveshaper = audioCtx.createWaveShaper();
    const dryGain = audioCtx.createGain();
    const wetGain = audioCtx.createGain();
    const masterGain = audioCtx.createGain();
    const convolver = audioCtx.createConvolver();
    const delay = audioCtx.createDelay(1.2);
    const feedback = audioCtx.createGain();
    const delayWet = audioCtx.createGain();

    lowpass.type = 'lowpass';
    source.connect(inputGain);
    inputGain.connect(lowpass);
    lowpass.connect(waveshaper);

    waveshaper.connect(dryGain);
    dryGain.connect(masterGain);

    waveshaper.connect(convolver);
    convolver.connect(wetGain);
    wetGain.connect(masterGain);

    waveshaper.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(delayWet);
    delayWet.connect(masterGain);

    masterGain.connect(audioCtx.destination);

    collageState.audioCtx = audioCtx;
    collageState.audioNodes = {
      inputGain,
      lowpass,
      waveshaper,
      dryGain,
      wetGain,
      masterGain,
      convolver,
      delay,
      feedback,
      delayWet,
    };

    applyRandomAudioFx();
  } catch (error) {
    console.warn('Audio FX init failed', error);
  }
}

function createImpulseResponse(audioCtx, duration = 2.4, decay = 2.8) {
  const length = Math.max(1, Math.floor(audioCtx.sampleRate * duration));
  const impulse = audioCtx.createBuffer(2, length, audioCtx.sampleRate);

  for (let channel = 0; channel < impulse.numberOfChannels; channel++) {
    const data = impulse.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      const t = i / length;
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, decay);
    }
  }

  return impulse;
}

function createDistortionCurve(amount = 180) {
  const samples = 44100;
  const curve = new Float32Array(samples);
  const k = typeof amount === 'number' ? amount : 50;

  for (let i = 0; i < samples; i++) {
    const x = (i * 2) / samples - 1;
    curve[i] = ((3 + k) * x * 20 * (Math.PI / 180)) / (Math.PI + k * Math.abs(x));
  }

  return curve;
}

function applyRandomAudioFx() {
  const { audioEl, audioCtx, audioNodes } = collageState;
  if (!audioEl || !audioCtx || !audioNodes) {
    return;
  }

  audioEl.volume = 0.9;
  audioEl.playbackRate = randomRange(0.5, 0.78);
  audioEl.defaultPlaybackRate = audioEl.playbackRate;
  audioEl.preservesPitch = false;
  audioEl.mozPreservesPitch = false;
  audioEl.webkitPreservesPitch = false;

  audioNodes.inputGain.gain.value = randomRange(1.6, 2.8);
  audioNodes.lowpass.frequency.value = randomRange(180, 900);
  audioNodes.lowpass.Q.value = randomRange(2.5, 8);
  audioNodes.waveshaper.curve = createDistortionCurve(randomRange(320, 720));
  audioNodes.waveshaper.oversample = '4x';
  audioNodes.dryGain.gain.value = randomRange(0.9, 1.35);
  audioNodes.wetGain.gain.value = randomRange(0.45, 0.9);
  audioNodes.delay.delayTime.value = randomRange(0.22, 0.48);
  audioNodes.feedback.gain.value = randomRange(0.38, 0.62);
  audioNodes.delayWet.gain.value = randomRange(0.28, 0.5);
  audioNodes.masterGain.gain.value = randomRange(0.75, 0.98);
  audioNodes.convolver.buffer = createImpulseResponse(
    audioCtx,
    randomRange(3.5, 7),
    randomRange(3.8, 6.5)
  );
}

// Spin up a dedicated p5 sketch that handles the background canvas.
function createP5Sketch() {
  const holder = document.getElementById('canvas-holder');
  if (!holder || typeof p5 === 'undefined') {
    return;
  }

  new p5((p) => {
    let loadedImages = [];
    let loadedVideos = []; // Store loaded video elements for canvas rendering
    let fxBuffer = null;
    let fgBuffer = null;

    p.preload = () => {
      // Robustly load any images the manifest provides. If none, `discoverImagesFallback`
      // in preloadExperience tried to find some in /content/images/.
      const sources = collageState.manifest?.images ?? [];
      console.log('🖼️ Lade ' + sources.length + ' Bilder...');
      loadedImages = (sources || []).map((src) =>
        p.loadImage(
          src,
          () => {
            // Success
          },
          () => console.warn('❌ Bild fehlgeschlagen:', src)
        )
      );
      console.log('✅ ' + loadedImages.length + ' Bilder geladen');

      // Load videos as HTML5 video elements for direct canvas rendering
      const videoSources = collageState.manifest?.videos ?? [];
      const selectedVideos =
        videoSources.length > MAX_VIDEO_SOURCES
          ? shuffleArray(videoSources).slice(0, MAX_VIDEO_SOURCES)
          : videoSources;
      console.log(
        '🎬 Lade ' +
          selectedVideos.length +
          ' von ' +
          videoSources.length +
          ' Videos (limitiert für Performance)...'
      );
      loadedVideos = selectedVideos.map((src) => {
        const vid = document.createElement('video');
        vid.src = src;
        vid.autoplay = true;
        vid.loop = true;
        vid.muted = true;
        vid.defaultMuted = true;
        vid.playsInline = true;
        vid.setAttribute('playsinline', '');
        vid.setAttribute('muted', '');
        vid.preload = 'auto';
        vid.onloadeddata = () => vid.play().catch(() => {});
        vid.oncanplay = () => vid.play().catch(() => {});
        vid.load();
        return vid;
      });
      console.log('✅ ' + loadedVideos.length + ' Videos erstellt');
      console.log('🎨 FARBPALETTE AKTIV:');
      console.log('   🌈 Neon-Farben:', neonBase.length);
      console.log('   💚 Säure-Farben:', acidBase.length);
      console.log('   🔴🟡🔵🖤 CMYK-Farben:', cmykBase.length);
      console.log('   ✨ GESAMT Spektrum:', allColorSpectrum.length + ' Farben!');
    };

    p.setup = () => {
      console.log('🎬 p5.js setup() aufgerufen');
      const canvas = p.createCanvas(A3_WIDTH, A3_HEIGHT);
      canvas.parent(holder);
      canvas.elt.id = 'magazine-canvas';
      p.pixelDensity(1); // reduce VRAM footprint
      p.frameRate(24);
      fxBuffer = p.createGraphics(A3_WIDTH, A3_HEIGHT);
      fgBuffer = p.createGraphics(A3_WIDTH, A3_HEIGHT);
      
      // WICHTIG: Speichere p und videos als Closure für randomizeCanvas
      const p5Instance = p;
      const videosSnapshot = loadedVideos;
      const imagesSnapshot = loadedImages;
      
      console.log('🔧 Speichere Closure:');
      console.log('   - p5Instance:', !!p5Instance);
      console.log('   - p5Instance.createGraphics:', !!p5Instance?.createGraphics);
      console.log('   - images:', imagesSnapshot.length);
      console.log('   - videos:', videosSnapshot.length);
      
      collageState.randomizeCanvas = () => buildComposition(p5Instance, imagesSnapshot, videosSnapshot);
      collageState.ready = true;
      
      console.log('✅ p5.js Canvas erstellt');
      console.log('   Bilder gesamt:', loadedImages.length);
      console.log('   Videos gesamt:', loadedVideos.length);
      
      // Initial generieren
      generateCollage();
    };

    p.draw = () => {
      renderPoster(p);
    };

    p.mouseMoved = () => {
      collageState.pointer.x = p.mouseX;
      collageState.pointer.y = p.mouseY;
    };

    // ENTFERNT: p.mousePressed verursachte doppelte generateCollage() Calls
    // Nutzen stattdessen Click-Handler auf Canvas unten in DOMContentLoaded

    p.touchMoved = () => {
      collageState.pointer.x = p.mouseX;
      collageState.pointer.y = p.mouseY;
      return false;
    };
  });
}

// Build the composition data for the current collage.
function buildComposition(p, loadedImages, loadedVideos = []) {
  try {
    if (!p) {
      console.error('❌ buildComposition: p ist null!');
      return;
    }
    
    const palette = collageState.currentPalette || createPalette();
    const usableImages = (loadedImages || []).filter((img) => img && img.width);
    const backgroundLayer = createBackgroundLayer(p, palette);
    const colorBlocks = buildColorBlocksPlan(p, palette);
    const fragments = buildFragmentsPlan(p, usableImages, palette);
    const videoElements = buildVideoPlan(p, loadedVideos, palette);
    const headlineStrips = buildHeadlineStrips(p, palette);
    const glyphs = buildGlyphPlan(p, palette);
    const uiFragments = buildUiFragmentsPlan(p, palette);
    const staticLayer = composeStaticLayer(p, palette, backgroundLayer, colorBlocks, fragments, headlineStrips);
    
    collageState.composition = {
      palette,
      backgroundLayer,
      colorBlocks,
      fragments,
      videoElements,
      headlineStrips,
      staticLayer,
      glyphs,
      uiFragments,
    };
    
    console.log('✅ buildComposition fertig!');
    console.log('   📊 Zusammensetzung:');
    console.log('      - Fragmente (Bilder):', fragments.length);
    console.log('      - Videos:', videoElements.length);
    console.log('      - Color Blocks:', colorBlocks.length);
    console.log('      - Glyphen (Text):', glyphs.length);
      console.log('      - Headline-Strips:', headlineStrips.length);
      console.log('      - UI-Fragmente:', uiFragments.length);
  } catch (err) {
    console.error('❌ Fehler in buildComposition:', err.message);
    console.error('   Stack:', err.stack);
  }
}

function createBackgroundLayer(p, palette) {
  try {
    if (!p || !p.createGraphics) {
      console.error('❌ createBackgroundLayer: p.createGraphics nicht verfügbar!');
      return null;
    }
    
    // WILD: Dunkler Hintergrund + intensive Neon-Noise-Muster + Glitch-artige Strukturen
    const g = p.createGraphics(A3_WIDTH, A3_HEIGHT);

  // Basis-Gradient: dunkler Hintergrund
  const ctx = g.drawingContext;
  const gradient = ctx.createLinearGradient(0, 0, 0, g.height);
  gradient.addColorStop(0, palette.canvasTop);
  gradient.addColorStop(1, palette.canvasBottom);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, g.width, g.height);

  // Psychedelische Neon-Noise-Spiralen und organische Formen
  g.noStroke();
  for (let y = -150; y < g.height + 150; y += 110) {
    for (let x = -150; x < g.width + 150; x += 140) {
      const nVal = p.noise(x * 0.0008, y * 0.0008, p.frameCount * 0.002);
      const hueShift = nVal * 360;
      g.fill(p.color(`hsl(${hueShift % 360}, ${p.random(70, 100)}%, ${p.random(35, 50)}%)`));
      g.globalAlpha = p.random(0.08, 0.25);
      const w = p.noise((x + 500) * 0.002, y * 0.002) * p.random(160, 360);
      const h = p.noise((x + 1000) * 0.002, (y + 300) * 0.002) * p.random(90, 240);
      g.push();
      g.translate(x + p.random(-40, 40), y + p.random(-30, 30));
      g.rotate(p.noise(x * 0.001, y * 0.001) * 6.28);
      g.ellipse(0, 0, w, h);
      g.pop();
    }
  }
  g.globalAlpha = 1;

  // Intensive Glitch-Linien (vertikale Bänder mit Sättigung)
  g.strokeWeight(p.random(4, 12));
  for (let i = 0; i < 26; i++) {
    const x = p.random(0, g.width);
    const c = pickRandom(allColorSpectrum);
    g.stroke(hexToRgba(c, p.random(0.12, 0.28)));
    g.line(x, -50, x + p.random(-40, 40), g.height + 50);
  }

  // Horizontale Scan-Linien (Glitch-Effekt)
  g.strokeWeight(p.random(2, 5));
  for (let y = 0; y < g.height; y += p.random(80, 160)) {
    const c = pickRandom(allColorSpectrum);
    g.stroke(hexToRgba(c, p.random(0.05, 0.15)));
    g.line(-50, y, g.width + 50, y + p.random(-15, 15));
  }

  // Intensive Neon-Punkt-Cluster + CMYK
  g.noStroke();
  for (let i = 0; i < 800; i++) {
    const c = p.color(pickRandom(allColorSpectrum));
    c.setAlpha(p.random(15, 60));
    g.fill(c);
    const s = p.random(3, 14);
    g.rect(p.random(0, g.width), p.random(0, g.height), s, s * p.random(0.2, 1.8));
  }

  // Große organische Farbflecken (Fluid Art) - Neon + CMYK
  for (let i = 0; i < 15; i++) {
    g.noStroke();
    g.fill(hexToRgba(pickRandom(allColorSpectrum), p.random(0.06, 0.15)));
    const cx = p.random(-100, g.width + 100);
    const cy = p.random(-100, g.height + 100);
    const size = p.random(120, 400);
    for (let j = 0; j < 5; j++) {
      g.ellipse(cx + p.random(-80, 80), cy + p.random(-60, 60), size - j * 40);
    }
  }

  return g;
  } catch (err) {
    console.error('❌ Fehler in createBackgroundLayer:', err.message);
    return null;
  }
}

function composeStaticLayer(p, palette, backgroundLayer, colorBlocks, fragments, headlineStrips) {
  try {
    const buffer = p.createGraphics(A3_WIDTH, A3_HEIGHT);
    buffer.pixelDensity(1);
    if (backgroundLayer) {
      buffer.image(backgroundLayer, 0, 0);
    } else {
      buffer.background(palette?.canvasTop || '#0a0e27');
    }
    drawColorBlocksLayer(buffer, colorBlocks || [], p);
    drawFragmentsLayer(buffer, fragments || [], p);
    drawHeadlineLayer(buffer, headlineStrips || [], p);
    if (typeof buffer.tint === 'function') {
      buffer.tint(255);
    }
    buffer.blendMode(p.BLEND);
    return buffer;
  } catch (err) {
    console.warn('⚠️ composeStaticLayer failed:', err.message);
    return null;
  }
}

// NEW: Generiere farbige Grafik-Elemente (Balken, Rechtecke, Blasen) wie im Referenzbild
function buildColorBlocksPlan(p, palette) {
  const blocks = [];
  const blockCount = Math.floor(randomRange(8, 14));

  for (let i = 0; i < blockCount; i++) {
    const blockType = pickRandom(['rect', 'bar', 'circle']);
    const color = pickRandom(neonAccents);
    const size = p.random(120, 480);

    if (blockType === 'rect') {
      blocks.push({
        type: 'rect',
        x: p.random(-100, A3_WIDTH + 100),
        y: p.random(-100, A3_HEIGHT + 100),
        w: p.random(80, 320),
        h: p.random(60, 240),
        color,
        opacity: p.random(0.15, 0.45),
        rotation: p.random(-0.3, 0.3),
        stroke: p.random(0, 1) > 0.6 ? pickRandom(neonAccents) : null,
        strokeWeight: p.random(3, 8),
      });
    } else if (blockType === 'bar') {
      // Horizontale oder vertikale Balken
      const isHorizontal = p.random(0, 1) > 0.5;
      blocks.push({
        type: 'bar',
        x: 0,
        y: isHorizontal ? p.random(200, A3_HEIGHT - 200) : 0,
        w: isHorizontal ? A3_WIDTH : p.random(40, 120),
        h: isHorizontal ? p.random(40, 120) : A3_HEIGHT,
        color,
        opacity: p.random(0.08, 0.3),
        stroke: null,
      });
    } else {
      // Farbige Blasen/Kreise
      blocks.push({
        type: 'circle',
        x: p.random(-50, A3_WIDTH + 50),
        y: p.random(-50, A3_HEIGHT + 50),
        r: p.random(60, 280),
        color,
        opacity: p.random(0.1, 0.35),
        stroke: p.random(0, 1) > 0.7 ? pickRandom(neonAccents) : null,
        strokeWeight: p.random(2, 6),
      });
    }
  }

  return blocks;
}

function buildHeadlineStrips(p, palette) {
  const fonts = collageState.fontNames?.length ? collageState.fontNames : customFontFamilies;
  const strips = [];
  const stripCount = Math.floor(randomRange(4, 7));

  for (let i = 0; i < stripCount; i++) {
    const phrase = pickRandom(boldHeadlinePhrases);
    if (!phrase) continue;
    const repeat = Math.floor(randomRange(1, 3));
    const mantra = Array.from({ length: repeat }, () => phrase).join(' ');
    const font = pickRandom(fonts);
    const size = p.random(A3_WIDTH * 0.08, A3_WIDTH * 0.16);
    const approxWidth = mantra.length * size * 0.82;

    strips.push({
      text: mantra,
      font,
      size,
      width: approxWidth,
      x: p.random(A3_WIDTH * 0.05, A3_WIDTH * 0.95),
      y: p.random(A3_HEIGHT * 0.1, A3_HEIGHT * 0.9),
      rotation: p.random(-0.9, 0.9),
      fill: pickRandom(neonAccents),
      stroke: pickRandom(neonAccents),
      strokeWeight: p.random(6, 18),
      background: hexToRgba(pickRandom(allColorSpectrum), p.random(0.15, 0.4)),
      opacity: p.random(0.45, 0.85),
      blend: pickRandom([p.BLEND, p.ADD, p.SCREEN, p.MULTIPLY]),
      multiFont: true,
    });
  }

  return strips;
}

// NEW: Platziere Videos präzise auf dem Canvas (sichtbar wie im Referenzbild)
function buildVideoPlan(p, videos = [], palette) {
  const videoElements = [];
  if (!videos.length) {
    console.log('⚠️ buildVideoPlan: Keine Videos vorhanden');
    return videoElements;
  }

  console.log('📹 buildVideoPlan: ' + videos.length + ' Videos verfügbar');

  const pool =
    videos.length > MAX_VIDEO_PLANES ? shuffleArray(videos).slice(0, MAX_VIDEO_PLANES) : videos;
  // Zeige mehr Layer, dupliziere Quellen falls nötig für Sichtbarkeit
  const planeCount = Math.max(6, Math.min(MAX_VIDEO_PLANES, Math.ceil(pool.length * 1.9)));
  for (let i = 0; i < planeCount; i++) {
    const video = pool[i % pool.length];
    if (!video) continue;

    const ratio =
      video.videoWidth && video.videoHeight ? video.videoWidth / video.videoHeight : 16 / 9;
    const width = p.random(A3_WIDTH * 0.38, A3_WIDTH * 0.62);
    const height = width / ratio;

    videoElements.push({
      video, // HTML5 Video Element
      x: p.random(A3_WIDTH * 0.2, A3_WIDTH * 0.8),
      y: p.random(A3_HEIGHT * 0.18, A3_HEIGHT * 0.82),
      width,
      height,
      rotation: p.random(-0.22, 0.22),
      opacity: p.random(0.5, 0.78),
      blend: pickRandom([p.BLEND, p.MULTIPLY, p.OVERLAY, p.SOFT_LIGHT]),
      floatSpeed: randomRange(0.006, 0.015),
      floatRadius: randomRange(10, 42),
      frameOffset: p.random(0, 1000),
      pulse: randomRange(0.99, 1.04),
    });
  }

  console.log('✅ buildVideoPlan: ' + videoElements.length + ' Videos eingeplant');
  return videoElements;
}

function buildFragmentsPlan(p, images, palette) {
  // Performance-trimmed: keep dense layering but fewer fragments per reroll
  if (!images.length) {
    return buildFallbackFragments(p, palette);
  }

  const fragmentSources =
    images.length > 18 ? shuffleArray(images).slice(0, 18) : images;
  const fragments = [];
  const totalFragments = Math.floor(randomRange(42, 68));

  for (let i = 0; i < totalFragments; i++) {
    const source = fragmentSources[Math.floor(p.random(fragmentSources.length))];
    if (!source || !source.width) continue;

    // extract fragment (variabler Ausschnitt)
    const sw = Math.max(40, p.random(source.width * 0.08, source.width * 0.4));
    const sh = Math.max(40, p.random(source.height * 0.08, source.height * 0.4));
    const sx = p.random(0, Math.max(1, source.width - sw));
    const sy = p.random(0, Math.max(1, source.height - sh));
    const fragmentImage = source.get(sx, sy, sw, sh);

    // WILD: Aggressive Farbverzerrung & Sättigung
    const tintColor = p.color(pickRandom(neonAccents));
    const baseAlpha = p.random(120, 255);

    // Mehr Blend-Modi für intensivere Effekte
    const blendModes = [
      p.MULTIPLY, p.SCREEN, p.OVERLAY, p.HARD_LIGHT, p.SOFT_LIGHT,
      p.LIGHTEST, p.DARKEST, p.DODGE, p.BURN
    ];
    const blend = pickRandom(blendModes);

    // Haupt-Fragment
    const scale = p.random(0.6, 2.4);
    fragments.push({
      image: fragmentImage,
      width: sw * scale,
      height: sh * scale,
      x: p.random(-A3_WIDTH * 0.1, A3_WIDTH * 1.1),
      y: p.random(-A3_HEIGHT * 0.1, A3_HEIGHT * 1.1),
      rotation: p.random(-3, 3),
      tint: { r: p.red(tintColor), g: p.green(tintColor), b: p.blue(tintColor), a: baseAlpha },
      blend,
    });

    // WILD: Mehrere Stamps/Cluster um jedes Fragment für Textur & Chaos
    const stampCount = Math.floor(p.random(3, 7));
    for (let s = 0; s < stampCount; s++) {
      const stampScale = p.random(0.15, 0.55);
      const distX = p.random(-180, 180) * p.random();
      const distY = p.random(-140, 140) * p.random();
      const stampColor = pickRandom(neonAccents);
      const stampTint = p.color(stampColor);

      fragments.push({
        image: fragmentImage,
        width: sw * stampScale,
        height: sh * stampScale,
        x: fragments[fragments.length - 1].x + distX,
        y: fragments[fragments.length - 1].y + distY,
        rotation: p.random(-2, 2),
        tint: {
          r: p.red(stampTint),
          g: p.green(stampTint),
          b: p.blue(stampTint),
          a: baseAlpha * p.random(0.2, 0.65),
        },
        blend: pickRandom(blendModes),
      });
    }
  }

  return fragments.length ? fragments : buildFallbackFragments(p, palette);
}

function buildGlyphPlan(p, palette) {
  // WILD: Aggressivere Typografie mit dicken Strokes, lebhaften Farben und starken Animationen
  const glyphs = [];
  const fonts = collageState.fontNames?.length ? collageState.fontNames : customFontFamilies;
  const baseText = mutateText(pickRandom(collageState.textSnippets) || '').replace(/\s+/g, '');
  const availableChars = baseText ? baseText.split('') : ['✶', '∆', '#', 'O', '@', '%', '&', '!'];
  const glyphCount = Math.max(4, Math.floor(randomRange(6, 10)));

  for (let i = 0; i < glyphCount; i++) {
    const char = pickRandom(availableChars) || '✶';
    const size = p.random(A3_WIDTH * 0.08, A3_WIDTH * 0.19);
    const fillColor = p.color(pickRandom(neonAccents));
    const strokeColor = p.color(pickRandom(neonAccents));

    glyphs.push({
      char,
      font: pickRandom(fonts),
      size,
      x: p.random(A3_WIDTH * 0.1, A3_WIDTH * 0.9),
      y: p.random(A3_HEIGHT * 0.1, A3_HEIGHT * 0.9),
      baseRotation: p.random(-1.2, 1.2),
      noiseOffset: p.random(1000),
      fill: fillColor,
      stroke: strokeColor,
      opacity: p.random(0.6, 1.0),
      jitterScale: p.random(0.08, 0.35),
      strokeWeightBase: p.random(6, 18), // WILD: dicke Strokes
      isPhrase: false,
    });
  }

  const mantraCount = Math.floor(randomRange(4, 7));
  for (let i = 0; i < mantraCount; i++) {
    const phrase = pickRandom(boldHeadlinePhrases);
    if (!phrase) continue;
    const size = p.random(A3_WIDTH * 0.12, A3_WIDTH * 0.24);
    const fillColor = p.color(pickRandom(neonAccents));
    fillColor.setAlpha(p.random(200, 255));
    const strokeColor = p.color(pickRandom(neonAccents));
    strokeColor.setAlpha(p.random(160, 255));

    glyphs.push({
      char: phrase,
      font: pickRandom(fonts),
      size,
      x: p.random(A3_WIDTH * 0.05, A3_WIDTH * 0.95),
      y: p.random(A3_HEIGHT * 0.05, A3_HEIGHT * 0.95),
      baseRotation: p.random(-0.5, 0.5),
      noiseOffset: p.random(1000),
      fill: fillColor,
      stroke: strokeColor,
      opacity: p.random(0.4, 0.85),
      jitterScale: p.random(0.03, 0.15),
      strokeWeightBase: p.random(10, 22),
      isPhrase: true,
      multiFont: true,
    });
  }

  return glyphs;
}

function drawMultiFontText(renderer, text, x, y, size, fonts, options = {}) {
  const availableFonts = fonts?.length ? fonts : customFontFamilies;
  const tracking = options.tracking ?? size * 0.72;
  const chars = String(text || '').split('');
  const totalWidth = Math.max(0, (chars.length - 1) * tracking);
  let cursorX = x - totalWidth / 2;

  chars.forEach((char) => {
    renderer.textFont(pickRandom(availableFonts));
    renderer.text(char, cursorX, y);
    cursorX += tracking;
  });
}

function renderPoster(p) {
  const comp = collageState.composition;
  if (!comp) {
    console.warn('⚠️ renderPoster: composition nicht vorhanden');
    return;
  }

  const time = (typeof p.millis === 'function' ? p.millis() : p.frameCount * (1000 / 60)) * 0.001;
  p.clear(0, 0, 0, 0);
  
  // Dynamic background flow (melting pixels + tunnel depth)
  drawBackgroundFlow(p, comp, time);

  // Static mid layer (background + fragments + headline)
  if (comp.staticLayer) {
    p.push();
    p.tint(255, 230);
    p.image(comp.staticLayer, 0, 0);
    p.pop();
  } else {
    if (comp.backgroundLayer) {
      p.image(comp.backgroundLayer, 0, 0);
    } else {
      p.background(comp.palette?.canvasTop || '#0a0e27');
    }
    drawColorBlocksLayer(p, comp.colorBlocks || [], p);
    drawFragmentsLayer(p, comp.fragments || [], p);
    drawHeadlineLayer(p, comp.headlineStrips || [], p);
  }

  // 5. Videos (mit Fallback)
  drawVideoLayer(p, comp.videoElements || []);

  // 6. UI fragments (parallax, RGB split)
  drawUiFragmentsLayer(p, comp.uiFragments || [], time);

  // 6. Typography (mit Fallback)
  drawGlyphLayer(p, comp.glyphs || []);

  // 7. Glitch overlays
  drawGlitchSlices(p, comp, time);
}

function drawFragmentsLayer(renderer, fragments = [], baseCtx = renderer) {
  const baseBlend = baseCtx?.BLEND ?? renderer.BLEND;
  fragments.forEach((fragment) => {
    renderer.push();
    renderer.translate(fragment.x, fragment.y);
    renderer.rotate(fragment.rotation);
    if (fragment.blend) {
      renderer.blendMode(fragment.blend);
    } else if (baseBlend !== undefined) {
      renderer.blendMode(baseBlend);
    }
    renderer.tint(fragment.tint.r, fragment.tint.g, fragment.tint.b, fragment.tint.a);
    renderer.image(fragment.image, 0, 0, fragment.width, fragment.height);
    renderer.pop();
  });
  renderer.tint(255);
  if (baseBlend !== undefined) {
    renderer.blendMode(baseBlend);
  }
}

// NEW: Zeichne farbige Grafik-Elemente (Balken, Rechtecke, Kreise)
function drawColorBlocksLayer(renderer, blocks = [], baseCtx = renderer) {
  const ctx = renderer.drawingContext;
  blocks.forEach((block) => {
    renderer.push();
    const prevAlpha = ctx.globalAlpha;
    ctx.globalAlpha = block.opacity ?? 0.3;

    if (block.stroke) {
      renderer.stroke(block.stroke);
      renderer.strokeWeight(block.strokeWeight || 2);
    } else {
      renderer.noStroke();
    }

    renderer.fill(block.color);

    if (block.type === 'rect') {
      renderer.translate(block.x, block.y);
      renderer.rotate(block.rotation || 0);
      renderer.rect(-block.w / 2, -block.h / 2, block.w, block.h, 8);
    } else if (block.type === 'bar') {
      renderer.rect(block.x, block.y, block.w, block.h);
    } else if (block.type === 'circle') {
      if (block.stroke) {
        renderer.stroke(block.stroke);
        renderer.strokeWeight(block.strokeWeight || 2);
      }
      renderer.ellipse(block.x, block.y, block.r);
    }

    ctx.globalAlpha = prevAlpha;
    renderer.pop();
  });
  if (baseCtx?.BLEND) {
    renderer.blendMode(baseCtx.BLEND);
  }
}

function drawHeadlineLayer(renderer, strips = [], baseCtx = renderer) {
  const ctx = renderer.drawingContext;
  const baseBlend = baseCtx?.BLEND ?? renderer.BLEND;
  strips.forEach((strip) => {
    const prevAlpha = ctx.globalAlpha;
    ctx.globalAlpha = typeof strip.opacity === 'number' ? strip.opacity : 0.6;

    renderer.push();
    renderer.translate(strip.x, strip.y);
    renderer.rotate(strip.rotation || 0);
    if (strip.blend) {
      renderer.blendMode(strip.blend);
    } else if (baseBlend !== undefined) {
      renderer.blendMode(baseBlend);
    }

    if (strip.background) {
      renderer.noStroke();
      renderer.fill(strip.background);
      const height = strip.size * 1.4;
      const width = strip.width || strip.text.length * strip.size * 0.4;
      renderer.rect(-width / 2, -height / 2, width, height, 28);
    }

    const alignConst = baseCtx?.CENTER ?? renderer.CENTER ?? 3;
    const activeFonts = collageState.fontNames?.length ? collageState.fontNames : customFontFamilies;
    renderer.textSize(strip.size);
    renderer.textAlign(alignConst, alignConst);
    if (strip.stroke) {
      renderer.stroke(strip.stroke);
      renderer.strokeWeight(strip.strokeWeight || Math.max(4, strip.size * 0.05));
    } else {
      renderer.noStroke();
    }
    renderer.fill(strip.fill || '#ffffff');
    if (strip.multiFont) {
      drawMultiFontText(renderer, strip.text, 0, 0, strip.size, activeFonts);
    } else {
      renderer.textFont(strip.font || pickRandom(activeFonts));
      renderer.text(strip.text, 0, 0);
    }
    renderer.pop();

    ctx.globalAlpha = prevAlpha;
    if (baseBlend !== undefined) {
      renderer.blendMode(baseBlend);
    }
  });
}

// NEW: Zeichne Videos direkt auf den Canvas (sichtbar, präzise platziert)
function drawVideoLayer(p, videoElements = []) {
  const ctx = p.drawingContext;
  const millis = typeof p.millis === 'function' ? p.millis() : p.frameCount * (1000 / 60);
  const time = millis * 0.001;
  
  videoElements.forEach((elem) => {
    const vid = elem.video;
    if (!vid) {
      return;
    }

    if (vid.readyState >= 2 && vid.paused) {
      vid.play().catch(() => {});
    }

    if (vid.readyState < 2 || !vid.videoWidth || !vid.videoHeight) {
      return;
    }

    const floatSpeed = elem.floatSpeed || 0.01;
    const phase = time * floatSpeed + (elem.frameOffset || 0);
    const driftX = Math.cos(phase) * (elem.floatRadius || 0);
    const driftY = Math.sin(phase * 1.3) * (elem.floatRadius || 0);
    const wobble = Math.sin(phase * 0.8) * 0.05;
    const pulse = 1 + Math.sin(phase * 0.6) * 0.025;
    const scale = pulse * (elem.pulse || 1);

    ctx.save();
    ctx.globalAlpha = typeof elem.opacity === 'number' ? elem.opacity : 0.8;
    ctx.translate(elem.x + driftX, elem.y + driftY);
    ctx.rotate((elem.rotation || 0) + wobble);
    
    if (elem.blend === p.SCREEN) {
      ctx.globalCompositeOperation = 'screen';
    } else if (elem.blend === p.OVERLAY) {
      ctx.globalCompositeOperation = 'overlay';
    } else if (elem.blend === p.LIGHTEN) {
      ctx.globalCompositeOperation = 'lighten';
    } else if (elem.blend === p.MULTIPLY) {
      ctx.globalCompositeOperation = 'multiply';
    } else if (elem.blend === p.SOFT_LIGHT) {
      ctx.globalCompositeOperation = 'soft-light';
    } else if (elem.blend === p.ADD) {
      ctx.globalCompositeOperation = 'lighter';
    } else {
      ctx.globalCompositeOperation = 'source-over';
    }

    const width = elem.width * scale;
    const height = elem.height * scale;

    try {
      ctx.drawImage(vid, -width / 2, -height / 2, width, height);
    } catch (err) {
      console.warn('⚠️ drawImage Error:', err.message);
    }

    ctx.restore();
  });
}

function drawGlyphLayer(p, glyphs = []) {
  const activeFonts = collageState.fontNames?.length ? collageState.fontNames : customFontFamilies;
  glyphs.forEach((glyph) => {
    const time = p.frameCount * 0.01 + glyph.noiseOffset;
    const jitterIntensity = glyph.jitterScale || 0.2;
    const phraseDamping = glyph.isPhrase ? 0.35 : 1;
    const driftX = (p.noise(time) - 0.5) * glyph.size * 0.25 * jitterIntensity * phraseDamping;
    const driftY = (p.noise(time + 50) - 0.5) * glyph.size * 0.25 * jitterIntensity * phraseDamping;
    const dx = collageState.pointer.x - glyph.x;
    const dy = collageState.pointer.y - glyph.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const mouseInfluence = p.constrain(1 - distance / (A3_WIDTH * 0.5), -1, 1) * (glyph.isPhrase ? 0.5 : 1);
    
    p.push();
    p.globalAlpha = glyph.opacity;
    p.translate(glyph.x + driftX, glyph.y + driftY);
    
    // WILD: Aggressive Rotation & Verzerrung
    const rotationJitter = glyph.isPhrase ? 0.35 : 0.8;
    p.rotate(glyph.baseRotation + mouseInfluence * rotationJitter + p.sin(time * 0.05) * (glyph.isPhrase ? 0.15 : 0.3));
    p.shearX(Math.sin(time) * (glyph.isPhrase ? 0.18 : 0.35));
    p.shearY(Math.sin(time * 0.7) * (glyph.isPhrase ? 0.12 : 0.2));
    
    p.textSize(glyph.size);
    p.textAlign(p.CENTER, p.CENTER);
    p.fill(glyph.fill);
    p.stroke(glyph.stroke);
    const strokeMultiplier = glyph.isPhrase ? 1.3 : 1;
    p.strokeWeight(glyph.strokeWeightBase * (0.8 + mouseInfluence * 0.4) * strokeMultiplier);
    if (glyph.multiFont) {
      drawMultiFontText(p, glyph.char, 0, 0, glyph.size, activeFonts);
    } else {
      p.textFont(glyph.font || pickRandom(activeFonts));
      p.text(glyph.char, 0, 0);
    }
    p.pop();
  });
}

function buildUiFragmentsPlan(p, palette) {
  const fragments = [];
  const total = Math.floor(randomRange(18, 28));
  for (let i = 0; i < total; i++) {
    const type = pickRandom(['card', 'chip', 'emoji', 'arrow', 'screenshot']);
    const depth = randomRange(0.2, 1.4);
    const w = p.random(A3_WIDTH * 0.05, A3_WIDTH * 0.18);
    const h = w * p.random(0.35, 0.8);
    fragments.push({
      type,
      x: p.random(-A3_WIDTH * 0.1, A3_WIDTH * 1.1),
      y: p.random(-A3_HEIGHT * 0.1, A3_HEIGHT * 1.1),
      w,
      h,
      rotation: p.random(-0.6, 0.6),
      depth,
      speed: randomRange(0.08, 0.35),
      jitter: randomRange(0.6, 2.2),
      color: pickRandom(allColorSpectrum),
      accent: pickRandom(neonAccents),
      label: pickRandom(UI_LABELS),
      emoji: pickRandom(UI_EMOJIS),
      icon: pickRandom(UI_ICONS),
      opacity: randomRange(0.45, 0.9),
    });
  }
  return fragments;
}

function drawUiFragmentsLayer(p, fragments = [], time = 0) {
  if (!fragments.length) return;
  const baseX = (collageState.pointer.x - A3_WIDTH / 2) * 0.04;
  const baseY = (collageState.pointer.y - A3_HEIGHT / 2) * 0.04;

  fragments.forEach((frag, idx) => {
    const drift = time * frag.speed + idx * 0.7;
    const parallaxX = baseX * frag.depth;
    const parallaxY = baseY * frag.depth;
    const jitterX = Math.sin(drift * 3.2) * frag.jitter;
    const jitterY = Math.cos(drift * 2.7) * frag.jitter;
    const x = frag.x + parallaxX + jitterX;
    const y = frag.y + parallaxY + jitterY;
    const glow = pickRandom([frag.accent, frag.color, '#ffffff']);
    const alpha = frag.opacity * (0.7 + Math.sin(drift) * 0.2);

    p.push();
    p.translate(x, y);
    p.rotate(frag.rotation + Math.sin(drift * 0.8) * 0.18);
    p.globalAlpha = alpha;

    // RGB split
    drawUiFragmentShape(p, frag, -4, 2, '#ff2d95', 0.5);
    drawUiFragmentShape(p, frag, 4, -2, '#00f5ff', 0.5);
    drawUiFragmentShape(p, frag, 0, 0, glow, 1);

    p.pop();
  });
}

function drawUiFragmentShape(p, frag, dx, dy, color, strength) {
  p.push();
  p.translate(dx, dy);
  p.noFill();
  p.stroke(color);
  p.strokeWeight(2.5 * strength);
  p.drawingContext.shadowColor = color;
  p.drawingContext.shadowBlur = 18 * strength;

  if (frag.type === 'emoji') {
    p.noStroke();
    p.fill(color);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(frag.w * 0.6);
    p.text(frag.emoji, 0, 0);
  } else if (frag.type === 'arrow') {
    p.noFill();
    p.strokeWeight(3.5 * strength);
    p.beginShape();
    p.vertex(-frag.w * 0.4, 0);
    p.vertex(frag.w * 0.3, 0);
    p.vertex(frag.w * 0.18, -frag.h * 0.2);
    p.vertex(frag.w * 0.3, 0);
    p.vertex(frag.w * 0.18, frag.h * 0.2);
    p.endShape();
  } else {
    const radius = frag.type === 'card' ? 18 : 10;
    p.noFill();
    p.rectMode(p.CENTER);
    p.rect(0, 0, frag.w, frag.h, radius);
    p.line(-frag.w * 0.35, 0, frag.w * 0.35, 0);
    p.line(-frag.w * 0.35, frag.h * 0.2, frag.w * 0.2, frag.h * 0.2);
    p.noStroke();
    p.fill(color);
    p.textAlign(p.LEFT, p.CENTER);
    p.textSize(frag.w * 0.16);
    p.text(frag.label, -frag.w * 0.35, -frag.h * 0.22);
    p.textSize(frag.w * 0.18);
    p.text(frag.icon, frag.w * 0.2, frag.h * 0.22);
  }
  p.pop();
}

function drawBackgroundFlow(p, comp, time) {
  const ctx = p.drawingContext;
  p.push();
  p.noStroke();

  // Dark base + slow gradient shimmer
  const top = comp.palette?.canvasTop || '#0a0e27';
  const bottom = comp.palette?.canvasBottom || '#1f0f3d';
  const gradient = ctx.createLinearGradient(0, 0, 0, p.height);
  gradient.addColorStop(0, top);
  gradient.addColorStop(1, bottom);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, p.width, p.height);

  // Brutalist paper noise
  drawBrutalistPaper(p, time);

  // Melting pixel columns (heightmap displacement)
  const colStep = 18;
  for (let x = 0; x < p.width; x += colStep) {
    const n = p.noise(x * 0.002, time * 0.15);
    const h = p.map(n, 0, 1, p.height * 0.2, p.height * 0.95);
    const hue = (n * 360 + time * 30) % 360;
    p.fill(`hsla(${hue}, 90%, 55%, 0.18)`);
    p.rect(x, p.height - h, colStep * 0.9, h);
  }

  // Vertical smear bands
  ctx.globalCompositeOperation = 'screen';
  for (let i = 0; i < 24; i++) {
    const x = p.random(0, p.width);
    const w = p.random(12, 60);
    const n = p.noise(x * 0.001, time * 0.2 + i);
    const hue = (n * 360 + 120) % 360;
    p.fill(`hsla(${hue}, 100%, 60%, 0.12)`);
    p.rect(x, 0, w, p.height);
  }
  ctx.globalCompositeOperation = 'source-over';

  // Tunnel checkerboard perspective
  drawTunnel(p, time);
  drawOpArtTunnel(p, time);

  // Kandinsky-like geometric overlays
  drawKandinskyGeometry(p, time);
  drawBrutalistOverlay(p, time);
  drawBrutalistComposition(p, time);

  p.pop();
}

function drawTunnel(p, time) {
  p.push();
  p.translate(p.width / 2, p.height * 0.5);
  const depthSteps = 26;
  for (let i = 0; i < depthSteps; i++) {
    const t = i / depthSteps;
    const pulse = 1 + Math.sin(time * 0.6 + i * 0.4) * 0.06;
    const size = p.lerp(p.width * 0.06, p.width * 1.2, t) * pulse;
    const alpha = p.lerp(0.25, 0.02, t);
    const wobble = Math.sin(time * 0.7 + i) * 12;
    p.noFill();
    p.stroke(i % 2 === 0 ? '#ffffff' : '#0a0a0a');
    p.strokeWeight(4 - t * 2);
    p.drawingContext.globalAlpha = alpha;
    p.rectMode(p.CENTER);
    p.rect(wobble, wobble, size, size * 1.32);
  }
  p.drawingContext.globalAlpha = 1;
  p.pop();
}

function drawOpArtTunnel(p, time) {
  p.push();
  const ctx = p.drawingContext;
  ctx.globalCompositeOperation = 'source-over';

  const vpX = p.width * 0.36;
  const vpY = p.height * 0.58;
  const phase = time * 0.9;

  // Left zigzag wall with perspective (chevron bands)
  const bandCount = 22;
  for (let i = 0; i < bandCount; i++) {
    const t = i / (bandCount - 1);
    const z = Math.pow(t, 1.6);
    const y = p.lerp(vpY - 40, p.height * 0.95, z);
    const amp = p.lerp(160, 22, z);
    const freq = p.lerp(0.14, 0.04, z);
    const sw = p.lerp(12, 3, z);
    p.noFill();
    p.stroke(i % 2 === 0 ? '#0a0a0a' : '#f7f7f7');
    p.strokeWeight(sw);
    p.beginShape();
    for (let x = -80; x <= vpX + 40; x += 60) {
      const wave = Math.sin(x * freq + phase + i * 0.25) * amp;
      p.vertex(x, y + wave);
    }
    p.endShape();
  }

  // Floor: concentric warp rings pulling into the vanishing point
  const ringCount = 20;
  for (let i = 0; i < ringCount; i++) {
    const t = i / (ringCount - 1);
    const z = Math.pow(t, 1.4);
    const r = p.lerp(120, p.width * 1.25, z);
    const alpha = p.lerp(0.7, 0.08, z);
    p.noFill();
    p.stroke(i % 2 === 0 ? `rgba(0,0,0,${alpha})` : `rgba(255,255,255,${alpha})`);
    p.strokeWeight(p.lerp(10, 2, z));
    p.arc(vpX, p.height * 0.92, r * 1.5, r * 0.9, Math.PI, Math.PI * 2);
  }

  // Right wall: converging stripes
  const stripeCount = 24;
  for (let i = 0; i < stripeCount; i++) {
    const t = i / (stripeCount - 1);
    const z = Math.pow(t, 1.25);
    const x = p.lerp(vpX + 60, p.width * 1.12, z);
    const wobble = Math.sin(phase + i * 0.35) * p.lerp(70, 12, z);
    p.stroke(i % 2 === 0 ? '#0a0a0a' : '#f7f7f7');
    p.strokeWeight(p.lerp(11, 3, z));
    p.line(x + wobble, vpY - 80, x - wobble * 0.5, p.height * 0.98);
  }

  // Center pull line for depth
  p.stroke('rgba(0,0,0,0.5)');
  p.strokeWeight(6);
  p.line(vpX, vpY - 40, vpX, p.height * 0.98);

  p.pop();
}

function drawKandinskyGeometry(p, time) {
  const ctx = p.drawingContext;
  p.push();
  p.noFill();
  ctx.globalCompositeOperation = 'screen';

  // Concentric circles cluster
  const cx = p.width * 0.26 + Math.sin(time * 0.35) * 60;
  const cy = p.height * 0.28 + Math.cos(time * 0.28) * 50;
  for (let i = 0; i < 9; i++) {
    const r = 110 + i * 62 + Math.sin(time * 0.7 + i) * 14;
    p.stroke(pickRandom(allColorSpectrum));
    p.strokeWeight(Math.max(1.5, 7 - i * 0.6));
    p.ellipse(cx, cy, r, r);
  }

  // Diagonal lines and arcs
  p.stroke(pickRandom(neonAccents));
  p.strokeWeight(6);
  p.line(p.width * 0.02, p.height * 0.12, p.width * 0.92, p.height * 0.58);
  p.line(p.width * 0.15, p.height * 0.92, p.width * 0.98, p.height * 0.18);
  p.line(p.width * 0.12, p.height * 0.4, p.width * 0.88, p.height * 0.34);
  p.arc(p.width * 0.78, p.height * 0.72, 420, 420, -1.1, 1.35);
  p.arc(p.width * 0.15, p.height * 0.75, 300, 300, -0.4, 2.2);

  // Floating triangles and rectangles
  for (let i = 0; i < 14; i++) {
    const x = p.width * (0.08 + i * 0.07);
    const y = p.height * (0.16 + (i % 4) * 0.18);
    const wobble = Math.sin(time * 0.55 + i) * 8;
    p.push();
    p.translate(x + wobble, y - wobble);
    p.rotate(Math.sin(time * 0.4 + i) * 0.3);
    p.stroke(pickRandom(allColorSpectrum));
    p.strokeWeight(3.5);
    if (i % 2 === 0) {
      p.triangle(-26, 24, 26, 24, 0, -32);
    } else {
      p.rect(-22, -22, 44, 44);
    }
    p.pop();
  }

  // Orbiting dots
  for (let i = 0; i < 22; i++) {
    const angle = time * 0.4 + i * 0.6;
    const r = 160 + (i % 6) * 22;
    p.noStroke();
    p.fill(pickRandom(neonAccents));
    p.circle(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, 10 + (i % 3) * 4);
  }

  ctx.globalCompositeOperation = 'source-over';
  p.pop();
}

function drawBrutalistOverlay(p, time) {
  const ctx = p.drawingContext;
  p.push();
  ctx.globalCompositeOperation = 'multiply';

  // Heavy black/white blocks
  for (let i = 0; i < 12; i++) {
    const w = p.random(p.width * 0.18, p.width * 0.45);
    const h = p.random(p.height * 0.08, p.height * 0.25);
    const x = p.random(-p.width * 0.05, p.width * 0.95);
    const y = p.random(-p.height * 0.05, p.height * 0.95);
    p.noStroke();
    p.fill(i % 2 === 0 ? 'rgba(0,0,0,0.78)' : 'rgba(255,255,255,0.22)');
    p.rect(x, y, w, h);
  }

  // Bold grid strokes
  p.stroke('rgba(0,0,0,0.6)');
  p.strokeWeight(8);
  for (let x = 0; x < p.width; x += 180) {
    p.line(x, 0, x, p.height);
  }
  for (let y = 0; y < p.height; y += 220) {
    p.line(0, y, p.width, y);
  }

  // Thick brutalist slashes
  p.stroke('rgba(0,0,0,0.85)');
  p.strokeWeight(18);
  p.line(p.width * 0.05, p.height * 0.3, p.width * 0.95, p.height * 0.5);
  p.line(p.width * 0.1, p.height * 0.75, p.width * 0.9, p.height * 0.62);

  ctx.globalCompositeOperation = 'source-over';
  p.pop();
}

function drawBrutalistPaper(p, time) {
  const ctx = p.drawingContext;
  p.push();
  ctx.globalCompositeOperation = 'multiply';
  for (let i = 0; i < 420; i++) {
    const x = Math.random() * p.width;
    const y = Math.random() * p.height;
    const s = Math.random() * 2 + 0.5;
    const a = Math.random() * 0.12;
    p.noStroke();
    p.fill(`rgba(0,0,0,${a})`);
    p.rect(x, y, s, s);
  }
  ctx.globalCompositeOperation = 'source-over';
  p.pop();
}

function drawBrutalistComposition(p, time) {
  const ctx = p.drawingContext;
  p.push();
  ctx.globalCompositeOperation = 'source-over';

  // Limited brutalist palette
  const brutalPalette = ['#0a0a0a', '#f8f8f8', '#ff2d95', '#00f5ff', '#ffbe0b'];

  // Monumental blocks
  for (let i = 0; i < 8; i++) {
    const w = p.random(p.width * 0.12, p.width * 0.35);
    const h = p.random(p.height * 0.08, p.height * 0.28);
    const x = p.random(p.width * 0.02, p.width * 0.88);
    const y = p.random(p.height * 0.05, p.height * 0.9);
    p.noStroke();
    p.fill(pickRandom(brutalPalette));
    p.rect(x, y, w, h);
  }

  // Bold frames and outlines
  p.noFill();
  p.stroke('#0a0a0a');
  p.strokeWeight(10);
  p.rect(p.width * 0.06, p.height * 0.08, p.width * 0.88, p.height * 0.84);
  p.rect(p.width * 0.12, p.height * 0.16, p.width * 0.76, p.height * 0.68);

  // Construction lines
  p.stroke('rgba(0,0,0,0.7)');
  p.strokeWeight(6);
  for (let i = 0; i < 6; i++) {
    const x1 = p.width * (0.05 + i * 0.15);
    const y1 = p.height * 0.08;
    const x2 = p.width * (0.2 + i * 0.12);
    const y2 = p.height * 0.92;
    p.line(x1, y1, x2, y2);
  }

  // Brutalist focal circles
  for (let i = 0; i < 5; i++) {
    const r = 80 + i * 46;
    p.noFill();
    p.stroke(pickRandom(brutalPalette));
    p.strokeWeight(8);
    p.circle(p.width * 0.72, p.height * 0.32, r);
  }

  ctx.globalCompositeOperation = 'source-over';
  p.pop();
}
function drawGlitchSlices(p, comp, time) {
  if (!comp.staticLayer || !comp.staticLayer.elt) return;
  const ctx = p.drawingContext;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 10; i++) {
    const sliceH = p.random(18, 80);
    const y = p.random(0, p.height - sliceH);
    const offset = p.random(-40, 40);
    ctx.drawImage(comp.staticLayer.elt, 0, y, p.width, sliceH, offset, y, p.width, sliceH);
  }
  ctx.restore();
}

function drawScanlines(p) {
  p.push();
  p.noFill();
  p.stroke('rgba(255,255,255,0.04)');
  p.strokeWeight(1);
  for (let y = 0; y < p.height; y += 4) {
    p.line(0, y, p.width, y);
  }
  p.pop();
}

function drawRgbNoise(p, time) {
  p.push();
  const ctx = p.drawingContext;
  ctx.globalCompositeOperation = 'screen';
  for (let i = 0; i < 120; i++) {
    const x = Math.random() * p.width;
    const y = Math.random() * p.height;
    const w = Math.random() * 6 + 2;
    const h = Math.random() * 3 + 1;
    const hue = (time * 60 + i * 12) % 360;
    p.noStroke();
    p.fill(`hsla(${hue}, 100%, 60%, 0.12)`);
    p.rect(x, y, w, h);
  }
  ctx.globalCompositeOperation = 'source-over';
  p.pop();
}

function buildFallbackFragments(p, palette) {
  const fragments = [];
  for (let i = 0; i < 6; i++) {
    const tintColor = p.color(pickRandom(palette.cmykSpectrum));
    fragments.push({
      image: createColorBlock(p, tintColor),
      width: p.random(A3_WIDTH * 0.1, A3_WIDTH * 0.3),
      height: p.random(A3_HEIGHT * 0.08, A3_HEIGHT * 0.25),
      x: p.random(0, A3_WIDTH * 0.8),
      y: p.random(0, A3_HEIGHT * 0.8),
      rotation: p.random(-0.5, 0.5),
      tint: { r: 255, g: 255, b: 255, a: 255 },
      blend: p.MULTIPLY,
    });
  }
  return fragments;
}

function createColorBlock(p, colorValue) {
  const block = p.createGraphics(200, 200);
  block.background(colorValue);
  block.noStroke();
  for (let i = 0; i < 40; i++) {
    block.fill(p.red(colorValue), p.green(colorValue), p.blue(colorValue), 120);
    block.rect(p.random(0, 200), p.random(0, 200), p.random(10, 60), p.random(2, 30));
  }
  return block;
}

function generateCollage() {
  // DEBOUNCE: Verhindere mehrfache gleichzeitige Ausführung
  if (collageState.isGenerating) {
    console.log('⏳ generateCollage läuft bereits, ignoriere Click');
    return;
  }
  
  collageState.isGenerating = true;
  
  try {
    console.log('🎨 generateCollage() aufgerufen');
    
    if (!collageState.ready) {
      console.warn('⚠️ Canvas nicht bereit');
      return;
    }
    
    if (typeof collageState.randomizeCanvas !== 'function') {
      console.warn('⚠️ randomizeCanvas ist keine Funktion');
      return;
    }

    console.log('🎲 Starte Collage-Regeneration...');
    mutateBackgroundColors();
    collageState.randomizeCanvas(); // Das ruft buildComposition auf
    refreshDomLayer();
    triggerAudio();
    
    console.log('✅ Collage erfolgreich generiert!');
    console.log('   - Videos:', collageState.composition?.videoElements?.length || 0);
    console.log('   - Fragmente:', collageState.composition?.fragments?.length || 0);
    console.log('   - Glyphen:', collageState.composition?.glyphs?.length || 0);
    console.log('   - Color Blocks:', collageState.composition?.colorBlocks?.length || 0);
    recordGenerationEvent();
  } catch (err) {
    console.error('❌ Fehler beim Generieren:', err);
    console.error('   Stack:', err.stack);
  } finally {
    // WICHTIG: Unlock nach kurzer Zeit
    setTimeout(() => {
      collageState.isGenerating = false;
    }, 300);
  }
}

// Refresh GSAP-controlled DOM overlays on every reroll.
function refreshDomLayer() {
  const layer = document.getElementById('dom-layer');
  if (!layer) {
    return;
  }

  cleanupTweens();
  layer.innerHTML = '';

  createVideoFragments(layer);
}

function createVideoFragments(layer) {
  const videos = collageState.manifest?.videos ?? [];
  if (!videos.length) {
    return;
  }

  const docFrag = document.createDocumentFragment();
  const maxPieces = Math.max(1, Math.min(videos.length, MAX_DOM_OVERLAYS));
  const fragmentTotal = Math.max(1, Math.floor(randomRange(1, maxPieces + 1)));
  for (let i = 0; i < fragmentTotal; i++) {
    const video = document.createElement('video');
    video.className = 'video-piece';
    video.src = pickRandom(videos);
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('muted', '');
    video.preload = 'auto';
    video.playbackRate = randomRange(0.85, 1.15);
    video.setAttribute('aria-hidden', 'true');
    const clip = randomClipPath();
    video.style.left = `${randomRange(10, 70)}%`;
    video.style.top = `${randomRange(10, 70)}%`;
    video.style.clipPath = clip;
    video.style.webkitClipPath = clip;
    video.style.mixBlendMode = pickRandom(['multiply', 'overlay', 'soft-light', 'normal']);
    video.style.filter = `${pickRandom(glitchFilters)} brightness(${randomRange(0.7, 0.95)}) contrast(${randomRange(0.9, 1.1)})`;
    video.onloadeddata = () => video.play().catch(() => {});
    video.oncanplay = () => video.play().catch(() => {});
    docFrag.appendChild(video);

    animateElement(video, {
      x: randomRange(-60, 60),
      y: randomRange(-40, 40),
      skewX: randomRange(-12, 12),
      scale: randomRange(0.9, 1.3),
      duration: randomRange(1.8, 3.6),
    });

    const jitter = gsap.to(video, {
      rotation: randomRange(-6, 6),
      scale: randomRange(1, 1.28),
      duration: randomRange(1.2, 2.2),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
    collageState.activeTweens.push(jitter);
  }
  layer.appendChild(docFrag);
}


function animateElement(target, opts = {}, fromProps) {
  if (typeof gsap === 'undefined' || !target) {
    return;
  }

  const timeline = gsap.timeline({
    repeat: -1,
    yoyo: true,
    defaults: { ease: 'sine.inOut' },
  });

  if (fromProps) {
    timeline.fromTo(target, fromProps, opts);
  } else {
    timeline.to(target, opts);
  }
  collageState.activeTweens.push(timeline);
}

function cleanupTweens() {
  collageState.activeTweens.forEach((tween) => {
    if (tween && typeof tween.kill === 'function') {
      tween.kill();
    }
  });
  collageState.activeTweens = [];
}

// Shuffle CSS variables so the shell gradient mutates with every reroll.
function mutateBackgroundColors() {
  const palette = createPalette();
  collageState.currentPalette = palette;
  const root = document.documentElement;
  root.style.setProperty('--bg-a', palette.frameA);
  root.style.setProperty('--bg-b', palette.frameB);
  root.style.setProperty('--board', palette.canvasTop);
  root.style.setProperty('--board-b', palette.canvasBottom);
  root.style.setProperty('--paper', palette.canvasTop); // WILD: dunkel statt hell
}

function initInfoWidget() {
  const stats = collageState.stats;
  stats.dom.button = document.getElementById('info-button');
  stats.dom.panel = document.getElementById('info-panel');
  stats.dom.count = document.getElementById('regen-count');
  stats.dom.timer = document.getElementById('waste-timer');

  if (!stats.dom.button || !stats.dom.panel) {
    return;
  }

  stats.startTime = Date.now();
  updateStatsUI();
  updateWasteTimer();

  stats.dom.button.addEventListener('click', () => toggleInfoPanel());
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      toggleInfoPanel(true);
    }
  });

  if (stats.timerInterval) {
    clearInterval(stats.timerInterval);
  }
  stats.timerInterval = setInterval(updateWasteTimer, 1000);
}

function toggleInfoPanel(forceClose = false) {
  const { panel, button } = collageState.stats.dom;
  if (!panel || !button) return;
  const isHidden = panel.hasAttribute('hidden');
  const shouldOpen = forceClose ? false : isHidden;
  if (shouldOpen) {
    panel.removeAttribute('hidden');
  } else {
    panel.setAttribute('hidden', '');
  }
  button.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
}

function recordGenerationEvent() {
  collageState.stats.regenCount += 1;
  updateStatsUI();
}

function updateStatsUI() {
  const { dom, regenCount } = collageState.stats;
  if (dom.count) {
    dom.count.textContent = regenCount.toString();
  }
}

function updateWasteTimer() {
  const stats = collageState.stats;
  if (!stats.startTime || !stats.dom.timer) {
    return;
  }
  const elapsedSeconds = Math.floor((Date.now() - stats.startTime) / 1000);
  stats.dom.timer.textContent = formatDuration(elapsedSeconds);
}

function formatDuration(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const parts = [
    hours > 0 ? String(hours).padStart(2, '0') : null,
    String(minutes).padStart(2, '0'),
    String(seconds).padStart(2, '0'),
  ].filter(Boolean);
  return parts.join(':');
}

function triggerAudio() {
  const tracks = collageState.manifest?.audio ?? [];
  if (!tracks.length || !collageState.audioEl) {
    return;
  }

  const currentTrack = collageState.lastAudioTrack || collageState.audioEl.dataset.src || null;
  const availableTracks =
    tracks.length > 1 ? tracks.filter((track) => track !== currentTrack) : tracks;
  const nextTrack = pickRandom(availableTracks.length ? availableTracks : tracks);

  if (!nextTrack) {
    return;
  }

  if (collageState.audioEl.dataset.src !== nextTrack) {
    collageState.audioEl.pause();
    collageState.audioEl.src = nextTrack;
    collageState.audioEl.dataset.src = nextTrack;
    collageState.audioEl.load();
    applyRandomAudioFx();
  }
  collageState.lastAudioTrack = nextTrack;
  if (collageState.audioCtx?.state === 'suspended') {
    collageState.audioCtx.resume().catch(() => {});
  }
  const attempt = collageState.audioEl.play();
  if (attempt && typeof attempt.catch === 'function') {
    attempt.catch(() => {
      // autoplay might be blocked; wait for user click
    });
  }
}

function createPalette() {
  // WILD: Neon + CMYK + Spektral für MAXIMALE Farbvielfalt
  const frameA = pickRandom(allColorSpectrum) || '#00ff41';
  const frameB = pickRandom(allColorSpectrum) || '#ff006e';
  const scheme = pickRandom(collageBackdrops) || collageBackdrops[0];
  const accent = pickRandom(allColorSpectrum) || '#00ff41';
  const support = pickRandom(allColorSpectrum) || '#ff006e';
  return {
    frameA,
    frameB,
    accent,
    support,
    ink: '#ffffff', // heller Strich für Neon-Effekt
    noise: pickRandom(allColorSpectrum),
    canvasTop: scheme.top,
    canvasBottom: scheme.bottom,
    fragments: [...allColorSpectrum],
    cmykSpectrum: [...allColorSpectrum, ...darkBase],
  };
}

// Sprinkle ASCII glitch characters into raw snippets.
function mutateText(text = '') {
  const fragments = text.split(' ');
  return fragments
    .map((fragment) => {
      if (Math.random() > 0.6) {
        return `${fragment}${pickRandom(['*', '+', '//', '#'])}`;
      }
      return fragment;
    })
    .join(' ');
}

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function pickRandom(arr = []) {
  if (!arr.length) {
    return undefined;
  }
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomClipPath() {
  const points = [];
  const segments = Math.floor(randomRange(4, 7));
  for (let i = 0; i < segments; i++) {
    points.push(`${Math.floor(randomRange(0, 100))}% ${Math.floor(randomRange(0, 100))}%`);
  }
  return `polygon(${points.join(',')})`;
}

function shuffleArray(list = []) {
  const clone = [...list];
  for (let i = clone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function getAccentColor(alpha = 1) {
  const color = pickRandom(accentPalette) || '#ffffff';
  return hexToRgba(color, alpha);
}

function getAccentSolid() {
  return pickRandom(accentPalette) || '#ffffff';
}

function hexToRgba(hex, alpha = 1) {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean
      .split('')
      .map((char) => char + char)
      .join('');
  }
  const num = parseInt(clean, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
