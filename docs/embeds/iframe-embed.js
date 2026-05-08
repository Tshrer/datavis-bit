function createError(message) {
  const el = document.createElement('div');
  el.style.padding = '16px';
  el.style.color = '#b42318';
  el.style.fontSize = '14px';
  el.textContent = message;
  return el;
}

export function initIsolatedIframe(container, {
  src,
  title = '',
  minHeight = 520,
} = {}) {
  if (!container) throw new Error('initIsolatedIframe: container is required');
  if (!src) throw new Error('initIsolatedIframe: src is required');

  container.replaceChildren();

  // Real iframe: predictable sizing, fetch(), and resize events for embedded charts.
  const frame = document.createElement('iframe');
  frame.src = src;
  frame.title = title || '';
  frame.loading = 'lazy';
  frame.referrerPolicy = 'no-referrer';
  frame.sandbox = 'allow-scripts allow-same-origin allow-popups allow-forms';
  frame.setAttribute('aria-label', title || '');
  frame.style.width = '100%';
  frame.style.height = '100%';
  frame.style.border = '0';
  frame.style.borderRadius = '12px';
  frame.style.display = 'block';
  frame.style.minHeight = `${minHeight}px`;

  frame.addEventListener('error', () => {
    container.replaceChildren(createError(`图表加载失败：${src}`));
  });

  container.appendChild(frame);
}
