import { Component, ElementRef} from '@angular/core';

@Component({
  selector: 'tab-title',
  template: '<ng-content></ng-content>'
})
export class TabTitleComponent {
  constructor(public elRef: ElementRef) {}
}
