// 메인 화면 왼쪽 하단의 최근 소식 게시판
document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('home-news');
  if (!list) return;

  const items = [...loadNewsItems()].sort((a, b) => String(b.date).localeCompare(String(a.date)));

  // 전체 소식을 모두 넣고, 카드 안에서 스크롤해 지난 소식까지 볼 수 있게 함
  list.innerHTML = items
    .map(
      (item) => `
      <li>
        <a href="news.html#${encodeURIComponent(item.id)}">
          <span class="news-card-meta">${item.date}<br>${item.category}</span>
          <span class="news-card-title">${item.title}</span>
        </a>
      </li>`
    )
    .join('');

  // 카드 안에서 스크롤할 때 네트워크가 확대·축소되지 않도록
  list.closest('.news-card').addEventListener('wheel', (e) => e.stopPropagation(), { passive: true });
});
