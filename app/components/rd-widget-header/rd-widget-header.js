import {Component, View} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common'

@Component({
  selector: 'rd-widget-header',
  properties: ['title', 'icon']
})
@View({
  templateUrl: 'build/components/rd-widget-header/rd-widget-header.html',
  directives: [CORE_DIRECTIVES]
})
export class RdWidgetHeader {
  title:string;
  icon:string;

  constructor() {
    this.title = '';
    this.icon = '';
  }
}
