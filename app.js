(function () {
  'use strict';
  const INK = '#1B365D';
  const SKIN = '#F3BE92';

  const PEOPLE = [
    { id: 'mom',  label: 'Mom',  line: 'This is a mom.',  tint: '#EBDDFF', sound: 'mom' },
    { id: 'dad',  label: 'Dad',  line: 'This is a dad.',  tint: '#DCEAFF', sound: 'dad' },
    { id: 'brother', label: 'Brother', line: 'This is a brother.', tint: '#DAF5E6', sound: 'brother' },
    { id: 'sister',  label: 'Sister',  line: 'This is a sister.',  tint: '#FFE0EA', sound: 'sister' },
    { id: 'baby',    label: 'Baby',    line: 'This is a baby.',    tint: '#FFF1BF', sound: 'baby' }
  ];
  const byId = {};
  PEOPLE.forEach(p => { byId[p.id] = p; });
  const PRAISE = [
    { key: 'great-job', text: 'Great job!' }, { key: 'nice-job', text: 'Nice job!' },
    { key: 'well-done', text: 'Well done!' }, { key: 'good-job', text: 'Good job!' }
  ];
  const WRONG = [{ key: 'try-again', text: 'Try again!' }, { key: 'not-quite', text: 'Oops! Try again.' }];
  const pick = a => a[Math.floor(Math.random() * a.length)];

  /* ---------- Pictures: round, friendly faces in sticker style ---------- */
  const path = (d, fill, w) => `<path d="${d}" fill="${fill}" stroke="${INK}" stroke-width="${w || 5}" stroke-linejoin="round" stroke-linecap="round"/>`;
  const head = (cy, r) => `<circle cx="100" cy="${cy}" r="${r}" fill="${SKIN}" stroke="${INK}" stroke-width="5"/>`;
  const ear = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${SKIN}" stroke="${INK}" stroke-width="5"/>`;
  const NECK = `<rect x="87" y="122" width="26" height="36" rx="10" fill="${SKIN}" stroke="${INK}" stroke-width="5"/>`;
  const NECK_BABY = `<rect x="88" y="146" width="24" height="28" rx="10" fill="${SKIN}" stroke="${INK}" stroke-width="5"/>`;

  function face(cy, o) {
    const eyes = [-1, 1].map(s =>
      `<ellipse cx="${s * o.gap}" cy="${o.ey}" rx="${o.rx}" ry="${o.ry}" fill="${INK}"/>` +
      `<circle cx="${s * o.gap + 2}" cy="${o.ey - 2.5}" r="2.2" fill="#fff"/>`).join('');
    const cheeks = [-1, 1].map(s => `<circle cx="${s * o.cx}" cy="${o.cy}" r="${o.cr}" fill="#FF8FA3" opacity=".6"/>`).join('');
    const w = o.mw, d = o.drop;
    const mouth = `<g class="mouth"><path d="M${-w} 12 Q0 ${12 + d} ${w} 12 Z" fill="#A63A4D" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>` +
      `<ellipse cx="0" cy="${12 + d * 0.36}" rx="${w * 0.42}" ry="${Math.max(3, d * 0.11)}" fill="#FF8FA3"/></g>`;
    return `<g transform="translate(100 ${cy})"><g class="eyes">${eyes}</g>${cheeks}${mouth}</g>`;
  }
  const ADULT = { gap: 18, ey: 2, rx: 5, ry: 6.5, cx: 30, cy: 17, cr: 7, mw: 15, drop: 34 };
  const KID = { gap: 17, ey: 3, rx: 5.5, ry: 7, cx: 30, cy: 18, cr: 7.5, mw: 14, drop: 32 };
  const BABY = { gap: 20, ey: 4, rx: 6.5, ry: 8.5, cx: 35, cy: 21, cr: 9, mw: 11, drop: 26 };

  const GLYPH = {
    heart: '<path d="M0 7 C-14 -4 -9 -15 0 -8 C9 -15 14 -4 0 7 Z" fill="#FF5C7A" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"/>',
    star: '<path d="M0 -9 L2.6 -3 L9 -2.6 L4 1.6 L5.6 8 L0 4.6 L-5.6 8 L-4 1.6 L-9 -2.6 L-2.6 -3 Z" fill="#FFC93C" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"/>',
    sparkle: '<path d="M0 -11 Q1.5 -1.5 11 0 Q1.5 1.5 0 11 Q-1.5 1.5 -11 0 Q-1.5 -1.5 0 -11 Z" fill="#FFE27A" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"/>',
    bubble: '<circle r="8" fill="#D9F2FF" stroke="' + INK + '" stroke-width="2.5"/><circle cx="-2.5" cy="-2.5" r="2" fill="#fff"/>'
  };
  function fx(kind) {
    const spots = [[30, 62], [170, 72], [100, 16]];
    return spots.map((p, i) => `<g transform="translate(${p[0]} ${p[1]})"><g class="fx" style="--i:${i}">${GLYPH[kind]}</g></g>`).join('');
  }
  const flower = (x, y) => {
    let s = '';
    for (let i = 0; i < 5; i++) {
      const a = i * Math.PI * 2 / 5 - Math.PI / 2;
      s += `<circle cx="${(x + 8 * Math.cos(a)).toFixed(1)}" cy="${(y + 8 * Math.sin(a)).toFixed(1)}" r="6" fill="#FF8FB3" stroke="${INK}" stroke-width="2.5"/>`;
    }
    return s + `<circle cx="${x}" cy="${y}" r="4.5" fill="#FFD23F" stroke="${INK}" stroke-width="2"/>`;
  };

  const ART = {
    mom() {
      return '<g class="fig fig-mom">' +
        path('M44 100 C38 40 70 24 100 24 C130 24 162 40 156 100 C158 132 150 152 142 164 L58 164 C50 152 42 132 44 100 Z', '#5A3826') +
        NECK +
        path('M28 200 C28 166 58 150 100 150 C142 150 172 166 172 200 Z', '#9B7BE0') +
        path('M84 151 Q100 180 116 151 Z', SKIN, 4) +
        head(92, 50) + face(92, ADULT) +
        path('M50 90 C48 50 76 36 100 36 C126 36 152 50 150 90 C134 64 112 58 96 64 C78 70 60 76 50 90 Z', '#5A3826') +
        flower(138, 52) +
        '</g>' + fx('heart');
    },
    dad() {
      return '<g class="fig fig-dad">' +
        NECK +
        path('M28 200 C28 166 58 150 100 150 C142 150 172 166 172 200 Z', '#4A86E8') +
        path('M80 150 L100 174 L120 150 L127 159 L100 186 L73 159 Z', '#FFFFFF', 4) +
        path('M100 174 L94 188 L100 204 L106 188 Z', '#E85D5D', 3) +
        ear(51, 96, 9) + ear(149, 96, 9) +
        head(92, 50) + face(92, ADULT) +
        `<g fill="#FFFFFF" fill-opacity=".35" stroke="${INK}" stroke-width="4.5"><circle cx="82" cy="94" r="14"/><circle cx="118" cy="94" r="14"/></g>` +
        `<path d="M96 92 Q100 88 104 92" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>` +
        path('M52 84 C48 46 76 34 100 34 C126 34 152 46 148 84 C138 62 120 58 100 58 C80 58 62 62 52 84 Z', '#3B2A22') +
        '<g class="hand">' +
          `<path d="M152 178 L164 146" stroke="${INK}" stroke-width="31" stroke-linecap="round"/>` +
          `<path d="M152 178 L164 146" stroke="#4A86E8" stroke-width="21" stroke-linecap="round"/>` +
          `<circle cx="166" cy="134" r="14" fill="${SKIN}" stroke="${INK}" stroke-width="5"/>` +
          `<circle cx="153" cy="138" r="6" fill="${SKIN}" stroke="${INK}" stroke-width="4"/>` +
        '</g>' +
        '</g>' + fx('sparkle');
    },
    brother() {
      const freckles = [[-26, 14], [-31, 20], [-22, 21], [26, 14], [31, 20], [22, 21]]
        .map(p => `<circle cx="${100 + p[0]}" cy="${92 + p[1] + 2}" r="1.7" fill="${INK}" opacity=".45"/>`).join('');
      return '<g class="fig fig-brother">' +
        NECK +
        path('M38 200 C38 170 62 154 100 154 C138 154 162 170 162 200 Z', '#3DB97A') +
        '<path d="M40 182 C70 176 130 176 160 182 L161 191 C130 185 70 185 39 191 Z" fill="#FFFFFF" opacity=".9"/>' +
        path('M85 155 Q100 172 115 155', 'none', 4) +
        ear(51, 96, 9) + ear(149, 96, 9) +
        head(92, 50) + face(92, KID) + freckles +
        path('M50 86 C46 52 66 36 100 36 C134 36 154 52 150 86 L140 66 L130 78 L118 56 L106 74 L92 54 L80 74 L68 60 Z', '#7A4A2B') +
        '</g>' + fx('star');
    },
    sister() {
      return '<g class="fig fig-sister">' +
        '<g class="tail tl"><ellipse cx="38" cy="108" rx="17" ry="30" transform="rotate(10 38 108)" fill="#9A5A33" stroke="' + INK + '" stroke-width="5"/></g>' +
        '<g class="tail tr"><ellipse cx="162" cy="108" rx="17" ry="30" transform="rotate(-10 162 108)" fill="#9A5A33" stroke="' + INK + '" stroke-width="5"/></g>' +
        NECK +
        path('M36 200 C36 168 62 152 100 152 C138 152 164 168 164 200 Z', '#FF8FB3') +
        path('M78 152 Q100 174 122 152 L129 161 Q100 188 71 161 Z', '#FFFFFF', 4) +
        `<g transform="translate(100 182) scale(.9)">${GLYPH.heart}</g>` +
        ear(51, 98, 9) + ear(149, 98, 9) +
        head(94, 50) + face(94, KID) +
        path('M50 92 C46 52 74 36 100 36 C126 36 154 52 150 92 C136 64 118 56 100 58 C82 56 64 64 50 92 Z', '#9A5A33') +
        `<circle cx="52" cy="76" r="7.5" fill="#FF5C7A" stroke="${INK}" stroke-width="3"/><circle cx="148" cy="76" r="7.5" fill="#FF5C7A" stroke="${INK}" stroke-width="3"/>` +
        '</g>' + fx('sparkle');
    },
    baby() {
      return '<g class="fig fig-baby">' +
        NECK_BABY +
        path('M48 204 C48 178 72 166 100 166 C128 166 152 178 152 204 Z', '#FFD23F') +
        `<circle cx="88" cy="190" r="3.4" fill="#fff" stroke="${INK}" stroke-width="2"/><circle cx="100" cy="190" r="3.4" fill="#fff" stroke="${INK}" stroke-width="2"/><circle cx="112" cy="190" r="3.4" fill="#fff" stroke="${INK}" stroke-width="2"/>` +
        ear(45, 102, 9) + ear(155, 102, 9) +
        head(98, 56) + face(98, BABY) +
        `<path d="M97 46 C90 28 113 22 113 35 C113 44 102 44 102 38" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>` +
        '<path d="M97 46 C90 28 113 22 113 35 C113 44 102 44 102 38" fill="none" stroke="#8A5A3A" stroke-width="5" stroke-linecap="round"/>' +
        '</g>' + fx('bubble');
    }
  };
  function artSvg(id, decorative) {
    return '<svg class="art" viewBox="0 0 200 200" ' + (decorative ? 'aria-hidden="true"' : 'role="img" aria-label="' + byId[id].label + '"') + ' focusable="false">' + ART[id]() + '</svg>';
  }
  function heroSvg() {
    const g = (id, x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">${ART[id]()}</g>`;
    return '<svg class="art" viewBox="0 0 340 230" aria-hidden="true" focusable="false">' +
      g('dad', 8, 0, 0.86) + g('mom', 160, 0, 0.86) +
      g('brother', 0, 80, 0.62) + g('sister', 216, 80, 0.62) + g('baby', 112, 86, 0.66) + '</svg>';
  }

  const ICON = {
    speaker: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 010 6M18.5 6.5a8 8 0 010 11"/></svg>',
    muted: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M17 9l5 6M22 9l-5 6"/></svg>'
  };
  const STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z"/></svg>';

  /* ---------- Sound effects (made in the browser, no files) ---------- */
  let ctx = null, master = null, muted = false;
  function ensureAudio() {
    if (muted) return null;
    try {
      if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = 0.85;
        master.connect(ctx.destination);
      }
      if (ctx.state === 'suspended') ctx.resume();
      return ctx;
    } catch (e) { return null; }
  }
  function tone(freq, t0, dur, o) {
    o = o || {};
    const osc = ctx.createOscillator(), g = ctx.createGain(), peak = o.gain || 0.2, att = o.attack || 0.01;
    osc.type = o.type || 'sine';
    osc.frequency.setValueAtTime(freq, t0);
    if (o.slideTo) osc.frequency.exponentialRampToValueAtTime(o.slideTo, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(peak, t0 + att);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g); g.connect(master);
    osc.start(t0); osc.stop(t0 + dur + 0.05);
  }
  const SOUNDS = {
    mom(t) { [392, 493.88, 587.33].forEach((f, i) => { tone(f, t + i * 0.22, 0.9, { gain: 0.18, attack: 0.05 }); tone(f * 2, t + i * 0.22, 0.7, { gain: 0.05, attack: 0.05 }); }); },
    dad(t) { [196, 246.94, 293.66].forEach((f, i) => tone(f, t + i * 0.2, 0.5, { type: 'triangle', gain: 0.28 })); },
    brother(t) { [523.25, 659.25, 523.25, 783.99].forEach((f, i) => tone(f, t + i * 0.13, 0.2, { type: 'triangle', gain: 0.22 })); },
    sister(t) { [1046.5, 1318.5, 1568, 2093].forEach((f, i) => tone(f, t + i * 0.12, 0.75, { gain: 0.13 })); },
    baby(t) { [[700, 1100], [820, 1300], [700, 1200], [900, 1400]].forEach((p, i) => tone(p[0], t + i * 0.18, 0.15, { gain: 0.15, slideTo: p[1] })); }
  };
  function ding(t) { tone(880, t, 0.25, { type: 'triangle', gain: 0.22 }); tone(1318.5, t + 0.12, 0.4, { type: 'triangle', gain: 0.22 }); }

  /* ---------- Voice: recorded clips, kid or teacher ---------- */
  const clips = {};
  let voiceTimer = null, voiceToken = 0, voiceNow = null, voiceSet = 'kid';
  const CLIP_KEYS = ['who-is-this', 'family-words', 'try-again', 'not-quite'];
  PRAISE.forEach(p => CLIP_KEYS.push(p.key));
  PEOPLE.forEach(p => CLIP_KEYS.push('word-' + p.id, 'this-' + p.id));
  try { const vs = localStorage.getItem('fw-voice'); if (vs === 'kid' || vs === 'teacher') voiceSet = vs; } catch (e) {}

  function clipSrc(key) {
    return (window.VOICE_DATA && window.VOICE_DATA[voiceSet + '/' + key]) || ('audio/' + voiceSet + '-' + key + '.mp3');
  }
  function getClip(key) {
    const ck = voiceSet + '/' + key;
    if (!clips[ck]) {
      try { clips[ck] = new Audio(clipSrc(key)); clips[ck].preload = 'auto'; } catch (e) { return null; }
    }
    return clips[ck];
  }
  function stopSpeech() {
    clearTimeout(voiceTimer);
    voiceToken++;
    if (voiceNow) { try { voiceNow.pause(); voiceNow.currentTime = 0; } catch (e) {} voiceNow = null; }
  }
  function playSeq(keys, token) {
    if (token !== voiceToken || !keys.length) return;
    const a = getClip(keys.shift());
    if (!a) return;
    voiceNow = a;
    a.onended = function () { setTimeout(function () { playSeq(keys, token); }, 180); };
    try { a.currentTime = 0; } catch (e) {}
    const pr = a.play();
    if (pr && pr.catch) pr.catch(function () {});
  }
  function say(keys, delay) {
    if (muted) return;
    stopSpeech();
    const token = voiceToken;
    voiceTimer = setTimeout(function () { playSeq(keys.slice(), token); }, 60 + (delay || 0));
  }

  function jingle(id) {
    const c = ensureAudio();
    if (c) SOUNDS[byId[id].sound](c.currentTime + 0.05);
  }
  function correctFx(id, praise) {
    const c = ensureAudio();
    if (c) { const t = c.currentTime + 0.05; ding(t); SOUNDS[byId[id].sound](t + 0.35); }
    say([praise.key, 'this-' + id], 650);
  }
  function wrongFx(w) {
    const c = ensureAudio();
    if (c) tone(330, c.currentTime + 0.02, 0.22, { gain: 0.2, slideTo: 230 });
    say([w.key], 200);
  }
  function fanfare() {
    const c = ensureAudio();
    if (c) { const t = c.currentTime + 0.05; [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5].forEach((f, i) => tone(f, t + i * 0.13, 0.4, { type: 'triangle', gain: 0.2 })); }
  }
  function cheerFx() {
    fanfare();
    say(['great-job'], 200);
  }

  /* ---------- App ---------- */
  const $ = id => document.getElementById(id);
  const state = { order: [], idx: 0, done: 0, locked: false, current: null };
  let learnTimer = null, heroTimer = null;

  function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function show(name) {
    ['home', 'learn', 'play', 'done'].forEach(s => { $(s).hidden = (s !== name); });
    $('backBtn').hidden = (name === 'home');
    try { window.scrollTo(0, 0); } catch (e) {}
  }
  function setMuteIcon() {
    $('muteBtn').innerHTML = muted ? ICON.muted : ICON.speaker;
    $('muteBtn').setAttribute('aria-pressed', muted ? 'true' : 'false');
    $('muteBtn').setAttribute('aria-label', muted ? 'Sound off' : 'Sound on');
  }
  function setVoiceLabel() {
    const kid = voiceSet === 'kid';
    $('voiceBtn').textContent = kid ? 'Kid voice' : 'Teacher voice';
    $('voiceBtn').setAttribute('aria-label', (kid ? 'Kid voice' : 'Teacher voice') + '. Tap to change the voice.');
  }

  function renderLearn() {
    $('learnLead').textContent = 'Tap a picture.';
    $('lgrid').innerHTML = PEOPLE.map(p =>
      `<button class="lcard" data-action="learncard" data-id="${p.id}" aria-label="${p.label}">${artSvg(p.id, true)}<span class="word">${p.label}</span></button>`
    ).join('');
  }

  function renderProgress() {
    let h = '';
    for (let i = 0; i < state.order.length; i++) {
      h += `<span class="pstar${i < state.done ? ' on' : ''}${i === state.idx ? ' cur' : ''}">${STAR}</span>`;
    }
    $('progress').innerHTML = h;
    $('progress').setAttribute('aria-label', 'Question ' + (state.idx + 1) + ' of ' + state.order.length);
  }

  function renderQuestion() {
    const p = state.order[state.idx];
    state.current = p; state.locked = false;
    $('nextBtn').hidden = true;
    const other = shuffle(PEOPLE.filter(x => x.id !== p.id))[0];
    const opts = shuffle([p, other]);
    $('qcard').innerHTML =
      '<div class="qhead"><p class="prompt" role="status">Who is this?</p>' +
      `<button class="icon-btn" data-action="sayq" aria-label="Hear the question">${ICON.speaker}</button></div>` +
      `<div class="stage">${artSvg(p.id, true)}</div>` +
      '<div class="choices">' + opts.map(o =>
        `<div class="choice-row"><button class="btn choice" data-action="choice" data-id="${o.id}">${o.label}</button>` +
        `<button class="icon-btn" data-action="sayword" data-id="${o.id}" aria-label="Hear ${o.label}">${ICON.speaker}</button></div>`
      ).join('') + '</div>';
    renderProgress();
    say(['who-is-this'], 250);
  }

  function winHtml(p, praise) {
    const colors = ['#FFC93C', '#3DB97A', '#FF8A5B', '#3E9BFF'];
    let sparks = '';
    for (let n = 0; n < 12; n++) {
      sparks += `<i class="spark" style="--n:${n};--a:${n * 30}deg;--d:${110 + (n % 3) * 22}px;--c:${colors[n % 4]}"></i>`;
    }
    return `<p class="prompt good" role="status">${praise.text}</p>` +
      `<div class="win go" style="--tint:${p.tint}">${sparks}<div class="win-art">${artSvg(p.id, true)}</div>` +
      `<p class="bigword">${p.label}</p><p class="sentence">${p.line}</p></div>`;
  }

  function answer(id, btn) {
    if (state.locked) return;
    const p = state.current;
    if (id === p.id) {
      state.locked = true; state.done++;
      const praise = pick(PRAISE);
      $('qcard').innerHTML = winHtml(p, praise);
      renderProgress();
      $('nextBtn').textContent = (state.idx === state.order.length - 1) ? 'Finish' : 'Next';
      $('nextBtn').hidden = false;
      correctFx(p.id, praise);
      setTimeout(function () { try { $('nextBtn').focus({ preventScroll: true }); } catch (e) {} }, 400);
    } else {
      btn.classList.add('nope'); btn.disabled = true;
      const w = pick(WRONG), pr = $('qcard').querySelector('.prompt');
      if (pr) { pr.textContent = w.text; pr.classList.add('oops'); }
      wrongFx(w);
    }
  }

  function finish() {
    let s = '', g = '';
    for (let i = 0; i < PEOPLE.length; i++) s += `<span style="--i:${i}">${STAR}</span>`;
    $('fstars').innerHTML = s;
    $('doneTag').textContent = 'You know ' + PEOPLE.length + ' family words.';
    PEOPLE.forEach(p => { g += `<div class="fcell">${artSvg(p.id, true)}${p.label}</div>`; });
    $('fgrid').innerHTML = g;
    show('done');
    cheerFx();
  }

  function startPlay() {
    state.order = shuffle(PEOPLE); state.idx = 0; state.done = 0;
    show('play');
    renderQuestion();
  }
  function goHome() {
    stopSpeech();
    clearTimeout(learnTimer);
    show('home');
  }

  document.addEventListener('click', function (e) {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const a = el.getAttribute('data-action'), id = el.getAttribute('data-id');
    if (a === 'play') startPlay();
    else if (a === 'learn') { renderLearn(); show('learn'); }
    else if (a === 'home') goHome();
    else if (a === 'next') { state.idx++; if (state.idx >= state.order.length) finish(); else renderQuestion(); }
    else if (a === 'sayq') say(['who-is-this']);
    else if (a === 'sayword') say(['word-' + id]);
    else if (a === 'choice') answer(id, el);
    else if (a === 'mute') { muted = !muted; if (muted) stopSpeech(); setMuteIcon(); }
    else if (a === 'voice') {
      voiceSet = voiceSet === 'kid' ? 'teacher' : 'kid';
      try { localStorage.setItem('fw-voice', voiceSet); } catch (e) {}
      setVoiceLabel();
      CLIP_KEYS.forEach(getClip);
      say(['family-words']);
    }
    else if (a === 'learncard') {
      document.querySelectorAll('.lcard.go').forEach(c => c.classList.remove('go'));
      el.classList.add('go');
      jingle(id);
      say(['this-' + id], 350);
      $('learnLead').textContent = byId[id].line;
      clearTimeout(learnTimer);
      learnTimer = setTimeout(function () { el.classList.remove('go'); }, 3200);
    }
    else if (a === 'hero') {
      el.classList.add('go');
      fanfare();
      say(['family-words'], 200);
      clearTimeout(heroTimer);
      heroTimer = setTimeout(function () { el.classList.remove('go'); }, 3200);
    }
  });

  setMuteIcon();
  setVoiceLabel();
  $('hero').innerHTML = heroSvg();
  CLIP_KEYS.forEach(getClip);
})();
