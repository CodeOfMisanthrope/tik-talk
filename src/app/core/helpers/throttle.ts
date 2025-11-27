export function throttle<T extends Function>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: unknown[] | null = null;

  return function <This>(this: This, ...args: unknown[]) {
    if (!timeout) {
      func.call(this, ...args);

    } else {
      lastArgs = [...args];
      return;
    }

    timeout = setTimeout(() => {
      if (lastArgs) {
        func.call(this, ...lastArgs);
        lastArgs = null;
      }

      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    }, wait);
  };
}
