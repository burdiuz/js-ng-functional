import { Inject, inject } from '@angular/core';
import { MixinClass, LifeCycleFn, IMixinComponent, DestroyFn } from './types';

export const PARAMETERS = '__parameters__';

export function isMixinComponentClass({ $lifecycle, $providers }) {
  return !!($lifecycle && $providers);
}

export function readClassProviders({ [PARAMETERS]: params = [], length }) {
  const lc = [];
  lc.length = length;

  return params.reduce((list, param, index) => {
    if (!param) {
      return list;
    }

    const { token } = param.find((opt) => opt && opt.token) || {};

    list[index] = token;

    return list;
  }, lc);
}

export const registerLifecycleFn = (
  definition: MixinClass,
  method: string,
  lifeCycleFn: LifeCycleFn,
  providers = []
) => {
  const { $lifecycle, $providers } = definition;

  const fns = $lifecycle[method] || ($lifecycle[method] = []);

  const providersFn = providers.reduce(
    (prevFn, dependencyDef) => {
      let index = $providers.indexOf(dependencyDef);

      if (index < 0) {
        index = providers.length;
        providers[index] = dependencyDef;
        Inject(dependencyDef)(definition, undefined, index);
      }

      return (injections?: any[]) => {
        const list = prevFn(injections);

        let dependency = injections ? injections[index] : null;

        list.push(dependency || inject(dependencyDef));

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

  if (!target.$destroy) {
    target.$destroy = [];
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
