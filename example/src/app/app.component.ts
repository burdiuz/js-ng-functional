import { Component, Type } from '@angular/core';
import { onInit } from '../../../src/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'example';
}

function generate() {
  return Component({
    selector: 'app-test',
    template: '<span>{{label}}</span><span>{{text}}</span>',
  })(
    class SomethingComponent {
      title = 'example';
    }
  );
}

export const TestComponent = generate();

/*onInit(
  {
    selector: 'app-test',
    template: '<span>{{label}}</span><span>{{text}}</span>',
  },
  (target) => {
    target.label = 'Example:';
  }
);
*/
