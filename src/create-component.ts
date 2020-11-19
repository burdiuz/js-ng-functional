import { Component, OnDestroy } from '@angular/core';
import { LifeCycle } from './lifecycle.enum';
import {
  IMixinComponent,
  LifeCycleMethods,
  BaseMixinComponent,
  MixinClass,
} from './types';
import {
  isMixinComponentClass,
  readClassProviders,
  PARAMETERS,
  lifeCycleCall,
} from './utils';
import { applyClassAugmentations } from './augmentations';
import { ComponentClass } from './types';

export function injectComponentClassMixin(definition: any): MixinClass {
  return class FnMixedComponent
    extends definition
    implements IMixinComponent, OnDestroy {
    static [PARAMETERS] = definition[PARAMETERS];
    static readonly $lifecycle: LifeCycleMethods = {};
    static readonly $providers = readClassProviders(definition);
    $destroy: Array<() => void> = [];
    $injections: any[];

    /* FIXME this possibly breaks injections for parent class, I believe angular compiler could not recognize them
    properly so we have to copy __parameters__ property to this extended class.

    Possible fix is on line 17.
    */
    constructor(...injections: any[]) {
      super(...injections);
      this.$injections = injections;
    }

    ngOnInit() {
      if (super.ngOnInit) {
        super.ngOnInit();
      }

      lifeCycleCall(this, LifeCycle.INIT);
    }

    ngOnChanges(...args: any[]) {
      if (super.ngOnChanges) {
        super.ngOnChanges(...args);
      }

      lifeCycleCall(this, LifeCycle.CHANGES, args);
    }

    ngDoCheck() {
      if (super.ngDoCheck) {
        super.ngDoCheck();
      }

      lifeCycleCall(this, LifeCycle.CHECK);
    }

    ngAfterContentInit() {
      if (super.ngAfterContentInit) {
        super.ngAfterContentInit();
      }

      lifeCycleCall(this, LifeCycle.CONTENT_INIT);
    }

    ngAfterContentChecked() {
      if (super.ngAfterContentChecked) {
        super.ngAfterContentChecked();
      }

      lifeCycleCall(this, LifeCycle.CONTENT_CHECKED);
    }

    ngAfterViewInit() {
      if (super.ngAfterViewInit) {
        super.ngAfterViewInit();
      }

      lifeCycleCall(this, LifeCycle.VIEW_INIT);
    }

    ngAfterViewChecked() {
      if (super.ngAfterViewChecked) {
        super.ngAfterViewChecked();
      }

      lifeCycleCall(this, LifeCycle.VIEW_CHECKED);
    }

    ngOnDestroy() {
      if (super.ngOnDestroy) {
        super.ngOnDestroy();
      }

      lifeCycleCall(this, LifeCycle.DESTROY);

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
