import { Component } from '@angular/core';
import { LifeCycle } from './lifecycle.enum';
import { LifeCycleFn, ComponentClass } from './types';
import { registerLifecycleFn } from './utils';
import { createMixinComponent } from './create-component';
import { addClassAugmentation } from './augmentations';

export function register<T>(
  method: LifeCycle,
  component: Component | any,
  fn: LifeCycleFn,
  providers = []
) {
  const definition = createMixinComponent<T>(component);

  registerLifecycleFn(definition as any, method, fn, providers);

  return definition as ComponentClass<T>;
}

export function onInit<T = any>(
  component: Component | any,
  fn: LifeCycleFn,
  providers = []
) {
  const result = register<T>(LifeCycle.INIT, component, fn, providers);

  return result;
}

export function onChanges<T = any>(
  component: Component | any,
  fn: LifeCycleFn,
  providers = []
) {
  return register<T>(LifeCycle.CHANGES, component, fn, providers);
}

export function doCheck<T = any>(
  component: Component | any,
  fn: LifeCycleFn,
  providers = []
) {
  return register<T>(LifeCycle.CHECK, component, fn, providers);
}

export function afterContentInit<T = any>(
  component: Component | any,
  fn: LifeCycleFn,
  providers = []
) {
  return register<T>(LifeCycle.CONTENT_INIT, component, fn, providers);
}

export function afterContentChecked<T = any>(
  component: Component | any,
  fn: LifeCycleFn,
  providers = []
) {
  return register<T>(LifeCycle.CONTENT_CHECKED, component, fn, providers);
}

export function afterViewInit<T = any>(
  component: Component | any,
  fn: LifeCycleFn,
  providers = []
) {
  return register<T>(LifeCycle.VIEW_INIT, component, fn, providers);
}

export function afterViewChecked<T = any>(
  component: Component | any,
  fn: LifeCycleFn,
  providers = []
) {
  return register<T>(LifeCycle.VIEW_CHECKED, component, fn, providers);
}

const AUGMENTATIONS = {
  onInit: function (fn: LifeCycleFn, providers?: any[]) {
    return onInit(this, fn, providers);
  },

  onChanges: function (fn: LifeCycleFn, providers?: any[]) {
    return onChanges(this, fn, providers);
  },

  doCheck: function (fn: LifeCycleFn, providers?: any[]) {
    return doCheck(this, fn, providers);
  },

  afterContentInit: function (fn: LifeCycleFn, providers?: any[]) {
    return afterContentInit(this, fn, providers);
  },

  afterContentChecked: function (fn: LifeCycleFn, providers?: any[]) {
    return afterContentChecked(this, fn, providers);
  },

  afterViewInit: function (fn: LifeCycleFn, providers?: any[]) {
    return afterViewInit(this, fn, providers);
  },

  afterViewChecked: function (fn: LifeCycleFn, providers?: any[]) {
    return afterViewChecked(this, fn, providers);
  },
};

addClassAugmentation(
  (target: any): ComponentClass<any> => Object.assign(target, AUGMENTATIONS)
);
