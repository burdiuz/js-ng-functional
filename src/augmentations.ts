import { ComponentClass, MixinClass } from './types';

const classAugmentations: Array<(definition: any) => ComponentClass> = [];

export function addClassAugmentation(fn: (definition: any) => ComponentClass) {
  classAugmentations.push(fn);
}

export function applyClassAugmentations<T>(definition: MixinClass) {
  classAugmentations.forEach((fn) => fn.call(definition, definition));

  return definition as MixinClass & ComponentClass<T>;
}
