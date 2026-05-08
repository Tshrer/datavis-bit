(() => {
  const navLinks = Array.from(document.querySelectorAll('.nav__link'));
  const sections = navLinks
    .map((a) => {
      const id = decodeURIComponent((a.getAttribute('href') || '').slice(1));
      const el = id ? document.getElementById(id) : null;
      return el ? { id, el, link: a } : null;
    })
    .filter(Boolean);

  function setActive(id) {
    for (const item of sections) {
      const isActive = item.id === id;
      if (isActive) item.link.setAttribute('aria-current', 'true');
      else item.link.removeAttribute('aria-current');
    }
  }

  // 初始状态
  if (location.hash) {
    const id = decodeURIComponent(location.hash.slice(1));
    if (sections.some((s) => s.id === id)) setActive(id);
  } else if (sections.length) {
    setActive(sections[0].id);
  }

  // 观察滚动位置，高亮当前章节
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));
      if (!visible.length) return;
      const top = visible[0].target;
      if (top && top.id) setActive(top.id);
    },
    {
      root: null,
      threshold: [0.15, 0.3, 0.6],
      rootMargin: '-10% 0px -70% 0px',
    }
  );

  for (const item of sections) observer.observe(item.el);

  // 点击目录时保持 aria-current 立即更新
  for (const item of sections) {
    item.link.addEventListener('click', () => setActive(item.id), { passive: true });
  }
})();
