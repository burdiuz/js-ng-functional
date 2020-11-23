import { Component } from '@angular/core';
import { onInit } from '../../../src/jit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'example';
}

export const TestComponent = onInit(
  {
    selector: 'app-test',
    template: '<span>{{label}}</span><span> {{text}}</span>',
  },
  (target) => {
    console.log('ON INIT DECORATOR WORKS!');
    target.label = 'Example:';
  }
)
  .onInit((target) => {
    console.log('ANOTHER ON INIT DECORATOR WORKS!');
  })
  .onInit((target) => {
    console.log('AND ANOTHER ON INIT DECORATOR WORKS!');
  })
  .input('text');
