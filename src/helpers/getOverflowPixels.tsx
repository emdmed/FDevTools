export function getOverflowPixels(element:HTMLElement) {
  if (!element) return { top: 0, left: 0, bottom: 0, right: 0 };
  const rect = element.getBoundingClientRect();
  const overflow = {
    top: rect.top < 0 ? Math.abs(rect.top) : 0,
    left: rect.left < 0 ? Math.abs(rect.left) : 0,
    bottom:
      rect.bottom > window.innerHeight ? rect.bottom - window.innerHeight : 0,
    right: rect.right > window.innerWidth ? rect.right - window.innerWidth : 0,
  };

  return overflow;
}
