import { Component } from '@angular/core';

export type DestroyFn = (component: any, ...dependencies: any[]) => void;

export type LifeCycleFn = (
  component: any,
  ...dependencies: any[]
) => DestroyFn | void;

interface LifeCycleMethods {
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

export interface ComponentClass {
  new (): any;
  onInit(initFn: LifeCycleFn, providers?: any[]): ComponentClass;
  onChanges(initFn: LifeCycleFn, providers?: any[]): ComponentClass;
  doCheck(initFn: LifeCycleFn, providers?: any[]): ComponentClass;
  afterContentInit(initFn: LifeCycleFn, providers?: any[]): ComponentClass;
  afterContentChecked(initFn: LifeCycleFn, providers?: any[]): ComponentClass;
  afterViewInit(initFn: LifeCycleFn, providers?: any[]): ComponentClass;
  afterViewChecked(initFn: LifeCycleFn, providers?: any[]): ComponentClass;
  setComponent(component: Component): ComponentClass;
}
