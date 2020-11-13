import { Component, Input, Output } from '@angular/core';
import { ComponentClass } from './types';
import { addClassAugmentation } from './augmentations';
import { createMixinComponent } from './component';

export function setComponent(target: any, component: Component) {
  const definition: ComponentClass = createMixinComponent(target);

  Component(component)(definition);

  return definition;
}

export function setInput(
  component: Component | any,
  name: string,
  bindingPropertyName?: string
) {
  const definition: ComponentClass = createMixinComponent(component);

  const { prototype: target } = definition;

  Input(bindingPropertyName)(
    target,
    name,
    Object.getOwnPropertyDescriptor(target, name)
  );

  return definition;
}

export function setInputs(component: Component | any, ...names: string[]) {
  return names.reduce(
    (target, name) => setInput(target, name),
    component
  ) as ComponentClass;
}

export function setOutput(
  component: Component | any,
  name: string,
  bindingPropertyName?: string
) {
  const definition: ComponentClass = createMixinComponent(component);

  const { prototype: target } = definition;

  Output(bindingPropertyName)(
    target,
    name,
    Object.getOwnPropertyDescriptor(target, name)
  );

  return definition;
}

export function setOutputs(component: Component | any, ...names: string[]) {
  return names.reduce(
    (target, name) => setOutput(target, name),
    component
  ) as ComponentClass;
}

export function setProp<T = any>(
  component: Component | any,
  name: string,
  getter: () => T,
  setter: (value: T) => void
) {
  const definition: ComponentClass = createMixinComponent(component);

  const { prototype: target } = definition;

  Object.defineProperty(target, name, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });

  return definition;
}

export function setMethod(
  component: Component | any,
  name: string,
  fn: (...args: any) => any
) {
  const definition: ComponentClass = createMixinComponent(component);

  const { prototype: target } = definition;

  target[name] = function (...args: any[]) {
    return fn.call(this, this, ...args);
  };

  return definition;
}

const AUGMENTATIONS = {
  component: function (component: Component) {
    return setComponent(this, component);
  },
  input: function (name: string, bindingPropertyName?: string) {
    return setInput(this, name, bindingPropertyName);
  },

  inputs: function (...names: string[]) {
    return setInputs(this, ...names);
  },

  output: function (name: string, bindingPropertyName?: string) {
    return setOutput(this, name, bindingPropertyName);
  },

  outputs: function (...names: string[]) {
    return setOutputs(this, ...names);
  },

  prop: function <T = any>(
    name: string,
    getter: () => T,
    setter: (value: T) => void
  ) {
    return setProp(this, name, getter, setter);
  },

  method: function (name: string, fn: (...args: any) => any) {
    return setMethod(this, name, fn);
  },
};

addClassAugmentation(
  (target: any): ComponentClass => Object.assign(target, AUGMENTATIONS)
);
