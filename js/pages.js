// Research / People 페이지를 data.js로부터 그립니다.
document.addEventListener('DOMContentLoaded', () => {
  // 저자 중 학생 이름을 강조
  const personByName = Object.fromEntries(PEOPLE.filter((p) => p.role !== 'director').map((p) => [p.name, p]));

  // 네트워크에서 넘어온 항목(#id)을 강조
  const highlightTarget = () => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('is-target');
    el.scrollIntoView({ block: 'center' });
  };

  // ---------- Research ----------
  const workRoot = document.getElementById('work-list');
  const filterRoot = document.getElementById('theme-filter');

  if (workRoot && filterRoot) {
    // Research 페이지는 학술지 게재 논문만 표시 (학회 발표는 네트워크와 소식에서 확인)
    const PAPERS = WORKS.filter((w) => w.kind === 'paper');
    let activeTheme = new URLSearchParams(window.location.search).get('theme');
    if (!THEMES[activeTheme]) activeTheme = null;

    // 학생 이름은 초록 굵게, 최율 교수 이름은 짙은 갈색 굵게
    const DIRECTOR_NAMES = ['최율', 'Yool Choi'];
    const authorHtml = (name) =>
      DIRECTOR_NAMES.includes(name)
        ? `<strong class="director-name">${name}</strong>`
        : personByName[name]
          ? `<strong>${name}</strong>`
          : name;

    const workHtml = (w) => `
      <li class="card work" id="${w.id}">
        <span class="work-kind ${w.kind}">${w.venues[0].split(',')[0]}</span>
        <h3>${w.title}</h3>
        ${w.titleAlt ? `<p class="title-en">${w.titleAlt}</p>` : ''}
        <p class="authors">${w.authors.map(authorHtml).join(', ')}</p>
        <ul class="venues">${w.venues.map((v) => `<li>${v}</li>`).join('')}${
          w.doi ? `<li><a href="https://doi.org/${w.doi}" target="_blank" rel="noreferrer">doi:${w.doi}</a></li>` : ''
        }</ul>
        ${w.plain || w.summary ? `<p class="summary">${w.plain || w.summary}</p>` : ''}
        ${w.keywords && w.keywords.length ? `<p class="keywords">Keywords · ${w.keywords.join(', ')}</p>` : ''}
        <div class="chips">${w.themes
          .map((t) => `<a class="chip" href="research.html?theme=${t}"># ${THEMES[t]}</a>`)
          .join('')}</div>
      </li>`;

    const render = () => {
      filterRoot.innerHTML = [
        `<button class="chip ${activeTheme ? '' : 'is-active'}" data-theme="">전체</button>`,
        ...Object.entries(THEMES)
          .filter(([key]) => PAPERS.some((w) => w.themes.includes(key)))
          .map(
            ([key, name]) =>
              `<button class="chip ${activeTheme === key ? 'is-active' : ''}" data-theme="${key}"># ${name}</button>`
          ),
      ].join('');

      const shown = PAPERS.filter((w) => !activeTheme || w.themes.includes(activeTheme));
      const years = [...new Set(shown.map((w) => w.year))].sort((a, b) => b - a);
      workRoot.innerHTML = years
        .map(
          (y) => `
        <section class="year-group">
          <h2>${y}</h2>
          <ul class="work-list">${shown.filter((w) => w.year === y).map(workHtml).join('')}</ul>
        </section>`
        )
        .join('');
    };

    filterRoot.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-theme]');
      if (!btn) return;
      activeTheme = btn.dataset.theme || null;
      const url = activeTheme ? `research.html?theme=${activeTheme}` : 'research.html';
      history.replaceState(null, '', url);
      render();
    });

    render();
  }

  // ---------- People ----------
  const peopleRoots = {
    director: document.getElementById('people-director'),
    member: document.getElementById('people-member'),
    alumni: document.getElementById('people-alumni'),
  };

  if (peopleRoots.member) {
    // 학생 기록: 논문과 발표를 나눠서 목록으로
    const recordList = (label, items, fmt) =>
      items.length ? `<div class="records"><h4>${label}</h4><ul>${items.map((w) => `<li>${fmt(w)}</li>`).join('')}</ul></div>` : '';

    const personHtml = (p) => {
      // 책임교수는 모든 연구에 참여하므로 개별 링크 대신 Research 페이지로 안내
      const works = p.role === 'director' ? [] : WORKS.filter((w) => w.authors.includes(p.name));
      return `
      <article class="card person" id="${p.id}">
        <p class="name">${p.name}${p.en ? `<span>${p.en}</span>` : ''}${p.school ? `<span class="school-inline">(${p.school})</span>` : ''}${
          p.role === 'director'
            ? `<span class="eyes-tear" aria-hidden="true">
                <span class="tear-rim"></span>
                <span class="tear-hole"><span class="tear-look"><img src="assets/choi-eyes.jpg" alt="" /></span></span>
              </span>`
            : ''
        }</p>
        <p class="role">${p.title}</p>
        ${p.bio ? `<p>${p.bio}</p>` : ''}
        ${p.thesis ? `<p class="thesis"><span>석사학위논문</span>${p.thesis}</p>` : ''}
        ${['education', 'career', 'courses']
          .filter((k) => p[k])
          .map((k) => `<h4>${{ education: 'Education', career: 'Career', courses: 'Courses' }[k]}</h4><ul>${p[k].map((x) => `<li>${x}</li>`).join('')}</ul>`)
          .join('')}
        ${p.now || p.notes.length ? `<ul class="notes">${[p.now, ...p.notes].filter(Boolean).map((n) => `<li>${n}</li>`).join('')}</ul>` : ''}
        ${recordList('논문', works.filter((w) => w.kind === 'paper'), (w) => `<a href="research.html#${w.id}">${w.title}</a> <span class="rec-meta">${w.venues[0].split(',')[0]}, ${w.year}</span>`)}
        ${recordList('발표', works.filter((w) => w.kind === 'talk'), (w) => `${w.title} <span class="rec-meta">${w.venues[w.venues.length - 1].replace(/^(\d{4})\.\d{2}\s*/, '').split(',')[0]}${w.venues.length > 1 ? ' 외' : ''}, ${w.year}</span>`)}
      </article>`;
    };

    Object.entries(peopleRoots).forEach(([role, root]) => {
      if (!root) return;
      root.innerHTML = PEOPLE.filter((p) => p.role === role).map(personHtml).join('');
    });

    // 중요한 타자(Significant Others)
    const othersRoot = document.getElementById('people-others');
    if (othersRoot && typeof SIGNIFICANT_OTHERS !== 'undefined') {
      othersRoot.innerHTML = SIGNIFICANT_OTHERS.map(
        (o) => `
        <article class="card other-feature">
          <div class="other-main">
            <p class="other-en">${o.en}</p>
            <h3>${o.name}</h3>
            <p>${o.desc}</p>
            <a href="${o.url}" target="_blank" rel="noreferrer">${o.linkText} ↗</a>
          </div>
          <ul class="other-highlights">
            ${o.highlights.map(([k, v]) => `<li><strong>${k}</strong><span>${v}</span></li>`).join('')}
          </ul>
        </article>`
      ).join('');

      if (typeof MENTORS !== 'undefined') {
        othersRoot.insertAdjacentHTML(
          'beforeend',
          `<div class="mentors">
            <p class="mentors-title">${MENTORS.title}</p>
            <p class="mentors-desc">${MENTORS.desc}</p>
            <p class="mentors-list">${MENTORS.people
              .map(
                (m) =>
                  m.url
                    ? `<a href="${m.url}" target="_blank" rel="noreferrer">${m.name}${m.note ? ` <span>${m.note}</span>` : ''} ↗</a>`
                    : `<span class="mentor">${m.name}${m.note ? ` <span>${m.note}</span>` : ''}</span>`
              )
              .join('')}</p>
          </div>`
        );
      }
    }
  }

  // 종이를 찢은 틈 모양: 위아래 가장자리를 들쭉날쭉하게 (매번 같은 모양이 되도록 고정된 난수)
  const tear = document.querySelector('.eyes-tear');
  if (tear) {
    // 미리보기 6번: seed 23, 물결 5, 섬유 5
    let seed = 23;
    const rand = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    // 완만한 물결 + 잔 톱니 → 손으로 찢은 듯한 불규칙한 가장자리
    const N = 40;
    const wave = (phase, k) => (i) => Math.sin((i / N) * Math.PI * k + phase);
    const makeEdge = () => {
      const w1 = wave(rand() * 6, 2.2);
      const w2 = wave(rand() * 6, 5.3);
      const jitter = Array.from({ length: N + 1 }, () => rand());
      return (i) => 0.55 * w1(i) + 0.25 * w2(i) + 0.6 * (jitter[i] - 0.5);
    };
    const topEdge = makeEdge();
    const bottomEdge = makeEdge();
    const fiber = Array.from({ length: N + 1 }, () => rand());
    const shape = (pad, amp, rough) => {
      const pts = [];
      pts.push([2 - pad / 4, 50 + topEdge(0) * 4]);
      for (let i = 0; i <= N; i += 1) pts.push([(i / N) * 100, 22 - pad + amp * topEdge(i) - rough * fiber[i]]);
      pts.push([98 + pad / 4, 50 + bottomEdge(N) * 4]);
      for (let i = N; i >= 0; i -= 1) pts.push([(i / N) * 100, 78 + pad + amp * bottomEdge(i) + rough * fiber[N - i]]);
      return `polygon(${pts.map(([x, y]) => `${x.toFixed(1)}% ${y.toFixed(1)}%`).join(', ')})`;
    };
    tear.querySelector('.tear-hole').style.clipPath = shape(0, 5, 0);
    tear.querySelector('.tear-rim').style.clipPath = shape(6, 5, 5);
  }

  // 틈 사이의 눈이 마우스를 따라 슬쩍 쳐다봄
  const eyes = document.querySelector('.tear-hole img');
  if (eyes && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('pointermove', (e) => {
      const r = eyes.closest('.eyes-tear').getBoundingClientRect();
      const dx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / 500));
      const dy = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / 400));
      eyes.style.transform = `translate(-50%, -50%) scale(1.04) translate(${dx * 4}%, ${dy * 6}%)`;
    });
  }

  highlightTarget();
});
