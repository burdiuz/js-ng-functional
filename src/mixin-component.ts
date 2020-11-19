import { LifeCycle } from './lifecycle.enum';
import { MixinClass } from './types';
import {
  isMixinComponentClass,
  readClassProviders,
  lifeCycleCall,
} from './utils';
import { applyClassAugmentations } from './augmentations';
import { ComponentClass } from './types';

export const LIFECYCLE = '$lifecycle';
export const PROVIDERS = '$providers';

const createLifecycleMethod = (superFn, fn) => {
  if (!superFn) {
    return fn;
  }

  return function (...args) {
    superFn.apply(this, args);
    fn.apply(this, args);
  };
};

export function injectComponentClassMixin(definition: any): MixinClass {
  const { prototype: proto } = definition;
  const {
    ngOnInit,
    ngOnChanges,
    ngDoCheck,
    ngAfterContentInit,
    ngAfterContentChecked,
    ngAfterViewInit,
    ngAfterViewChecked,
    ngOnDestroy,
  } = proto;

  Object.defineProperty(definition, LIFECYCLE, { value: {} });
  Object.defineProperty(definition, PROVIDERS, {
    value: readClassProviders(definition),
  });

  proto.ngOnInit = createLifecycleMethod(ngOnInit, function () {
    lifeCycleCall(this, LifeCycle.INIT);
  });

  proto.ngOnChanges = createLifecycleMethod(ngOnChanges, function () {
    lifeCycleCall(this, LifeCycle.CHANGES);
  });

  proto.ngDoCheck = createLifecycleMethod(ngDoCheck, function () {
    lifeCycleCall(this, LifeCycle.CHECK);
  });

  proto.ngAfterContentInit = createLifecycleMethod(
    ngAfterContentInit,
    function () {
      lifeCycleCall(this, LifeCycle.CONTENT_INIT);
    }
  );

  proto.ngAfterContentChecked = createLifecycleMethod(
    ngAfterContentChecked,
    function () {
      lifeCycleCall(this, LifeCycle.CONTENT_CHECKED);
    }
  );

  proto.ngAfterViewInit = createLifecycleMethod(ngAfterViewInit, function () {
    lifeCycleCall(this, LifeCycle.VIEW_INIT);
  });

  proto.ngAfterViewChecked = createLifecycleMethod(
    ngAfterViewChecked,
    function () {
      lifeCycleCall(this, LifeCycle.VIEW_CHECKED);
    }
  );

  proto.ngOnDestroy = createLifecycleMethod(ngOnDestroy, function () {
    lifeCycleCall(this, LifeCycle.DESTROY);

    if (this.$destroy) {
      this.$destroy.forEach((fn) => fn());
      this.$destroy = [];
    }
  });

  return definition;
}

export function mixIntoComponent<T>(
  definition: any
): ComponentClass<T> & MixinClass {
  if (!definition || typeof definition !== 'function') {
    throw new Error(
      `Component class should be passed for lifecycle augmentations, instead received ${typeof definition}.`
    );
  }

  if (!isMixinComponentClass(definition)) {
    applyClassAugmentations<T>(injectComponentClassMixin(definition));
  }

  return definition as ComponentClass<T> & MixinClass;
}
