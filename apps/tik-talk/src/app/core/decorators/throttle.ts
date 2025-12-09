import { throttle } from '../helpers/throttle';

export function Throttle(wait: number) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = throttle(originalMethod, wait);

    return descriptor;
  };
}
