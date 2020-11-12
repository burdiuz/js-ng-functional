export enum LifeCycle {
  CHANGES = 'ngOnChanges',
  INIT = 'ngOnInit',
  CHECK = 'ngDoCheck',
  CONTENT_INIT = 'ngAfterContentInit',
  CONTENT_CHECKED = 'ngAfterContentChecked',
  VIEW_INIT = 'ngAfterViewInit',
  VIEW_CHECKED = 'ngAfterViewChecked',
  // DESTROY = "ngOnDestroy" // Can't be added.
}
