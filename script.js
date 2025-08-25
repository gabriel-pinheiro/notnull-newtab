(function () {
  const form = document.getElementById('search-form');
  const input = document.getElementById('search-input');
  const searchBtn = document.querySelector('.search-btn');
  const clockVisual = document.getElementById('clock-visual');
  const clockSr = document.getElementById('clock-sr');
  const triWrap = document.querySelector('.triangles');

  // Update clock
  function pad(n) { return n.toString().padStart(2, '0'); }
  function updateClock() {
    const now = new Date();
    const h = pad(now.getHours());
    const m = pad(now.getMinutes());
    const s = pad(now.getSeconds());

    if (clockVisual) {
      clockVisual.dateTime = `${h}:${m}:${s}`;
      clockVisual.innerHTML = `<span class="hm">${h}:${m}</span><span class="s">:${s}</span>`;
    }

    if (clockSr && now.getSeconds() === 0) {
      const hourNum = now.getHours();
      const minuteNum = now.getMinutes();
      clockSr.textContent = `Time ${hourNum} hours, ${minuteNum} minutes`;
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Search behavior
  function toQuery(s) {
    return encodeURIComponent(s);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = (input.value || '').trim();
    if (!q) return;

    triWrap.classList.add('loading');
    if (q.includes('?')) {
      const url = `https://chatgpt.com/?temporary-chat=true&q=${toQuery(q)}`;
      location.href = url;
    } else {
      const url = `https://www.google.com/search?q=${toQuery(q)}`;
      location.href = url;
    }
  });

  function updateSearchBtnTabIndex() {
    if (!searchBtn) return;
    const hasValue = !!(input && input.value && input.value.trim());
    searchBtn.tabIndex = hasValue ? 0 : -1;
  }
  updateSearchBtnTabIndex();
  if (input) {
    input.addEventListener('input', updateSearchBtnTabIndex);
    input.addEventListener('change', updateSearchBtnTabIndex);
  }

  const qlLinks = document.querySelectorAll('.ql-link');
  qlLinks.forEach((a) => {
    a.addEventListener('click', () => {
      if (triWrap) triWrap.classList.add('loading');
    });
  });

  window.addEventListener('DOMContentLoaded', () => {
    const triangles = document.querySelectorAll('.triangle');
    triangles.forEach((el) => {
      el.style.willChange = 'transform';
    });
  });
})();
