/**
 * ========================================================
 * WEBSITE TIỆM HOA CỦA BÉ IU - 20/10 TREND TIKTOK
 * Xử lý hiệu ứng mở cửa 3D, cắm hoa bay, thắt nơ,
 * thiệp chúc mừng kèm ảnh người yêu & âm nhạc
 * ========================================================
 */

// ========================================================
// ĐỊNH NGHĨA 8 VỊ TRÍ CẮM HOA NGHỆ THUẬT (BOUQUET_SLOTS)
// Đảm bảo hoa xòe tròn đều, cành lá vươn từ eo nơ (150, 260)
// ========================================================
const BOUQUET_SLOTS = [
  // 1. Đỉnh giữa cao nhất (Vương miện của bó hoa)
  {
    startX: 150, startY: 260,
    endX: 150, endY: 52,
    stemWidth: 4.0,
    leaves: [
      { d: 'M152,150 Q122,135 128,122 Q144,130 152,142 Z', fill: '#629c47' },
      { d: 'M154,125 Q184,110 178,98 Q166,106 153,118 Z', fill: '#629c47' },
      { d: 'M151,185 Q125,172 129,160 Q141,168 150,178 Z', fill: '#54863c' }
    ]
  },
  // 2. Cánh trung bên trái
  {
    startX: 145, startY: 260,
    endX: 88, endY: 108,
    stemWidth: 3.6,
    leaves: [
      { d: 'M135,215 Q75,182 62,132 Q82,154 124,196 Z', fill: '#6ba356' },
      { d: 'M110,146 Q86,125 88,110 Q104,124 112,138 Z', fill: '#588e45' }
    ]
  },
  // 3. Cánh trung bên phải
  {
    startX: 155, startY: 260,
    endX: 212, endY: 108,
    stemWidth: 3.6,
    leaves: [
      { d: 'M165,215 Q225,182 238,132 Q218,154 176,196 Z', fill: '#6ba356' },
      { d: 'M190,146 Q214,125 212,110 Q196,124 188,138 Z', fill: '#588e45' }
    ]
  },
  // 4. Vai cao bên trái
  {
    startX: 147, startY: 260,
    endX: 118, endY: 74,
    stemWidth: 3.5,
    leaves: [
      { d: 'M138,175 Q110,160 114,148 Q126,156 136,166 Z', fill: '#629c47' },
      { d: 'M128,130 Q102,118 106,108 Q118,116 126,124 Z', fill: '#6ba356' }
    ]
  },
  // 5. Vai cao bên phải
  {
    startX: 153, startY: 260,
    endX: 182, endY: 74,
    stemWidth: 3.5,
    leaves: [
      { d: 'M162,175 Q190,160 186,148 Q174,156 164,166 Z', fill: '#629c47' },
      { d: 'M172,130 Q198,118 194,108 Q182,116 174,124 Z', fill: '#6ba356' }
    ]
  },
  // 6. Cánh ngoài bên trái (thấp)
  {
    startX: 140, startY: 260,
    endX: 54, endY: 152,
    stemWidth: 3.2,
    leaves: [
      { d: 'M98,212 Q68,204 72,192 Q88,200 96,206 Z', fill: '#588e45' },
      { ellipse: { cx: 46, cy: 130, rx: 15, ry: 7.5, angle: -35, fill: '#4e803a' } }
    ]
  },
  // 7. Cánh ngoài bên phải (thấp)
  {
    startX: 160, startY: 260,
    endX: 246, endY: 152,
    stemWidth: 3.2,
    leaves: [
      { d: 'M202,212 Q232,204 228,192 Q212,200 204,206 Z', fill: '#588e45' },
      { ellipse: { cx: 254, cy: 130, rx: 15, ry: 7.5, angle: 35, fill: '#4e803a' } }
    ]
  },
  // 8. Trọng tâm phía trước ở giữa (Trái tim của bó hoa)
  {
    startX: 150, startY: 260,
    endX: 150, endY: 132,
    stemWidth: 3.8,
    leaves: [
      { d: 'M136,192 Q108,180 112,168 Q124,176 134,184 Z', fill: '#629c47' },
      { d: 'M164,192 Q192,180 188,168 Q176,176 166,184 Z', fill: '#629c47' }
    ]
  }
];

// Hàm tạo vector bông hoa theo từng loài hoa
function getFlowerBloomSVG(type, cx, cy) {
  switch (type) {
    case 'tulip':
      return `
        <g class="bloom-tulip" transform="translate(${cx}, ${cy})">
          <path d="M-13,14 C-19,-2 -9,-16 0,-10 C9,-16 19,-2 13,14 Z" fill="#9f1239" />
          <path d="M-12,12 C-7,-4 5,-12 0,-9 C10,-5 14,7 7,14 Z" fill="#e11d48" />
          <path d="M12,12 C7,-4 -5,-12 0,-9 C-10,-5 -14,7 -7,14 Z" fill="#f43f5e" />
          <path d="M-6,14 C-2,2 5,-5 0,-5 C7,-5 10,3 6,14 Z" fill="#fb7185" />
          <ellipse cx="0" cy="5" rx="3.5" ry="7" fill="#fda4af" opacity="0.6" />
        </g>`;

    case 'sunflower':
      return `
        <g class="bloom-sunflower" transform="translate(${cx}, ${cy})">
          <g fill="#f59e0b" stroke="#d97706" stroke-width="0.5">
            <ellipse cx="0" cy="-20" rx="3.8" ry="9" />
            <ellipse cx="7" cy="-18" rx="3.8" ry="9" transform="rotate(22.5 7 -18)" />
            <ellipse cx="14" cy="-14" rx="3.8" ry="9" transform="rotate(45 14 -14)" />
            <ellipse cx="18" cy="-7" rx="3.8" ry="9" transform="rotate(67.5 18 -7)" />
            <ellipse cx="20" cy="0" rx="3.8" ry="9" transform="rotate(90 20 0)" />
            <ellipse cx="18" cy="7" rx="3.8" ry="9" transform="rotate(112.5 18 7)" />
            <ellipse cx="14" cy="14" rx="3.8" ry="9" transform="rotate(135 14 14)" />
            <ellipse cx="7" cy="18" rx="3.8" ry="9" transform="rotate(157.5 7 18)" />
            <ellipse cx="0" cy="20" rx="3.8" ry="9" />
            <ellipse cx="-7" cy="18" rx="3.8" ry="9" transform="rotate(-157.5 -7 18)" />
            <ellipse cx="-14" cy="14" rx="3.8" ry="9" transform="rotate(-135 -14 14)" />
            <ellipse cx="-18" cy="7" rx="3.8" ry="9" transform="rotate(-112.5 -18 7)" />
            <ellipse cx="-20" cy="0" rx="3.8" ry="9" transform="rotate(-90 -20 0)" />
            <ellipse cx="-18" cy="-7" rx="3.8" ry="9" transform="rotate(-67.5 -18 -7)" />
            <ellipse cx="-14" cy="-14" rx="3.8" ry="9" transform="rotate(-45 -14 -14)" />
            <ellipse cx="-7" cy="-18" rx="3.8" ry="9" transform="rotate(-22.5 -7 -18)" />
          </g>
          <g fill="#fbbf24">
            <circle cx="0" cy="-13" r="2.8" />
            <circle cx="9" cy="-9" r="2.8" />
            <circle cx="13" cy="0" r="2.8" />
            <circle cx="9" cy="9" r="2.8" />
            <circle cx="0" cy="13" r="2.8" />
            <circle cx="-9" cy="9" r="2.8" />
            <circle cx="-13" cy="0" r="2.8" />
            <circle cx="-9" cy="-9" r="2.8" />
          </g>
          <circle cx="0" cy="0" r="10.5" fill="#451a03" stroke="#78350f" stroke-width="0.8" />
          <circle cx="-3" cy="-3" r="1.2" fill="#f59e0b" opacity="0.8" />
          <circle cx="3" cy="-3" r="1.2" fill="#f59e0b" opacity="0.8" />
          <circle cx="3" cy="3" r="1.2" fill="#f59e0b" opacity="0.8" />
          <circle cx="-3" cy="3" r="1.2" fill="#f59e0b" opacity="0.8" />
          <circle cx="0" cy="0" r="1.2" fill="#fcd34d" />
        </g>`;

    case 'rose':
      return `
        <g class="bloom-rose" transform="translate(${cx}, ${cy})">
          <circle cx="0" cy="0" r="21" fill="#e11d48" stroke="#9f1239" stroke-width="1.2" />
          <path d="M-10,-4 C-12,-13 -1,-16 8,-9 C16,-3 13,10 1,10 C-6,10 -12,3 -6,-4 C-1,-8 5,-6 5,-1 C5,4 -2,5 -3,2" fill="none" stroke="#ffe4e6" stroke-width="2.6" stroke-linecap="round" />
          <circle cx="0" cy="0" r="2.8" fill="#fecdd3" />
        </g>`;

    case 'daisy':
      return `
        <g class="bloom-daisy" transform="translate(${cx}, ${cy})">
          <g fill="#ffffff" stroke="#e2e8f0" stroke-width="0.8">
            <ellipse cx="0" cy="-13" rx="3.2" ry="6.5" />
            <ellipse cx="9" cy="-9" rx="3.2" ry="6.5" transform="rotate(45 9 -9)" />
            <ellipse cx="13" cy="0" rx="3.2" ry="6.5" transform="rotate(90 13 0)" />
            <ellipse cx="9" cy="9" rx="3.2" ry="6.5" transform="rotate(135 9 9)" />
            <ellipse cx="0" cy="13" rx="3.2" ry="6.5" />
            <ellipse cx="-9" cy="9" rx="3.2" ry="6.5" transform="rotate(-135 -9 9)" />
            <ellipse cx="-13" cy="0" rx="3.2" ry="6.5" transform="rotate(-90 -13 0)" />
            <ellipse cx="-9" cy="-9" rx="3.2" ry="6.5" transform="rotate(-45 -9 -9)" />
          </g>
          <circle cx="0" cy="0" r="6.5" fill="#fbbf24" stroke="#d97706" stroke-width="0.8" />
        </g>`;

    case 'baby':
      return `
        <g class="bloom-baby" transform="translate(${cx}, ${cy})">
          <line x1="0" y1="12" x2="-10" y2="-4" stroke="#4d7c3b" stroke-width="1.4" />
          <line x1="0" y1="12" x2="10" y2="-4" stroke="#4d7c3b" stroke-width="1.4" />
          <line x1="0" y1="12" x2="0" y2="-10" stroke="#4d7c3b" stroke-width="1.4" />
          <g fill="#ffffff" stroke="#cbd5e1" stroke-width="0.5">
            <circle cx="-12" cy="-6" r="3.8" />
            <circle cx="-16" cy="-12" r="3.2" />
            <circle cx="-6" cy="-14" r="3.4" />
            <circle cx="0" cy="-14" r="3.8" />
            <circle cx="6" cy="-16" r="3.2" />
            <circle cx="12" cy="-6" r="3.8" />
            <circle cx="16" cy="-12" r="3.4" />
            <circle cx="0" cy="-6" r="3" />
          </g>
          <circle cx="-12" cy="-6" r="0.9" fill="#fbbf24" />
          <circle cx="0" cy="-14" r="0.9" fill="#fbbf24" />
          <circle cx="12" cy="-6" r="0.9" fill="#fbbf24" />
        </g>`;

    default:
      return '';
  }
}

// Tạo toàn bộ một cành hoa (Cành vươn từ eo + Lá xanh + Bông hoa trên đỉnh)
function getSlotMarkup(slotIdx, flowerType, isAnimated = false) {
  const slot = BOUQUET_SLOTS[slotIdx];
  if (!slot) return '';

  let leavesMarkup = '';
  if (slot.leaves) {
    slot.leaves.forEach(leaf => {
      if (leaf.d) {
        leavesMarkup += `<path d="${leaf.d}" fill="${leaf.fill}" stroke="#4d7c3b" stroke-width="0.5" />`;
      } else if (leaf.ellipse) {
        leavesMarkup += `<ellipse cx="${leaf.ellipse.cx}" cy="${leaf.ellipse.cy}" rx="${leaf.ellipse.rx}" ry="${leaf.ellipse.ry}" transform="rotate(${leaf.ellipse.angle} ${leaf.ellipse.cx} ${leaf.ellipse.cy})" fill="${leaf.ellipse.fill}" />`;
      }
    });
  }

  const bloomMarkup = getFlowerBloomSVG(flowerType, slot.endX, slot.endY);
  const animClass = isAnimated ? ' class="picker-stem-slot"' : '';

  return `
    <g id="bouquet-slot-item-${slotIdx}"${animClass}>
      <!-- Cành xanh vươn từ eo lên bông hoa -->
      <line x1="${slot.startX}" y1="${slot.startY}" x2="${slot.endX}" y2="${slot.endY + 14}" stroke="#4d7c3b" stroke-width="${slot.stemWidth}" stroke-linecap="round" />
      <!-- Các lá xanh của cành -->
      ${leavesMarkup}
      <!-- Bông hoa nở rộ trên đỉnh cành -->
      ${bloomMarkup}
    </g>`;
}

// Hàm render toàn bộ mảng hoa đã chọn vào bất kỳ bó hoa nào (Step 2, Step 3, Step 4)
function renderBouquetStems(container, flowerTypesArray) {
  if (!container) return;
  let html = '';
  flowerTypesArray.forEach((type, idx) => {
    if (idx < BOUQUET_SLOTS.length) {
      html += getSlotMarkup(idx, type, false);
    }
  });
  container.innerHTML = html;
}

// Preview clone khi hoa bay từ kệ vào bó
const FLOWER_PREVIEWS = {
  tulip: `<svg viewBox="-25 -25 50 50" width="48" height="48">${getFlowerBloomSVG('tulip', 0, 0)}</svg>`,
  sunflower: `<svg viewBox="-25 -25 50 50" width="50" height="50">${getFlowerBloomSVG('sunflower', 0, 0)}</svg>`,
  rose: `<svg viewBox="-25 -25 50 50" width="48" height="48">${getFlowerBloomSVG('rose', 0, 0)}</svg>`,
  daisy: `<svg viewBox="-25 -25 50 50" width="46" height="46">${getFlowerBloomSVG('daisy', 0, 0)}</svg>`,
  baby: `<svg viewBox="-25 -25 50 50" width="46" height="46">${getFlowerBloomSVG('baby', 0, 0)}</svg>`
};

// ========================================================
// 1. WEB AUDIO API SYNTHESIZER & SOUND EFFECTS
// ========================================================
class SoundFX {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Tiếng chuông cửa leng keng khi chạm tiệm hoa
  playDoorChime() {
    this.init();
    if (!this.ctx) return;

    const playTone = (freq, delay) => {
      setTimeout(() => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.9);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.9);
      }, delay);
    };

    playTone(880, 0);   // A5
    playTone(1174, 180); // D6
  }

  // Tiếng khi nhấp chọn 1 bông hoa bay vào bó
  playPop() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  // Tiếng ăn mừng thắt nơ thành công
  playCelebration() {
    this.init();
    if (!this.ctx) return;
    const chords = [523.25, 659.25, 783.99, 1046.50]; // C - E - G - C
    chords.forEach((freq, idx) => {
      setTimeout(() => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.8);
      }, idx * 120);
    });
  }
}

// ========================================================
// 2. MÁY PHÁT NHẠC NỀN LÃNG MẠN
// ========================================================
class BackgroundMusic {
  constructor() {
    this.audio = new Audio();
    this.audio.loop = true;
    this.audio.volume = 0.6;
    this.sources = [
      "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3",
      "assets/music/romantic.mp3"
    ];
    this.currentIdx = 0;
    this.audio.src = this.sources[0];
    this.isPlaying = false;

    this.btn = document.getElementById('music-btn');
    this.btnText = document.getElementById('music-text');

    if (this.btn) {
      this.btn.addEventListener('click', () => this.toggle());
    }

    this.audio.addEventListener('error', () => {
      this.currentIdx++;
      if (this.currentIdx < this.sources.length) {
        this.audio.src = this.sources[this.currentIdx];
        if (this.isPlaying) this.audio.play();
      }
    });
  }

  play() {
    this.isPlaying = true;
    if (this.btn) this.btn.classList.add('playing');
    if (this.btnText) this.btnText.innerText = "Đang phát nhạc";
    this.audio.play().catch(() => {});
  }

  pause() {
    this.isPlaying = false;
    if (this.btn) this.btn.classList.remove('playing');
    if (this.btnText) this.btnText.innerText = "Bật nhạc chill";
    this.audio.pause();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }
}

// ========================================================
// 3. HIỆU ỨNG CANVAS HẠT BỤI SÁNG LUNG LINH
// ========================================================
class AmbientSparkles {
  constructor() {
    this.canvas = document.getElementById('ambient-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.maxParticles = 30;
    this.resize();
    window.addEventListener('resize', () => this.resize());

    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.createParticle());
    }
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  createParticle() {
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.6 + 0.2,
      speedY: -(Math.random() * 0.8 + 0.3),
      speedX: (Math.random() - 0.5) * 0.5
    };
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = '#ff758c';

    for (let p of this.particles) {
      p.y += p.speedY;
      p.x += p.speedX;

      if (p.y < -10) {
        p.y = this.height + 10;
        p.x = Math.random() * this.width;
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.animate());
  }
}

// ========================================================
// 4. CHUYỂN ĐỔI GIỮA CÁC STEP (SCENE MANAGER)
// ========================================================
class SceneManager {
  constructor() {
    this.scenes = {
      shop: document.getElementById('scene-shop'),
      picker: document.getElementById('scene-picker'),
      ribbon: document.getElementById('scene-ribbon'),
      final: document.getElementById('scene-final')
    };
  }

  switchScene(fromName, toName) {
    const fromEl = this.scenes[fromName];
    const toEl = this.scenes[toName];

    if (fromEl) {
      fromEl.style.transition = 'opacity 0.6s ease';
      fromEl.style.opacity = '0';

      setTimeout(() => {
        fromEl.classList.remove('active');
        fromEl.style.display = 'none';

        if (toEl) {
          toEl.style.display = 'block';
          toEl.style.opacity = '0';
          toEl.style.transition = 'opacity 0.7s ease';
          // Trigger reflow
          void toEl.offsetWidth;
          toEl.classList.add('active');
          toEl.style.opacity = '1';
        }
      }, 550);
    }
  }
}

// ========================================================
// 5. QUẢN LÝ TIỆM HOA & LOGIC CẮM HOA
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  const soundFX = new SoundFX();
  const bgMusic = new BackgroundMusic();
  const sparkles = new AmbientSparkles();
  const sceneMgr = new SceneManager();

  let selectedFlowerCount = 0;
  const maxFlowerTarget = 8;
  const selectedFlowerTypes = [];

  // ------------------------------------------------------
  // STEP 1: MỞ CỬA TIỆM HOA
  // ------------------------------------------------------
  const facadeTrigger = document.getElementById('facade-trigger');
  const doorLeaf = document.getElementById('door-leaf-anim');
  const doorBell = document.getElementById('door-bell-btn');
  const enterHint = document.getElementById('btn-enter-shop-hint');

  const openShopAction = () => {
    // Kêu chuông leng keng
    soundFX.playDoorChime();
    // Bật nhạc nền
    bgMusic.play();

    // Mở cánh cửa 3D
    if (doorLeaf) {
      doorLeaf.classList.add('open');
    }

    // Sau khi cửa mở, chuyển sang Scene 2 (Bàn cắm hoa)
    setTimeout(() => {
      sceneMgr.switchScene('shop', 'picker');
    }, 1100);
  };

  if (facadeTrigger) facadeTrigger.addEventListener('click', openShopAction);
  if (doorBell) doorBell.addEventListener('click', openShopAction);
  if (enterHint) enterHint.addEventListener('click', openShopAction);

  // ------------------------------------------------------
  // STEP 2: CHỌN HOA & HIỆU ỨNG BAY VÀO BÓ HOA CHUẨN XÁC 100%
  // ------------------------------------------------------
  const flowerItems = document.querySelectorAll('.flower-option-item');
  const flowerCounterNum = document.getElementById('flower-counter-num');
  const pickerBouquetSvg = document.getElementById('picker-bouquet-svg');
  const pickerBouquetStems = document.getElementById('picker-bouquet-stems');
  const ribbonBouquetStemsContainer = document.getElementById('ribbon-bouquet-stems-container');
  const finalBouquetStemsContainer = document.getElementById('final-bouquet-stems-container');

  // Khởi tạo bó hoa mẫu ban đầu cho Step 3 và Step 4
  const defaultFlowers = ['tulip', 'sunflower', 'rose', 'rose', 'daisy', 'daisy', 'baby', 'tulip'];
  renderBouquetStems(ribbonBouquetStemsContainer, defaultFlowers);
  renderBouquetStems(finalBouquetStemsContainer, defaultFlowers);

  flowerItems.forEach(item => {
    item.addEventListener('click', (e) => {
      if (selectedFlowerCount >= maxFlowerTarget) return;

      const flowerType = item.getAttribute('data-flower');
      soundFX.playPop();

      const slotIdx = selectedFlowerCount;
      const targetSlot = BOUQUET_SLOTS[slotIdx];

      // Tọa độ bắt đầu bay từ kệ hoa
      const rect = item.getBoundingClientRect();
      const startX = rect.left + rect.width / 2;
      const startY = rect.top + 25;

      // Tính chính xác tọa độ đích trên màn hình tương ứng với điểm đích của slot trong SVG
      let endX = window.innerWidth / 2;
      let endY = window.innerHeight / 2;

      if (pickerBouquetSvg && targetSlot) {
        const pt = pickerBouquetSvg.createSVGPoint();
        pt.x = targetSlot.endX;
        pt.y = targetSlot.endY;
        const screenPt = pt.matrixTransform(pickerBouquetSvg.getScreenCTM());
        endX = screenPt.x;
        endY = screenPt.y;
      }

      // Tạo clone bông hoa bay
      const flyingClone = document.createElement('div');
      flyingClone.className = 'flying-flower-clone';
      flyingClone.innerHTML = FLOWER_PREVIEWS[flowerType] || '🌸';
      flyingClone.style.left = `${startX}px`;
      flyingClone.style.top = `${startY}px`;
      flyingClone.style.transform = 'translate(-50%, -50%) scale(1)';
      document.body.appendChild(flyingClone);

      // Kích hoạt animation bay vút vào đúng vị trí của slot trong bó hoa
      requestAnimationFrame(() => {
        flyingClone.style.left = `${endX}px`;
        flyingClone.style.top = `${endY}px`;
        flyingClone.style.transform = 'translate(-50%, -50%) scale(0.9) rotate(15deg)';
      });

      // Khi hoa bay tới nơi
      setTimeout(() => {
        if (flyingClone.parentNode) flyingClone.parentNode.removeChild(flyingClone);

        selectedFlowerCount++;
        selectedFlowerTypes.push(flowerType);
        if (flowerCounterNum) flowerCounterNum.innerText = selectedFlowerCount;

        // Thêm cành hoa hoàn chỉnh (cành vươn từ eo + lá xanh + bông hoa) vào bó hoa
        if (pickerBouquetStems) {
          const slotMarkup = getSlotMarkup(slotIdx, flowerType, true);
          pickerBouquetStems.insertAdjacentHTML('beforeend', slotMarkup);
        }

        // Đủ 8 bông hoa -> Đồng bộ cập nhật Step 3 và Step 4 bằng chính các bông hoa người dùng đã chọn
        if (selectedFlowerCount >= maxFlowerTarget) {
          renderBouquetStems(ribbonBouquetStemsContainer, selectedFlowerTypes);
          renderBouquetStems(finalBouquetStemsContainer, selectedFlowerTypes);

          setTimeout(() => {
            sceneMgr.switchScene('picker', 'ribbon');
          }, 850);
        }
      }, 720);
    });
  });

  // ------------------------------------------------------
  // STEP 3: THẮT CHIẾC NƠ GỬI TRỌN YÊU THƯƠNG
  // ------------------------------------------------------
  const btnTieRibbon = document.getElementById('btn-tie-ribbon');
  if (btnTieRibbon) {
    btnTieRibbon.addEventListener('click', () => {
      soundFX.playCelebration();
      triggerConfetti();

      btnTieRibbon.innerHTML = '✨ Đã thắt nơ xinh xắn! Chờ xíu nhé...';
      btnTieRibbon.style.background = '#48bb78';

      setTimeout(() => {
        sceneMgr.switchScene('ribbon', 'final');
      }, 900);
    });
  }

  // Hiệu ứng pháo hoa giấy hoa lá bung tỏa
  function triggerConfetti() {
    const icons = ['🌸', '💖', '🎀', '✨', '🌹', '🌷'];
    for (let i = 0; i < 35; i++) {
      setTimeout(() => {
        const item = document.createElement('div');
        item.innerText = icons[Math.floor(Math.random() * icons.length)];
        item.style.position = 'fixed';
        item.style.left = `${window.innerWidth / 2 + (Math.random() - 0.5) * 120}px`;
        item.style.top = `${window.innerHeight / 2}px`;
        item.style.fontSize = `${Math.random() * 16 + 14}px`;
        item.style.zIndex = '99999';
        item.style.pointerEvents = 'none';
        item.style.transition = 'all 1.6s cubic-bezier(0.1, 0.8, 0.3, 1)';
        document.body.appendChild(item);

        requestAnimationFrame(() => {
          const moveX = (Math.random() - 0.5) * window.innerWidth * 0.7;
          const moveY = -(Math.random() * 300 + 150);
          item.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${Math.random() * 360}deg) scale(1.3)`;
          item.style.opacity = '0';
        });

        setTimeout(() => {
          if (item.parentNode) item.parentNode.removeChild(item);
        }, 1600);
      }, i * 25);
    }
  }

  // ------------------------------------------------------
  // STEP 4: THIỆP CHÚC MỪNG VỚI ẢNH POLAROID NGƯỜI YÊU
  // ------------------------------------------------------
  const cardPolaroidFrame = document.getElementById('card-polaroid-frame');
  const imageLightboxModal = document.getElementById('image-lightbox-modal');
  const btnCloseLightbox = document.getElementById('btn-close-lightbox');

  const openLightbox = () => {
    if (imageLightboxModal) {
      imageLightboxModal.classList.add('active');
    }
  };

  const closeLightbox = () => {
    if (imageLightboxModal) {
      imageLightboxModal.classList.remove('active');
    }
  };

  if (cardPolaroidFrame) {
    cardPolaroidFrame.addEventListener('click', openLightbox);
  }

  if (btnCloseLightbox) {
    btnCloseLightbox.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });
  }

  if (imageLightboxModal) {
    imageLightboxModal.addEventListener('click', (e) => {
      if (e.target === imageLightboxModal) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageLightboxModal && imageLightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });
});

