/* Think Tank mock-up behaviours. No framework; every screen works without it for reading. */
(() => {
  const rm = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // toast: <button data-toast="نص">
  window.ttToast = (text) => {
    $$('.toast').forEach(t => t.remove());
    const t = Object.assign(document.createElement('div'), { className: 'toast', textContent: text });
    t.setAttribute('role', 'status'); document.body.append(t); setTimeout(() => t.remove(), 3200);
  };
  $$('[data-toast]').forEach(b => b.addEventListener('click', () => ttToast(b.dataset.toast)));

  // attendance ticks: <button class="tick" aria-pressed>
  $$('.tick').forEach(t => t.addEventListener('click', () => {
    t.setAttribute('aria-pressed', t.getAttribute('aria-pressed') !== 'true');
    t.dispatchEvent(new CustomEvent('tt:tick', { bubbles: true }));
  }));

  // press a stamp: <button data-press="#id">  (target gets .press and loses [hidden])
  $$('[data-press]').forEach(b => b.addEventListener('click', () => {
    const el = document.querySelector(b.dataset.press); if (!el) return;
    el.hidden = false; el.classList.remove('press'); void el.offsetWidth; el.classList.add('press');
  }));

  // show/hide: <button data-show="#a" data-hide="#b">
  $$('[data-show],[data-hide]').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.show) $$(b.dataset.show).forEach(e => e.hidden = false);
    if (b.dataset.hide) $$(b.dataset.hide).forEach(e => e.hidden = true);
  }));

  // OTP boxes auto-advance
  $$('.otp').forEach(box => {
    const ins = $$('input', box);
    ins.forEach((inp, i) => {
      inp.addEventListener('input', () => { inp.value = inp.value.replace(/\D/g, '').slice(-1); if (inp.value && ins[i + 1]) ins[i + 1].focus(); });
      inp.addEventListener('keydown', e => { if (e.key === 'Backspace' && !inp.value && ins[i - 1]) ins[i - 1].focus(); });
    });
  });

  // pointer tilt for one hero object: <div data-tilt>
  if (!rm) $$('[data-tilt]').forEach(el => {
    const host = el.parentElement; el.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)'; host.style.perspective = '1400px';
    host.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      el.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 8}deg)`;
    });
    host.addEventListener('pointerleave', () => el.style.transform = '');
  });

  // seats: <div class="seats" data-cap="20" data-taken="16" data-mine="0">
  $$('.seats[data-cap]').forEach(s => {
    const cap = +s.dataset.cap, taken = +s.dataset.taken, mine = +(s.dataset.mine || 0);
    s.innerHTML = Array.from({ length: cap }, (_, i) => `<s class="${i < taken ? '' : i < taken + mine ? 'mine' : 'free'}"></s>`).join('');
    s.setAttribute('aria-hidden', 'true');
  });
})();
