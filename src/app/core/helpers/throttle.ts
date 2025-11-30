export function throttle<T extends Function>(func: T, wait: number) {
  let isThrottled = false;
  let lastArgs: unknown[] | null = null;

  function wrapper<This>(this: This, ...args: unknown[]) {
    if (isThrottled) {
      lastArgs = [...args];
      return;
    }

    func.call(this, ...args);

    isThrottled = true;

    const timeout:ReturnType<typeof setTimeout> = setTimeout(() => {
      isThrottled = false;
      if (lastArgs) {
        wrapper.call(this, ...lastArgs);
        lastArgs = null;
      }

      clearTimeout(timeout);
    }, wait);
  }

  return wrapper;
}
