import { LifeCycle } from './lifecycle.enum';
import { mixIntoComponent } from './mixin-component';
import { LifeCycleFn } from './types';
import { registerLifecycleFn } from './utils';

export function NgOnChanges<T = any>(fn: LifeCycleFn<T>, providers?: any[]) {
  return function (definition: T) {
    mixIntoComponent<T>(definition);

    registerLifecycleFn(definition as any, LifeCycle.CHANGES, fn, providers);
  };
}

export function NgOnInit<T = any>(fn: LifeCycleFn<T>, providers?: any[]) {
  return function (definition: T) {
    mixIntoComponent<T>(definition);

    registerLifecycleFn(definition as any, LifeCycle.CHANGES, fn, providers);
  };
}

export function NgDoCheck<T = any>(fn: LifeCycleFn<T>, providers?: any[]) {
  return function (definition: T) {
    mixIntoComponent<T>(definition);

    registerLifecycleFn(definition as any, LifeCycle.CHANGES, fn, providers);
  };
}

export function NgAfterContentInit<T = any>(
  fn: LifeCycleFn<T>,
  providers?: any[]
) {
  return function (definition: T) {
    mixIntoComponent<T>(definition);

    registerLifecycleFn(
      definition as any,
      LifeCycle.CONTENT_INIT,
      fn,
      providers
    );
  };
}

export function NgAfterContentChecked<T = any>(
  fn: LifeCycleFn<T>,
  providers?: any[]
) {
  return function (definition: T) {
    mixIntoComponent<T>(definition);

    registerLifecycleFn(
      definition as any,
      LifeCycle.CONTENT_CHECKED,
      fn,
      providers
    );
  };
}

export function NgAfterViewInit<T = any>(
  fn: LifeCycleFn<T>,
  providers?: any[]
) {
  return function (definition: T) {
    mixIntoComponent<T>(definition);

    registerLifecycleFn(definition as any, LifeCycle.VIEW_INIT, fn, providers);
  };
}

export function NgAfterViewChecked<T = any>(
  fn: LifeCycleFn<T>,
  providers?: any[]
) {
  return function (definition: T) {
    mixIntoComponent<T>(definition);

    registerLifecycleFn(
      definition as any,
      LifeCycle.VIEW_CHECKED,
      fn,
      providers
    );
  };
}
