// 모바일 메뉴 토글 (모든 페이지 공통)
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
  });
});

// 메일 링크는 메일 앱을 여는 대신 주소를 복사하고 옆에 작게 '복사됨'을 띄움
// (웹메일만 쓰는 사람은 mailto: 링크를 눌러도 아무 일이 없기 때문)
document.addEventListener('DOMContentLoaded', () => {
  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    }
  };

  const showToast = (anchor, text) => {
    const r = anchor.getBoundingClientRect();
    const toast = document.createElement('span');
    toast.className = 'copy-toast';
    toast.textContent = text;
    toast.style.left = `${r.left + r.width / 2 + window.scrollX}px`;
    toast.style.top = `${r.top + window.scrollY - 8}px`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1800);
  };

  document.querySelectorAll('a[href^="mailto:"]').forEach((a) => {
    a.addEventListener('click', async (e) => {
      e.preventDefault();
      const address = a.getAttribute('href').replace(/^mailto:/, '').split('?')[0];
      const ok = await copyText(address);
      showToast(a, ok ? `${address} ${a.dataset.copied || '복사됨 ✓'}` : address);
    });
  });
});
