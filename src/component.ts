import { Component, OnDestroy } from '@angular/core';
import { LifeCycle } from './lifecycle.enum';
import { IMixinComponent, LifeCycleMethods, BaseMixinComponent } from './types';
import { lifeCycleCall } from './utils';
import { applyClassAugmentations } from './augmentations';

const PARAMETERS = '__parameters__';

const isMixinComponentClass = ({ $lifecycle, $providers }) =>
  !!($lifecycle && $providers);

const readClassProviders = ({ [PARAMETERS]: params, length }) => {
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
};

const injectComponentClassMixin = (definition: any) => {
  if (isMixinComponentClass(definition)) {
    return definition;
  }

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
};

export const createMixinComponentClass = () =>
  injectComponentClassMixin(BaseMixinComponent);

export const createMixinComponent = (component: Component | any) => {
  if (typeof component === 'function') {
    return injectComponentClassMixin(component);
  }

  const definition = applyClassAugmentations(createMixinComponentClass());

  if (component) {
    return Component({ ...component })(definition);
  }

  return definition;
};
