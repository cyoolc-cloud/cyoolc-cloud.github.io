// 메인 화면: 구성원 ↔ 연구 ↔ 연구 주제 네트워크 (D3 force + canvas)
document.addEventListener('DOMContentLoaded', () => {
  const COLORS = {
    work: { base: '#1f3a5f', hover: '#142740', glow: 'rgba(31, 58, 95, 0.18)', line: 'rgba(31, 58, 95, 0.7)' },
    talk: { base: '#cdc6ba', hover: '#a39b8e', glow: 'rgba(163, 155, 142, 0.25)', line: 'rgba(120, 112, 100, 0.6)' },
    theme: { base: '#a8743a', hover: '#835a2b', glow: 'rgba(168, 116, 58, 0.18)', line: 'rgba(168, 116, 58, 0.75)' },
    person: { base: '#4a6b5d', hover: '#35503f', glow: 'rgba(74, 107, 93, 0.2)', line: 'rgba(74, 107, 93, 0.75)' },
  };

  // 출간 논문은 파란색, 학회 발표는 연한 회색
  // 다른 이름과 겹치는 노드는 이름 위치를 따로 지정 ('above' | 'left'), 데스크톱에만 적용
  const LABEL_POS = { 't:lifecourse': 'above' };
  // 학생 노드는 하리보 곰젤리 모양, 학생마다 다른 젤리 색
  const GUMMY = ['#e8413c', '#f39a1e', '#f2c81d', '#4caf50', '#a51d2d', '#c0307a', '#ef6a3a', '#7cbf3a', '#f05a7e', '#f7b733', '#3fa66b'];
  const gummyPath = (x, y, r) => {
    const s = r / 1.1;
    const p = new Path2D();
    const circ = (cx, cy, rr) => {
      p.moveTo(x + cx * s + rr * s, y + cy * s);
      p.arc(x + cx * s, y + cy * s, rr * s, 0, Math.PI * 2);
    };
    const ell = (cx, cy, rx, ry, rot = 0) => {
      p.moveTo(x + cx * s + rx * s * Math.cos(rot), y + cy * s + rx * s * Math.sin(rot));
      p.ellipse(x + cx * s, y + cy * s, rx * s, ry * s, rot, 0, Math.PI * 2);
    };
    circ(-0.36, -0.98, 0.2); // 귀
    circ(0.36, -0.98, 0.2);
    circ(0, -0.58, 0.48); // 머리
    ell(0, 0.28, 0.5, 0.6); // 몸통
    ell(-0.5, 0.05, 0.17, 0.32, 0.6); // 팔
    ell(0.5, 0.05, 0.17, 0.32, -0.6);
    circ(-0.3, 0.84, 0.24); // 다리
    circ(0.3, 0.84, 0.24);
    return p;
  };
  // wobble: 0이면 가만히, 그 외에는 위상(phase) 값. 발끝을 축으로 좌우로 흔들리며 살짝 늘었다 줄었다 함
  const drawGummy = (x, y, r, fill, isHov, wobble = null) => {
    const s = r / 1.1;
    ctx.save();
    if (wobble !== null) {
      const t = performance.now() / 1000;
      const tilt = 0.11 * Math.sin(t * 2.4 + wobble);
      const squash = 0.035 * Math.sin(t * 4.8 + wobble);
      const footY = y + 1.08 * s;
      ctx.translate(x, footY);
      ctx.rotate(tilt);
      ctx.scale(1 + squash, 1 - squash);
      ctx.translate(-x, -footY);
    }
    ctx.save();
    ctx.shadowBlur = isHov ? 12 : 2;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
    ctx.globalAlpha *= 0.92;
    ctx.fillStyle = fill;
    ctx.fill(gummyPath(x, y, r));
    ctx.restore();
    // 젤리 광택
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.beginPath();
    ctx.ellipse(x - 0.2 * s, y - 0.72 * s, 0.12 * s, 0.07 * s, -0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x - 0.22 * s, y + 0.05 * s, 0.1 * s, 0.2 * s, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const colorOf = (d) => COLORS[d.type === 'work' && d.ref.kind === 'talk' ? 'talk' : d.type];

  // ---------- Build graph ----------
  // 네트워크에는 학생(재학생·졸업생)만 저자로 표시
  const personByName = Object.fromEntries(PEOPLE.filter((p) => p.role !== 'director').map((p) => [p.name, p]));
  const themeCount = {};
  WORKS.forEach((w) => w.themes.forEach((t) => (themeCount[t] = (themeCount[t] || 0) + 1)));
  const workCount = {};
  WORKS.forEach((w) =>
    w.authors.forEach((a) => {
      if (personByName[a]) workCount[personByName[a].id] = (workCount[personByName[a].id] || 0) + 1;
    })
  );

  const nodes = [
    ...WORKS.map((w) => ({ id: `w:${w.id}`, type: 'work', ref: w, label: w.label })),
    ...Object.keys(themeCount).map((t) => ({ id: `t:${t}`, type: 'theme', key: t, label: THEMES[t], count: themeCount[t] })),
    ...PEOPLE.filter((p) => workCount[p.id]).map((p, i) => ({
      id: `p:${p.id}`,
      type: 'person',
      gummy: i,
      ref: p,
      label: p.name,
      count: workCount[p.id],
    })),
  ];
  const links = [];
  WORKS.forEach((w) => {
    w.themes.forEach((t) => links.push({ source: `w:${w.id}`, target: `t:${t}` }));
    w.authors.forEach((a) => {
      if (personByName[a]) links.push({ source: `p:${personByName[a].id}`, target: `w:${w.id}` });
    });
  });

  // ---------- Canvas setup ----------
  const canvas = document.getElementById('network-viz');
  const tooltip = document.getElementById('net-tooltip');
  const introCard = document.getElementById('intro-card');
  const ctx = canvas.getContext('2d');
  const DPR = window.devicePixelRatio || 1;
  // 모바일에서는 네트워크가 화면 위쪽 일부만 차지하고, 아래로 소개·소식이 이어짐
  const MOBILE_CANVAS_RATIO = 0.72;
  const canvasHeight = () =>
    window.innerWidth <= 768 ? Math.round(window.innerHeight * MOBILE_CANVAS_RATIO) : window.innerHeight;
  let W = window.innerWidth;
  let H = canvasHeight();

  const isMobile = () => window.innerWidth <= 768;
  const introVisible = () => introCard && introCard.style.display !== 'none';

    // 왼쪽 패널(소개·최근 소식)을 피해 네트워크를 오른쪽/위쪽으로 배치
  const getCenter = () => {
    if (isMobile()) return { x: W / 2, y: introVisible() ? H * 0.27 : H * 0.33 };
    return { x: W > 1000 ? W / 2 + 290 : W / 2, y: H / 2 + 20 };
  };

  // 화면 높이에 맞춰 처음 확대 비율을 정함
  const getInitialScale = () => (isMobile() ? 0.55 : Math.min(1.1, Math.max(0.7, (window.innerHeight / 900) * 1.0)));

  const forceParams = () => {
    const m = isMobile();
    return {
      linkDistance: m ? 45 : 85,
      chargeTheme: m ? -200 : -520,
      chargeOther: m ? -80 : -200,
      collide: m ? 9 : 16,
      // 학생(곰젤리) 주변은 이름이 다른 점과 겹치지 않도록 조금 더 띄움
      collidePerson: m ? 6 : 14,
    };
  };

  const nodeR = (d) => {
    const m = isMobile();
    if (d.type === 'theme') return 6 + d.count * 1.8;
    if (d.type === 'person') return m ? 10 : 9;
    return m ? 7 : 6;
  };

  const resize = () => {
    W = window.innerWidth;
    H = canvasHeight();
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
  };
  resize();

  let scale = getInitialScale();
  let center = getCenter();
  let tx = center.x * (1 - scale);
  let ty = center.y * (1 - scale);
  const SCALE_MIN = 0.3;
  const SCALE_MAX = 4;

  // ---------- Simulation ----------
  const sim = d3.forceSimulation(nodes).alphaDecay(0.015);

  const applyForces = () => {
    const fp = forceParams();
    center = getCenter();
    sim
      .force('link', d3.forceLink(links).id((d) => d.id).distance(fp.linkDistance).strength(0.6))
      .force('charge', d3.forceManyBody().strength((d) => (d.type === 'theme' ? fp.chargeTheme : fp.chargeOther)))
      .force('center', d3.forceCenter(center.x, center.y))
      .force('x', d3.forceX(center.x).strength(0.06))
      .force('y', d3.forceY(center.y).strength(0.06))
      .force('collision', d3.forceCollide().radius((d) => nodeR(d) + fp.collide + (d.type === 'person' ? fp.collidePerson : 0)));
  };
  applyForces();

  // ---------- Drawing ----------
  let hovered = null;
  let dragNode = null;

  const isNeighbor = (d) =>
    hovered && links.some((l) => (l.source === hovered && l.target === d) || (l.target === hovered && l.source === d));

  // 떨림 효과 설정 (움직임 줄이기를 켠 사용자에게는 끔)
  const DRIFT = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DRIFT_AMP = 3.5;

  const draw = () => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, W * DPR, H * DPR);
    ctx.setTransform(DPR * scale, 0, 0, DPR * scale, DPR * tx, DPR * ty);

    // 은은한 떨림: 점마다 다른 위상으로 아주 작게 흔들림 (마우스를 올린 점은 고정)
    const t = performance.now() / 1000;
    nodes.forEach((d, i) => {
      const amp = DRIFT && d !== hovered && d !== dragNode ? DRIFT_AMP : 0;
      d.px = d.x + amp * Math.sin(t * 1.1 + i * 1.7);
      d.py = d.y + amp * Math.cos(t * 0.9 + i * 2.3);
    });

    links.forEach((l) => {
      const hot = hovered && (l.source === hovered || l.target === hovered);
      ctx.beginPath();
      ctx.moveTo(l.source.px, l.source.py);
      ctx.lineTo(l.target.px, l.target.py);
      if (hot) {
        ctx.strokeStyle = colorOf(hovered).line;
        ctx.lineWidth = isMobile() ? 2.4 : 2;
      } else {
        ctx.strokeStyle = hovered ? 'rgba(60, 54, 46, 0.08)' : 'rgba(60, 54, 46, 0.22)';
        ctx.lineWidth = 1;
      }
      ctx.stroke();
    });

    nodes.forEach((d) => {
      const r = nodeR(d);
      const c = colorOf(d);
      const isHov = d === hovered;
      const dim = hovered && !isHov && !isNeighbor(d);

      ctx.globalAlpha = dim ? 0.25 : 1;
      if (isHov) {
        ctx.beginPath();
        ctx.arc(d.px, d.py, r + 6, 0, Math.PI * 2);
        ctx.fillStyle = c.glow;
        ctx.fill();
      }
      if (d.type === 'person') {
        // 곰젤리는 젤리처럼 좌우로 말랑하게 흔들림 (마우스를 올린 곰과 움직임 줄이기 사용자는 고정)
        const wobble = DRIFT && !isHov && d !== dragNode ? d.gummy * 1.9 : null;
        drawGummy(d.px, d.py, r, GUMMY[d.gummy % GUMMY.length], isHov, wobble);
      } else {
        ctx.beginPath();
        ctx.arc(d.px, d.py, r, 0, Math.PI * 2);
        ctx.fillStyle = isHov ? c.hover : c.base;
        ctx.shadowBlur = isHov ? 12 : 2;
        ctx.shadowColor = c.glow;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 주제·구성원 이름은 항상, 연구 제목은 마우스를 올렸을 때만 표시
      const showLabel = d.type !== 'work' || isHov || (hovered && isNeighbor(d));
      if (showLabel) {
        const fs = Math.max(11, (d.type === 'work' ? 12.5 : 13) / scale);
        ctx.font = `${d.type === 'work' ? 500 : 600} ${fs}px 'Noto Sans KR', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.lineWidth = 4 / scale;
        ctx.strokeStyle = 'rgba(243, 241, 236, 0.95)';
        const text = d.type === 'theme' ? `# ${d.label}` : d.label;
        const pos = isMobile() ? null : LABEL_POS[d.id];
        let lx = d.px;
        let ly = d.py + r + 4;
        if (pos === 'above') {
          ctx.textBaseline = 'bottom';
          ly = d.py - r - 4;
        } else if (pos === 'left') {
          ctx.textAlign = 'right';
          ctx.textBaseline = 'middle';
          lx = d.px - r - 5;
          ly = d.py;
        }
        ctx.strokeText(text, lx, ly);
        ctx.fillStyle = d.type === 'theme' ? c.hover : d.type === 'person' ? c.hover : '#161616';
        ctx.fillText(text, lx, ly);
      }
      ctx.globalAlpha = 1;
    });
  };
  // 첫 화면 배치: 미리 자리를 잡은 뒤 좌우를 뒤집어 보여줌 (매번 같은 모양)
  const MIRROR_X = true;
  sim.stop();
  for (let i = 0; i < 300; i += 1) sim.tick();
  if (MIRROR_X) nodes.forEach((d) => (d.x = 2 * center.x - d.x));
  fitView();
  sim.on('tick', draw);
  sim.alpha(0.05).restart();
  draw();
  if (DRIFT) {
    const loop = () => {
      draw();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  // ---------- Hit testing & tooltip ----------
  const toWorld = (cx, cy) => ({ x: (cx - tx) / scale, y: (cy - ty) / scale });

  const nodeAt = (cx, cy, touch) => {
    const p = toWorld(cx, cy);
    const pad = touch ? 12 : 5;
    for (let i = nodes.length - 1; i >= 0; i -= 1) {
      const d = nodes[i];
      if (Math.hypot(d.x - p.x, d.y - p.y) <= nodeR(d) + pad / scale) return d;
    }
    return null;
  };

  const tooltipHtml = (d, touch) => {
    const action = touch ? '한 번 더 탭하면 열기' : '클릭하면 열기';
    if (d.type === 'work') {
      const w = d.ref;
      if (w.kind === 'talk') {
        // 발표: 저자 다음에 발표 장소를 최근 순으로
        const venues = [...w.venues].sort((a, b) => b.localeCompare(a));
        return `<div class="tt-header">${w.title}</div><div class="tt-meta">${w.authors.join(', ')}<br>${venues.join('<br>')}</div>`;
      }
      return `<div class="tt-header">${w.title}</div><div class="tt-meta">${w.year} · 논문 · ${w.authors.join(', ')}<br>${action}</div>`;
    }
    if (d.type === 'person') {
      return `<div class="tt-header">${d.ref.name} <span style="font-weight:400;color:#77716a">${d.ref.en}</span></div><div class="tt-meta">${d.ref.title}<br>연구 ${d.count}건 연결 · ${action}</div>`;
    }
    return `<div class="tt-header"># ${d.label}</div><div class="tt-meta">연구 ${d.count}건 연결 · ${action}</div>`;
  };

  const showTooltip = (d, mx, my, touch) => {
    tooltip.innerHTML = tooltipHtml(d, touch);
    tooltip.style.display = 'block';
    const rect = tooltip.getBoundingClientRect();
    let x = mx + 16;
    let y = my - 12;
    if (x + rect.width > W - 12) x = Math.max(12, mx - rect.width - 16);
    if (y + rect.height > H - 12) y = Math.max(12, H - rect.height - 12);
    tooltip.style.left = `${Math.max(12, x)}px`;
    tooltip.style.top = `${Math.max(12, y)}px`;
  };

  const hideTooltip = () => {
    tooltip.style.display = 'none';
  };

  const openNode = (d) => {
    if (d.type === 'work') {
      // 학회 발표는 Research 페이지에 없으므로 이동하지 않음
      if (d.ref.kind === 'paper') window.location.href = `research.html#${d.ref.id}`;
    }
    else if (d.type === 'person') window.location.href = `people.html#${d.ref.id}`;
    else window.location.href = `research.html?theme=${d.key}`;
  };

  // ---------- Pointer interaction (mouse + touch) ----------
  const pointers = new Map();
  let panStart = null;
  let pinchDist = null;
  let downInfo = null;

  const local = (e) => {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  canvas.addEventListener('pointerdown', (e) => {
    canvas.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, local(e));
    const p = local(e);

    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinchDist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dragNode) {
        dragNode.fx = null;
        dragNode.fy = null;
        dragNode = null;
      }
      panStart = null;
      return;
    }

    downInfo = { x: p.x, y: p.y, t: Date.now() };
    const found = nodeAt(p.x, p.y, e.pointerType !== 'mouse');
    if (found) {
      dragNode = found;
      found.fx = found.x;
      found.fy = found.y;
    } else {
      panStart = { x: p.x, y: p.y, tx, ty };
      canvas.classList.add('grabbing');
    }
  });

  canvas.addEventListener('pointermove', (e) => {
    const p = local(e);
    if (pointers.has(e.pointerId)) pointers.set(e.pointerId, p);

    if (pointers.size === 2 && pinchDist) {
      const [a, b] = [...pointers.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      zoomAround((a.x + b.x) / 2, (a.y + b.y) / 2, dist / pinchDist);
      pinchDist = dist;
      return;
    }

    if (dragNode) {
      const w = toWorld(p.x, p.y);
      dragNode.fx = w.x;
      dragNode.fy = w.y;
      sim.alpha(0.1).restart();
      return;
    }
    if (panStart) {
      tx = panStart.tx + (p.x - panStart.x);
      ty = panStart.ty + (p.y - panStart.y);
      draw();
      return;
    }

    if (e.pointerType === 'mouse') {
      const found = nodeAt(p.x, p.y, false);
      if (found !== hovered) {
        hovered = found;
        canvas.style.cursor = found ? 'pointer' : '';
        draw();
      }
      if (found) showTooltip(found, p.x, p.y, false);
      else hideTooltip();
    }
  });

  const endPointer = (e) => {
    const p = local(e);
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinchDist = null;

    const isTap = downInfo && Math.hypot(p.x - downInfo.x, p.y - downInfo.y) < 6 && Date.now() - downInfo.t < 400;
    const touch = e.pointerType !== 'mouse';

    if (dragNode) {
      dragNode.fx = null;
      dragNode.fy = null;
      sim.alpha(0.25).restart();
    }
    dragNode = null;
    panStart = null;
    canvas.classList.remove('grabbing');

    if (isTap && e.type === 'pointerup') {
      const found = nodeAt(p.x, p.y, touch);
      if (!touch) {
        if (found) openNode(found);
      } else if (found && found === hovered) {
        openNode(found);
      } else {
        // 터치: 첫 탭은 미리보기, 같은 노드를 다시 탭하면 이동
        hovered = found;
        if (found) showTooltip(found, p.x, p.y, true);
        else hideTooltip();
        draw();
      }
    }
    downInfo = null;
  };
  canvas.addEventListener('pointerup', endPointer);
  canvas.addEventListener('pointercancel', endPointer);

  canvas.addEventListener('pointerleave', (e) => {
    if (e.pointerType === 'mouse' && !dragNode && !panStart) {
      hovered = null;
      hideTooltip();
      draw();
    }
  });

  // ---------- Fit to free area ----------
  // 왼쪽 카드, 위 메뉴, 아래 범례를 피한 빈 영역에 네트워크 전체가 들어오도록 확대·위치 조정
  function fitView() {
    const mobile = isMobile();
    const area = mobile
      ? { x0: 16, x1: W - 16, y0: 84, y1: H - 16 }
      : { x0: W > 1000 ? 32 + 560 + 48 : 32, x1: W - 40, y0: 110, y1: H - 100 };
    const pad = 30;
    const xs = nodes.map((d) => d.x);
    const ys = nodes.map((d) => d.y);
    const bx0 = Math.min(...xs) - pad;
    const bx1 = Math.max(...xs) + pad;
    const by0 = Math.min(...ys) - pad;
    const by1 = Math.max(...ys) + pad;
    // 빈 영역에 딱 맞는 크기보다 살짝 크게 시작
    scale = 1.12 * Math.min(1.2, (area.x1 - area.x0) / (bx1 - bx0), (area.y1 - area.y0) / (by1 - by0));
    tx = (area.x0 + area.x1) / 2 - scale * ((bx0 + bx1) / 2);
    ty = (area.y0 + area.y1) / 2 - scale * ((by0 + by1) / 2);
  }

  // ---------- Zoom ----------
  function zoomAround(cx, cy, factor) {
    const next = Math.min(SCALE_MAX, Math.max(SCALE_MIN, scale * factor));
    tx = cx - (cx - tx) * (next / scale);
    ty = cy - (cy - ty) * (next / scale);
    scale = next;
    draw();
  }

  canvas.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      const p = local(e);
      zoomAround(p.x, p.y, e.deltaY < 0 ? 1.12 : 0.89);
    },
    { passive: false }
  );

  const recenter = () => {
    fitView();
    draw();
  };

  document.getElementById('btn-zoom-in').addEventListener('click', () => zoomAround(W / 2, H / 2, 1.25));
  document.getElementById('btn-zoom-out').addEventListener('click', () => zoomAround(W / 2, H / 2, 0.8));
  document.getElementById('btn-zoom-reset').addEventListener('click', recenter);

  // 모바일에서 스크롤할 때 주소창이 숨겨지며 생기는 높이 변화는 무시 (폭이 바뀔 때만 다시 배치)
  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    if (isMobile() && window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    resize();
    applyForces();
    fitView();
    sim.alpha(0.1).restart();
  });

  // 소개 카드 위에서 스크롤해도 네트워크가 확대·축소되지 않도록
  if (introCard) introCard.addEventListener('wheel', (e) => e.stopPropagation(), { passive: true });
});
