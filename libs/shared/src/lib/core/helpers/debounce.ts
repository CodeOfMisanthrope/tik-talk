export function debounce<T extends Function>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function <This>(this: This, ...args: unknown[]) {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    timeout = setTimeout(() => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      func.call(this, ...args);
    }, wait);
  };
}
