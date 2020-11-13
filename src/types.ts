import { Component, Type } from '@angular/core';

export type DestroyFn = (component: any, ...dependencies: any[]) => void;

export type LifeCycleFn = (
  component: any,
  ...dependencies: any[]
) => DestroyFn | void;

export interface LifeCycleMethods {
  [key: string]: Array<{ lifeCycleFn: LifeCycleFn; providersFn: () => any[] }>;
}

export class BaseMixinComponent {}

export interface MixinClass {
  new (): BaseMixinComponent;
  $lifecycle: LifeCycleMethods;
  $providers: any[];
}

export interface IMixinComponent {
  readonly $destroy: Array<DestroyFn>;
  $injections: any[];
}

export interface ComponentClass<T = any> extends Type<T> {
  onInit(initFn: LifeCycleFn, providers?: any[]): ComponentClass<T>;
  onChanges(initFn: LifeCycleFn, providers?: any[]): ComponentClass<T>;
  doCheck(initFn: LifeCycleFn, providers?: any[]): ComponentClass<T>;
  afterContentInit(initFn: LifeCycleFn, providers?: any[]): ComponentClass<T>;
  afterContentChecked(
    initFn: LifeCycleFn,
    providers?: any[]
  ): ComponentClass<T>;
  afterViewInit(initFn: LifeCycleFn, providers?: any[]): ComponentClass<T>;
  afterViewChecked(initFn: LifeCycleFn, providers?: any[]): ComponentClass<T>;
  component(component: Component): ComponentClass<T>;
  input(name: string, bindingPropertyName?: string): ComponentClass<T>;
  inputs(...names: string[]): ComponentClass<T>;
  output(name: string, bindingPropertyName?: string): ComponentClass<T>;
  outputs(...names: string[]): ComponentClass<T>;
  prop<U = any>(
    name: string,
    getter: () => U,
    setter: (value: U) => void
  ): ComponentClass<T>;
  method(name: string, fn: (...args: any) => any): ComponentClass<T>;
}
