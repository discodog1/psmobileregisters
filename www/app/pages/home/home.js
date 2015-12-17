import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';
import {RegisterList} from '../../models/RegisterList/RegisterList'

@Page({
  templateUrl: 'app/pages/home/home.html'
})
export class HomePage {
 constructor( app: IonicApp, nav: NavController, navParams: NavParams) { 
    this.nav = nav;
    this.app = app;
 
 };
 
 navigateToMyRegisters(event) {
    let nav = this.app.getComponent('nav');
    nav.setRoot(RegisterList);
 }
 
}