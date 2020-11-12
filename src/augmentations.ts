import { ComponentClass } from './types';

const classAugmentations: Array<(definition: any) => ComponentClass> = [];

export const addClassAugmentation = (
  fn: (definition: any) => ComponentClass
) => {
  classAugmentations.push(fn);
};

export const applyClassAugmentations = (definition: any) =>
  classAugmentations.reduce((fn) => {
    fn.call(definition, definition);

    return definition;
  }, definition);
