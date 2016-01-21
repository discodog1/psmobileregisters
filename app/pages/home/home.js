import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';
import {RegisterList} from '../../models/RegisterList/RegisterList'
import {CanActivate} from 'angular2/router'
import {tokenNotExpired} from 'angular2-jwt/angular2-jwt';

@CanActivate(() => tokenNotExpired())
@Page({
  templateUrl: 'build/pages/home/home.html'
})



export class HomePage {
 constructor( app: IonicApp, nav: NavController, navParams: NavParams) { 
    this.nav = nav;
    this.app = app;
 
 };
 
 
 navigateToMyRegisters(event) {
    this.nav.push(RegisterList);
 }
 
};
