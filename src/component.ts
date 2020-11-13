import { Component, OnDestroy } from '@angular/core';
import { LifeCycle } from './lifecycle.enum';
import {
  IMixinComponent,
  LifeCycleMethods,
  BaseMixinComponent,
  MixinClass,
} from './types';
import { lifeCycleCall } from './utils';
import { applyClassAugmentations } from './augmentations';
import { ComponentClass } from './types';

const PARAMETERS = '__parameters__';

export function isMixinComponentClass({ $lifecycle, $providers }) {
  return !!($lifecycle && $providers);
}

export function readClassProviders({ [PARAMETERS]: params = [], length }) {
  const lc = [];
  lc.length = length;

  return params.reduce((list, param, index) => {
    if (!param) {
      return list;
    }

    const { token } = param.find((opt) => opt && opt.token) || {};

    list[index] = token;

    return list;
  }, lc);
}

export function injectComponentClassMixin(definition: any): MixinClass {
  return class FnMixedComponent
    extends definition
    implements IMixinComponent, OnDestroy {
    static readonly $lifecycle: LifeCycleMethods = {};
    static readonly $providers = readClassProviders(definition);
    $destroy: Array<() => void> = [];
    $injections: any[];

    constructor(...injections: any[]) {
      super();
      this.$injections = injections;
    }

    ngOnInit(...args: any[]) {
      if (super.ngOnInit) {
        super.ngOnInit(...args);
      }

      lifeCycleCall(this, LifeCycle.INIT, args);
    }

    ngOnChanges(...args: any[]) {
      if (super.ngOnChanges) {
        super.ngOnChanges(...args);
      }

      lifeCycleCall(this, LifeCycle.CHANGES, args);
    }

    ngDoCheck(...args: any[]) {
      if (super.ngDoCheck) {
        super.ngDoCheck(...args);
      }

      lifeCycleCall(this, LifeCycle.CHECK, args);
    }

    ngAfterContentInit(...args: any[]) {
      if (super.ngAfterContentInit) {
        super.ngAfterContentInit(...args);
      }

      lifeCycleCall(this, LifeCycle.CONTENT_INIT, args);
    }

    ngAfterContentChecked(...args: any[]) {
      if (super.ngAfterContentChecked) {
        super.ngAfterContentChecked(...args);
      }

      lifeCycleCall(this, LifeCycle.CONTENT_CHECKED, args);
    }

    ngAfterViewInit(...args: any[]) {
      if (super.ngAfterViewInit) {
        super.ngAfterViewInit(...args);
      }

      lifeCycleCall(this, LifeCycle.VIEW_INIT, args);
    }

    ngAfterViewChecked(...args: any[]) {
      if (super.ngAfterViewChecked) {
        super.ngAfterViewChecked(...args);
      }

      lifeCycleCall(this, LifeCycle.VIEW_CHECKED, args);
    }

    ngOnDestroy() {
      if (super.ngOnDestroy) {
        super.ngOnDestroy();
      }

      this.$destroy.forEach((fn) => fn());
      this.$destroy = [];
    }
  };
}

export function createMixinComponentClass() {
  return injectComponentClassMixin(BaseMixinComponent);
}

export function createMixinComponent<T>(
  component: Component | any
): ComponentClass<T> & MixinClass {
  if (typeof component === 'function') {
    if (isMixinComponentClass(component)) {
      return component as ComponentClass<T> & MixinClass;
    }

    return applyClassAugmentations<T>(injectComponentClassMixin(component));
  }

  const definition = applyClassAugmentations<T>(createMixinComponentClass());

  if (component) {
    return Component({ ...component })(definition);
  }

  return definition;
}
