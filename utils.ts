export function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function checkElementVisibility(
  element: HTMLElement,
  navbarHeight = 75
) {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  const adjustedTop = Math.max(rect.top, navbarHeight);

  const visibleHeight = Math.max(
    0,
    Math.min(rect.bottom, viewportHeight) - adjustedTop
  );
  const visibleWidth = Math.max(
    0,
    Math.min(rect.right, viewportWidth) - Math.max(rect.left, 0)
  );

  const totalArea = rect.width * rect.height;
  const visibleArea = visibleHeight * visibleWidth;
  const visibilityPercentage =
    totalArea > 0 ? (visibleArea / totalArea) * 100 : 0;
  const isVisible = rect.top >= navbarHeight && rect.bottom <= viewportHeight;

  return visibilityPercentage;
}
