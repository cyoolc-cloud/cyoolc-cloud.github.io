// 연구실 소식 게시판 (읽기 전용)
// 새 소식은 js/news-data.js의 baseNewsItems 맨 위에 추가하세요.
const newsItems = loadNewsItems();

const newsList = document.querySelector('#news-list');
const newsDetail = document.querySelector('#news-detail');
const newsDetailMeta = document.querySelector('#news-detail-meta');
const newsDetailTitle = document.querySelector('#news-detail-title');
const newsDetailBody = document.querySelector('#news-detail-body');
const newsDetailLink = document.querySelector('#news-detail-link');

const parseDateValue = (value) => {
  const text = String(value || '').trim();
  if (!text) {
    return 0;
  }
  const normalized = text.length === 7 ? `${text}-01` : text;
  const timestamp = Date.parse(normalized);
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

const sortNewsItems = (items) =>
  [...items].sort((a, b) => parseDateValue(b.date) - parseDateValue(a.date) || String(b.id).localeCompare(String(a.id)));

// 펼친 소식의 상세 내용은 해당 줄 바로 아래에 표시
const detailHome = newsDetail ? newsDetail.parentElement : null;
let openNewsId = null;

const closeNewsDetail = () => {
  if (!newsDetail || !detailHome || !newsList) {
    return;
  }
  newsDetail.hidden = true;
  detailHome.appendChild(newsDetail);
  newsList.querySelectorAll('.news-detail-row').forEach((row) => row.remove());
  newsList.querySelectorAll('.news-link').forEach((btn) => {
    btn.textContent = '보기';
    btn.setAttribute('aria-expanded', 'false');
  });
  openNewsId = null;
};

const openNewsDetail = (item) => {
  if (!newsDetail || !newsList) {
    return;
  }
  closeNewsDetail();

  newsDetailMeta.textContent = `${item.date} · ${item.category}`;
  newsDetailTitle.textContent = item.title;
  newsDetailBody.textContent = item.content || '상세 내용이 없습니다.';
  newsDetailLink.style.display = item.url ? 'inline-block' : 'none';
  if (item.url) {
    newsDetailLink.href = item.url;
  }

  const button = newsList.querySelector(`.news-link[data-id="${CSS.escape(item.id)}"]`);
  const itemRow = button && button.closest('li');
  if (itemRow) {
    const detailRow = document.createElement('li');
    detailRow.className = 'news-detail-row';
    detailRow.appendChild(newsDetail);
    itemRow.after(detailRow);
    button.textContent = '닫기';
    button.setAttribute('aria-expanded', 'true');
  }
  newsDetail.hidden = false;
  openNewsId = item.id;
};

if (newsList) {
  newsList.innerHTML = sortNewsItems(newsItems)
    .map(
      (item) => `
      <li class="news-item">
        <span class="news-date">${item.date}</span>
        <span class="news-tag">${item.category}</span>
        <p class="news-title">${item.title}</p>
        <button class="news-link" type="button" data-id="${item.id}" aria-expanded="false">보기</button>
      </li>`
    )
    .join('');

  newsList.addEventListener('click', (event) => {
    const button = event.target.closest('.news-link');
    if (!button) {
      return;
    }
    const selected = newsItems.find((item) => item.id === button.dataset.id);
    if (!selected) {
      return;
    }
    if (openNewsId === selected.id) {
      closeNewsDetail();
    } else {
      openNewsDetail(selected);
    }
  });
}

// 메인 화면 최근 소식에서 넘어온 경우 해당 소식을 펼침
const linkedNews = newsItems.find((item) => item.id === decodeURIComponent(window.location.hash.slice(1)));
if (linkedNews) {
  openNewsDetail(linkedNews);
  newsDetail.scrollIntoView({ block: 'center' });
}
