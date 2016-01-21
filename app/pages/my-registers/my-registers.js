import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';
import {RegisterList} from '../../models/RegisterList/RegisterList';

@Page({
  templateUrl: 'build/pages/my-registers/my-registers.html',
  directives: [RegisterList]
})
export class MyRegistersPage {
  constructor(app: IonicApp, nav: NavController, navParams: NavParams){
    this.nav = nav;
    };
}

