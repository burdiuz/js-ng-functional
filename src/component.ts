import { Component, OnDestroy } from '@angular/core';
import { LifeCycle } from './lifecycle.enum';
import { IMixinComponent, BaseMixinComponent, ComponentClass } from './types';
import { lifeCycleCall } from './utils';

let augmentationFn: (component: any) => ComponentClass = null;

export const setAugmentationFn = (fn: (component: any) => ComponentClass) => {
  augmentationFn = fn;
};

export const createMixinComponentClass = () =>
  class FnMixedComponent
    extends BaseMixinComponent
    implements IMixinComponent, OnDestroy {
    static readonly $lifecycle = {};
    static readonly $providers = [];
    $destroy: Array<() => void> = [];
    $injections: any[];

    constructor(...injections: any[]) {
      super();
      this.$injections = injections;
    }

    ngOnInit(...args: any[]) {
      lifeCycleCall(this, LifeCycle.INIT, args);
    }

    ngOnChanges(...args: any[]) {
      lifeCycleCall(this, LifeCycle.CHANGES, args);
    }

    ngDoCheck(...args: any[]) {
      lifeCycleCall(this, LifeCycle.CHECK, args);
    }

    ngAfterContentInit(...args: any[]) {
      lifeCycleCall(this, LifeCycle.CONTENT_INIT, args);
    }

    ngAfterContentChecked(...args: any[]) {
      lifeCycleCall(this, LifeCycle.CONTENT_CHECKED, args);
    }

    ngAfterViewInit(...args: any[]) {
      lifeCycleCall(this, LifeCycle.VIEW_INIT, args);
    }

    ngAfterViewChecked(...args: any[]) {
      lifeCycleCall(this, LifeCycle.VIEW_CHECKED, args);
    }

    ngOnDestroy() {
      this.$destroy.forEach((fn) => fn());
      this.$destroy = [];
    }
  };

export const createMixinComponent = (component: Component) => {
  const definition = augmentationFn(createMixinComponentClass());

  if (component) {
    return Component({ ...component })(definition);
  }

  return definition;
};
