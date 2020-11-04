import { Inject } from '@angular/core';
import {
  MixinClass,
  LifeCycleFn,
  IMixinComponent,
  DestroyFn,
} from './types';

export const registerLifecycleFn = (
  definition: MixinClass,
  method: string,
  lifeCycleFn: LifeCycleFn,
  providers = []
) => {
  const { $lifecycle, $providers } = definition;

  const fns = $lifecycle[method] || ($lifecycle[method] = []);

  const providersFn = providers.reduce(
    (prevFn, dep) => {
      let index = $providers.indexOf(dep);

      if (index < 0) {
        index = providers.length;
        providers[index] = dep;
        Inject(dep)(definition, undefined, index);
      }

      return (injections: any[]) => {
        const list = prevFn(injections);

        list.push(injections[index]);

        return list;
      };
    },
    () => []
  );

  fns.push({ lifeCycleFn, providersFn });
};

export const lifeCycleCall = (
  target: IMixinComponent,
  method: string,
  args: any[] = []
) => {
  const {
    constructor: {
      $lifecycle: { [method]: list },
    },
  } = Object.getPrototypeOf(target);

  if (!list) {
    return;
  }

  target.$destroy.push(
    ...list.reduce((finishers: DestroyFn[], { lifeCycleFn, providersFn }) => {
      const injections = providersFn(target.$injections);
      const result = lifeCycleFn.call(target, target, ...injections, ...args);

      if (result) {
        finishers.push(() => result.call(target, target, ...injections));
      }

      return finishers;
    }, [])
  );
};
