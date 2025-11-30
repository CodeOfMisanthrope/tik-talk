export function Deprecated(msg?: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: unknown[]) {
      console.warn(msg ?? "This method has been deprecated!");
      return originalMethod.apply(this, arguments);
    };

    return descriptor;
  };
}
