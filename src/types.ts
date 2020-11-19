import { Component, Directive, Type } from '@angular/core';

export type DestroyFn = (component: any, ...dependencies: any[]) => void;

export type LifeCycleFn<T = any> = (
  component: T,
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
  $destroy: Array<DestroyFn>;
  $injections: any[];
}

export interface ComponentClass<T = any> extends Type<T> {
  onInit(initFn: LifeCycleFn<T>, providers?: any[]): ComponentClass<T>;
  onChanges(initFn: LifeCycleFn<T>, providers?: any[]): ComponentClass<T>;
  doCheck(initFn: LifeCycleFn<T>, providers?: any[]): ComponentClass<T>;
  afterContentInit(initFn: LifeCycleFn<T>, providers?: any[]): ComponentClass<T>;
  afterContentChecked(
    initFn: LifeCycleFn<T>,
    providers?: any[]
  ): ComponentClass<T>;
  afterViewInit(initFn: LifeCycleFn<T>, providers?: any[]): ComponentClass<T>;
  afterViewChecked(initFn: LifeCycleFn<T>, providers?: any[]): ComponentClass<T>;
  component(component: Component): ComponentClass<T>;
  directive(directive: Directive): ComponentClass<T>;
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
