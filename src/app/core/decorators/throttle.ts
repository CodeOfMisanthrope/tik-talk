export function Throttle(wait: number) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    let timeout: ReturnType<typeof setTimeout> | null = null;
    let lastArgs: unknown[] | null = null;

    descriptor.value = function (...args: any[]) {
      if (!timeout) {
        originalMethod.call(this, ...args);

      } else {
        lastArgs = [...args];
        return;
      }

      timeout = setTimeout(() => {
        if (lastArgs) {
          originalMethod.call(this, ...lastArgs);
          lastArgs = null;
        }

        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
      }, wait);
    };

    return descriptor;
  };
}
