/**
 * TrickDex Animated Trick Diagrams
 * SVG + CSS animations showing board rotation and foot placement
 */

const TRICK_ANIMATIONS = {
  'ollie': {
    frames: [
      { board: 0, height: 0, backFoot: 'tail-pop', frontFoot: 'flat', label: 'Crouch & prepare' },
      { board: -15, height: 10, backFoot: 'snap', frontFoot: 'sliding', label: 'Pop the tail' },
      { board: -5, height: 40, backFoot: 'rising', frontFoot: 'drag-up', label: 'Slide front foot up' },
      { board: 0, height: 55, backFoot: 'tucked', frontFoot: 'leveled', label: 'Level out at peak' },
      { board: 0, height: 20, backFoot: 'extending', frontFoot: 'extending', label: 'Prepare to land' },
      { board: 0, height: 0, backFoot: 'landed', frontFoot: 'landed', label: 'Land & roll away' },
    ],
    rotationAxis: 'none',
    flipCount: 0,
    shuvCount: 0,
  },
  'kickflip': {
    frames: [
      { board: 0, height: 0, flip: 0, backFoot: 'tail-pop', frontFoot: 'angled', label: 'Setup: front foot angled' },
      { board: -15, height: 10, flip: 0, backFoot: 'snap', frontFoot: 'flicking', label: 'Pop & start flick' },
      { board: 0, height: 40, flip: 90, backFoot: 'rising', frontFoot: 'off-board', label: 'Flick off heelside edge' },
      { board: 0, height: 55, flip: 180, backFoot: 'tucked', frontFoot: 'above', label: 'Board flips underneath' },
      { board: 0, height: 50, flip: 270, backFoot: 'catching', frontFoot: 'above', label: 'Spot the grip tape' },
      { board: 0, height: 35, flip: 360, backFoot: 'on-board', frontFoot: 'catching', label: 'Catch it!' },
      { board: 0, height: 0, flip: 360, backFoot: 'landed', frontFoot: 'landed', label: 'Land & roll away' },
    ],
    rotationAxis: 'heelside',
    flipCount: 1,
    shuvCount: 0,
  },
  'heelflip': {
    frames: [
      { board: 0, height: 0, flip: 0, backFoot: 'tail-pop', frontFoot: 'toes-hanging', label: 'Setup: toes over edge' },
      { board: -15, height: 10, flip: 0, backFoot: 'snap', frontFoot: 'flicking', label: 'Pop & kick out' },
      { board: 0, height: 40, flip: -90, backFoot: 'rising', frontFoot: 'off-board', label: 'Flick off toeside edge' },
      { board: 0, height: 55, flip: -180, backFoot: 'tucked', frontFoot: 'above', label: 'Board flips toeside' },
      { board: 0, height: 50, flip: -270, backFoot: 'catching', frontFoot: 'above', label: 'Spot the grip' },
      { board: 0, height: 35, flip: -360, backFoot: 'on-board', frontFoot: 'catching', label: 'Catch & stomp' },
      { board: 0, height: 0, flip: -360, backFoot: 'landed', frontFoot: 'landed', label: 'Roll away clean' },
    ],
    rotationAxis: 'toeside',
    flipCount: 1,
    shuvCount: 0,
  },
  'pop-shuvit': {
    frames: [
      { board: 0, height: 0, shuv: 0, backFoot: 'tail-scoop', frontFoot: 'flat', label: 'Back foot on tail edge' },
      { board: -10, height: 8, shuv: 0, backFoot: 'scooping', frontFoot: 'lifting', label: 'Scoop the tail back' },
      { board: 0, height: 35, shuv: 60, backFoot: 'rising', frontFoot: 'above', label: 'Board spins 180°' },
      { board: 0, height: 45, shuv: 120, backFoot: 'above', frontFoot: 'above', label: 'Stay above the board' },
      { board: 0, height: 35, shuv: 180, backFoot: 'catching', frontFoot: 'catching', label: 'Catch over bolts' },
      { board: 0, height: 0, shuv: 180, backFoot: 'landed', frontFoot: 'landed', label: 'Stomp it!' },
    ],
    rotationAxis: 'none',
    flipCount: 0,
    shuvCount: 180,
  },
  'tre-flip': {
    frames: [
      { board: 0, height: 0, flip: 0, shuv: 0, backFoot: 'tail-scoop', frontFoot: 'angled', label: 'Scoop position + flick angle' },
      { board: -15, height: 10, flip: 0, shuv: 0, backFoot: 'scoop-flick', frontFoot: 'flicking', label: 'Scoop hard + front flick' },
      { board: 0, height: 35, flip: 90, shuv: 90, backFoot: 'rising', frontFoot: 'off-board', label: 'Board flips + spins' },
      { board: 0, height: 55, flip: 180, shuv: 180, backFoot: 'tucked', frontFoot: 'above', label: 'Full rotation happening' },
      { board: 0, height: 50, flip: 270, shuv: 270, backFoot: 'above', frontFoot: 'above', label: 'Almost there...' },
      { board: 0, height: 40, flip: 360, shuv: 360, backFoot: 'catching', frontFoot: 'catching', label: 'Catch! 360 flip + kickflip' },
      { board: 0, height: 0, flip: 360, shuv: 360, backFoot: 'landed', frontFoot: 'landed', label: '🔥 Stomped!' },
    ],
    rotationAxis: 'heelside',
    flipCount: 1,
    shuvCount: 360,
  },
  'bs-180': {
    frames: [
      { board: 0, height: 0, bodyRot: 0, backFoot: 'tail-pop', frontFoot: 'flat', label: 'Wind up shoulders' },
      { board: -15, height: 10, bodyRot: 30, backFoot: 'snap', frontFoot: 'guiding', label: 'Pop & start turning BS' },
      { board: 0, height: 40, bodyRot: 90, backFoot: 'rising', frontFoot: 'guiding', label: 'Shoulders lead rotation' },
      { board: 0, height: 50, bodyRot: 135, backFoot: 'tucked', frontFoot: 'guiding', label: 'Commit to the 180' },
      { board: 0, height: 30, bodyRot: 180, backFoot: 'extending', frontFoot: 'extending', label: 'Complete the rotation' },
      { board: 0, height: 0, bodyRot: 180, backFoot: 'landed', frontFoot: 'landed', label: 'Land fakie & roll' },
    ],
    rotationAxis: 'backside',
    flipCount: 0,
    shuvCount: 0,
    bodyRotation: 180,
  },
  'fs-180': {
    frames: [
      { board: 0, height: 0, bodyRot: 0, backFoot: 'tail-pop', frontFoot: 'flat', label: 'Wind up frontside' },
      { board: -15, height: 10, bodyRot: -30, backFoot: 'snap', frontFoot: 'guiding', label: 'Pop & open shoulders' },
      { board: 0, height: 40, bodyRot: -90, backFoot: 'rising', frontFoot: 'guiding', label: 'Rotate frontside' },
      { board: 0, height: 50, bodyRot: -135, backFoot: 'tucked', frontFoot: 'guiding', label: 'Keep turning' },
      { board: 0, height: 30, bodyRot: -180, backFoot: 'extending', frontFoot: 'extending', label: 'Complete 180' },
      { board: 0, height: 0, bodyRot: -180, backFoot: 'landed', frontFoot: 'landed', label: 'Land fakie!' },
    ],
    rotationAxis: 'frontside',
    flipCount: 0,
    shuvCount: 0,
    bodyRotation: -180,
  },
  'manual': {
    frames: [
      { board: 0, height: 0, tilt: 0, backFoot: 'on-tail', frontFoot: 'flat', label: 'Rolling along' },
      { board: 0, height: 0, tilt: -8, backFoot: 'pressing', frontFoot: 'light', label: 'Shift weight back' },
      { board: 0, height: 0, tilt: -15, backFoot: 'balancing', frontFoot: 'lifted', label: 'Front trucks up!' },
      { board: 0, height: 0, tilt: -13, backFoot: 'balancing', frontFoot: 'adjusting', label: 'Find the balance point' },
      { board: 0, height: 0, tilt: -15, backFoot: 'balancing', frontFoot: 'adjusting', label: 'Hold it...' },
      { board: 0, height: 0, tilt: 0, backFoot: 'flat', frontFoot: 'flat', label: 'Set it down clean' },
    ],
    rotationAxis: 'none',
    flipCount: 0,
    shuvCount: 0,
  },
  'impossible': {
    frames: [
      { board: 0, height: 0, wrap: 0, backFoot: 'wrapped', frontFoot: 'flat', label: 'Foot wraps tail' },
      { board: -10, height: 10, wrap: 0, backFoot: 'scooping-up', frontFoot: 'lifting', label: 'Scoop vertically' },
      { board: 0, height: 40, wrap: 90, backFoot: 'guiding', frontFoot: 'off-board', label: 'Board wraps around foot' },
      { board: 0, height: 55, wrap: 180, backFoot: 'guiding', frontFoot: 'above', label: 'Full vertical wrap' },
      { board: 0, height: 45, wrap: 270, backFoot: 'guiding', frontFoot: 'above', label: 'Coming back around' },
      { board: 0, height: 30, wrap: 360, backFoot: 'catching', frontFoot: 'catching', label: 'Unwrap & catch' },
      { board: 0, height: 0, wrap: 360, backFoot: 'landed', frontFoot: 'landed', label: 'Clean impossible!' },
    ],
    rotationAxis: 'vertical-wrap',
    flipCount: 1,
    shuvCount: 0,
  },
  'drop-in': {
    frames: [
      { board: 0, height: 0, tilt: -30, backFoot: 'on-tail', frontFoot: 'above', label: 'Tail on coping' },
      { board: 0, height: 0, tilt: -20, backFoot: 'pressing', frontFoot: 'hovering', label: 'Lean forward!' },
      { board: 0, height: 0, tilt: -10, backFoot: 'pressing', frontFoot: 'stomping', label: 'STOMP the front' },
      { board: 0, height: 0, tilt: -40, backFoot: 'riding', frontFoot: 'riding', label: 'Commit down the ramp' },
      { board: 0, height: 0, tilt: -20, backFoot: 'riding', frontFoot: 'riding', label: 'Knees bent, ride it' },
      { board: 0, height: 0, tilt: 0, backFoot: 'riding', frontFoot: 'riding', label: 'Rolling in the bowl!' },
    ],
    rotationAxis: 'none',
    flipCount: 0,
    shuvCount: 0,
  },
};

function generateDiagramSVG(trickId, frameIndex) {
  const anim = TRICK_ANIMATIONS[trickId];
  if (!anim) return '';
  const frame = anim.frames[frameIndex];
  const flip = frame.flip || 0;
  const shuv = frame.shuv || 0;
  const bodyRot = frame.bodyRot || 0;
  const tilt = frame.tilt || 0;
  const wrap = frame.wrap || 0;
  const h = frame.height || 0;

  // Board dimensions and position
  const boardY = 130 - h;
  const boardAngle = frame.board + tilt;

  // Calculate board visual based on flip (perspective effect)
  const flipRad = (flip * Math.PI) / 180;
  const shuvRad = (shuv * Math.PI) / 180;
  const boardScaleY = Math.cos(flipRad);  // flip makes board thin
  const boardScaleX = Math.cos(shuvRad);  // shuv rotates horizontally
  const wrapRad = (wrap * Math.PI) / 180;
  const wrapScale = wrap ? Math.cos(wrapRad) : 1;

  // Show grip tape (top) vs bottom based on flip angle
  const showGrip = Math.cos(flipRad) >= 0;
  const gripColor = showGrip ? '#333' : '#c95020';
  const boardColor = showGrip ? '#444' : '#d4873f';

  // Foot positions
  const frontFootX = 105 + (bodyRot ? bodyRot * 0.15 : 0);
  const backFootX = 195 + (bodyRot ? bodyRot * 0.15 : 0);
  const isOffBoard = frame.frontFoot === 'off-board' || frame.frontFoot === 'above';
  const frontFootY = isOffBoard ? boardY - 25 : boardY - 8;
  const backFootY = frame.backFoot === 'rising' || frame.backFoot === 'tucked' || frame.backFoot === 'above' ? boardY - 20 : boardY - 8;

  // Ground
  const groundY = 145;

  return `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:400px">
    <!-- Ground -->
    <line x1="20" y1="${groundY}" x2="280" y2="${groundY}" stroke="#333" stroke-width="2" stroke-dasharray="8,4"/>

    <!-- Shadow -->
    <ellipse cx="150" cy="${groundY - 2}" rx="${55 * Math.abs(boardScaleX)}" ry="4" fill="rgba(255,107,53,${0.15 - h * 0.002})" />

    <!-- Board -->
    <g transform="translate(150, ${boardY}) rotate(${boardAngle})">
      <g transform="scale(${Math.abs(boardScaleX) * (wrap ? Math.abs(wrapScale) : 1)}, ${Math.abs(boardScaleY)})">
        <!-- Deck -->
        <rect x="-55" y="-6" width="110" height="12" rx="6" fill="${boardColor}" />
        <!-- Grip tape -->
        <rect x="-50" y="-5" width="100" height="5" rx="3" fill="${gripColor}" />
        <!-- Trucks -->
        <rect x="-38" y="6" width="16" height="4" rx="1" fill="#777"/>
        <rect x="22" y="6" width="16" height="4" rx="1" fill="#777"/>
        <!-- Wheels -->
        <circle cx="-38" cy="13" r="5" fill="#ddd" opacity="0.9"/>
        <circle cx="-22" cy="13" r="5" fill="#ddd" opacity="0.9"/>
        <circle cx="22" cy="13" r="5" fill="#ddd" opacity="0.9"/>
        <circle cx="38" cy="13" r="5" fill="#ddd" opacity="0.9"/>
        <!-- Nose/tail markers -->
        <circle cx="-48" cy="0" r="2" fill="var(--accent, #ff6b35)" opacity="0.7"/>
        <circle cx="48" cy="0" r="2" fill="var(--accent2, #ffd166)" opacity="0.7"/>
      </g>
    </g>

    <!-- Feet -->
    ${frame.frontFoot !== 'off-board' ? `<ellipse cx="${frontFootX - (bodyRot || 0) * 0.3}" cy="${frontFootY}" rx="14" ry="6" fill="#4ecdc4" opacity="0.85" transform="rotate(${boardAngle + (frame.frontFoot === 'angled' ? -15 : frame.frontFoot === 'toes-hanging' ? 10 : 0)}, ${frontFootX}, ${frontFootY})"/>` : ''}
    ${frame.frontFoot === 'off-board' ? `<ellipse cx="${frontFootX + 20}" cy="${frontFootY - 10}" rx="12" ry="5" fill="#4ecdc4" opacity="0.5" transform="rotate(-30, ${frontFootX + 20}, ${frontFootY - 10})"/>` : ''}

    <ellipse cx="${backFootX - (bodyRot || 0) * 0.3}" cy="${backFootY}" rx="14" ry="6" fill="#ff6b35" opacity="0.85" transform="rotate(${boardAngle}, ${backFootX}, ${backFootY})"/>

    <!-- Rotation arrows -->
    ${flip && frameIndex > 0 && frameIndex < anim.frames.length - 1 ? `<path d="M 170 ${boardY - 30} A 15 15 0 0 ${flip > 0 ? 1 : 0} 185 ${boardY - 25}" fill="none" stroke="#ffd166" stroke-width="1.5" marker-end="url(#arrowY)"/>` : ''}
    ${shuv && frameIndex > 0 && frameIndex < anim.frames.length - 1 ? `<path d="M 130 ${boardY + 20} A 20 10 0 0 1 170 ${boardY + 20}" fill="none" stroke="#4ecdc4" stroke-width="1.5" marker-end="url(#arrowG)"/>` : ''}
    ${bodyRot && frameIndex > 0 && frameIndex < anim.frames.length - 1 ? `<path d="M 140 ${boardY - 35} A 20 20 0 0 ${bodyRot > 0 ? 1 : 0} 160 ${boardY - 35}" fill="none" stroke="#ff6b35" stroke-width="1.5" marker-end="url(#arrowO)"/>` : ''}

    <defs>
      <marker id="arrowY" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#ffd166"/></marker>
      <marker id="arrowG" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#4ecdc4"/></marker>
      <marker id="arrowO" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#ff6b35"/></marker>
    </defs>

    <!-- Legend -->
    <text x="150" y="170" text-anchor="middle" fill="#888" font-size="11" font-family="sans-serif">${frame.label}</text>

    <!-- Foot legend -->
    <circle cx="25" cy="12" r="4" fill="#4ecdc4" opacity="0.85"/>
    <text x="33" y="16" fill="#888" font-size="9" font-family="sans-serif">Front</text>
    <circle cx="75" cy="12" r="4" fill="#ff6b35" opacity="0.85"/>
    <text x="83" y="16" fill="#888" font-size="9" font-family="sans-serif">Back</text>
  </svg>`;
}

function createAnimationPlayer(trickId) {
  const anim = TRICK_ANIMATIONS[trickId];
  if (!anim) return '';

  const totalFrames = anim.frames.length;
  const playerId = `anim-${trickId}-${Date.now()}`;

  // Build info badges
  const badges = [];
  if (anim.flipCount) badges.push(`<span class="anim-badge flip">${anim.rotationAxis === 'toeside' ? '↩️' : '↪️'} ${anim.flipCount > 1 ? anim.flipCount + 'x ' : ''}Flip</span>`);
  if (anim.shuvCount) badges.push(`<span class="anim-badge shuv">🔄 ${anim.shuvCount}° Shuv</span>`);
  if (anim.bodyRotation) badges.push(`<span class="anim-badge body">🧭 ${Math.abs(anim.bodyRotation)}° ${anim.bodyRotation > 0 ? 'BS' : 'FS'}</span>`);
  if (!anim.flipCount && !anim.shuvCount && !anim.bodyRotation) badges.push(`<span class="anim-badge basic">🛹 Foundation</span>`);

  return `
    <div class="trick-animation" id="${playerId}">
      <div class="anim-badges">${badges.join('')}</div>
      <div class="anim-stage">${generateDiagramSVG(trickId, 0)}</div>
      <div class="anim-controls">
        <button class="anim-btn" onclick="trickAnimStep('${playerId}','${trickId}',-1)">⏮</button>
        <button class="anim-btn anim-play" onclick="trickAnimToggle('${playerId}','${trickId}')">▶</button>
        <button class="anim-btn" onclick="trickAnimStep('${playerId}','${trickId}',1)">⏭</button>
        <span class="anim-frame-label">1 / ${totalFrames}</span>
      </div>
      <div class="anim-timeline">
        ${anim.frames.map((f, i) => `<div class="anim-dot${i === 0 ? ' active' : ''}" onclick="trickAnimGoTo('${playerId}','${trickId}',${i})"></div>`).join('')}
      </div>
    </div>`;
}

// Animation state
const animState = {};

window.trickAnimStep = function(playerId, trickId, dir) {
  const anim = TRICK_ANIMATIONS[trickId];
  if (!anim) return;
  if (!animState[playerId]) animState[playerId] = { frame: 0, playing: false, interval: null };
  const st = animState[playerId];
  st.frame = Math.max(0, Math.min(anim.frames.length - 1, st.frame + dir));
  renderAnimFrame(playerId, trickId);
};

window.trickAnimGoTo = function(playerId, trickId, frame) {
  if (!animState[playerId]) animState[playerId] = { frame: 0, playing: false, interval: null };
  animState[playerId].frame = frame;
  renderAnimFrame(playerId, trickId);
};

window.trickAnimToggle = function(playerId, trickId) {
  const anim = TRICK_ANIMATIONS[trickId];
  if (!anim) return;
  if (!animState[playerId]) animState[playerId] = { frame: 0, playing: false, interval: null };
  const st = animState[playerId];

  if (st.playing) {
    clearInterval(st.interval);
    st.playing = false;
    document.querySelector(`#${playerId} .anim-play`).textContent = '▶';
  } else {
    st.playing = true;
    document.querySelector(`#${playerId} .anim-play`).textContent = '⏸';
    if (st.frame >= anim.frames.length - 1) st.frame = 0;
    st.interval = setInterval(() => {
      st.frame++;
      if (st.frame >= anim.frames.length) {
        st.frame = 0; // loop
      }
      renderAnimFrame(playerId, trickId);
    }, 600);
  }
};

function renderAnimFrame(playerId, trickId) {
  const anim = TRICK_ANIMATIONS[trickId];
  const st = animState[playerId];
  const el = document.getElementById(playerId);
  if (!el || !anim) return;

  el.querySelector('.anim-stage').innerHTML = generateDiagramSVG(trickId, st.frame);
  el.querySelector('.anim-frame-label').textContent = `${st.frame + 1} / ${anim.frames.length}`;
  el.querySelectorAll('.anim-dot').forEach((dot, i) => dot.classList.toggle('active', i === st.frame));
}

// Expose for modal integration
window.TRICK_ANIMATIONS = TRICK_ANIMATIONS;
window.createAnimationPlayer = createAnimationPlayer;
