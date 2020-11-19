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

export function NgOnInit(fn: LifeCycleFn, providers?: any[]) {
  return function (definition: T) {
    mixIntoComponent<T>(definition);

    registerLifecycleFn(definition as any, LifeCycle.CHANGES, fn, providers);
  };
}

export function NgDoCheck(fn: LifeCycleFn, providers?: any[]) {
  return function (definition: T) {
    mixIntoComponent<T>(definition);

    registerLifecycleFn(definition as any, LifeCycle.CHANGES, fn, providers);
  };
}

export function NgAfterContentInit(fn: LifeCycleFn, providers?: any[]) {
  return function (definition: T) {
    mixIntoComponent<T>(definition);

    registerLifecycleFn(definition as any, LifeCycle.CHANGES, fn, providers);
  };
}

export function NgAfterContentChecked(fn: LifeCycleFn, providers?: any[]) {
  return function (definition: T) {
    mixIntoComponent<T>(definition);

    registerLifecycleFn(definition as any, LifeCycle.CHANGES, fn, providers);
  };
}

export function NgAfterViewInit(fn: LifeCycleFn, providers?: any[]) {
  return function (definition: T) {
    mixIntoComponent<T>(definition);

    registerLifecycleFn(definition as any, LifeCycle.CHANGES, fn, providers);
  };
}

export function NgAfterViewChecked(fn: LifeCycleFn, providers?: any[]) {
  return function (definition: T) {
    mixIntoComponent<T>(definition);

    registerLifecycleFn(definition as any, LifeCycle.CHANGES, fn, providers);
  };
}
