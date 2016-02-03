import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic'
import {RegisterList} from '../../pages/RegisterList/RegisterList'
import {CanActivate} from 'angular2/router'
import {tokenNotExpired} from 'angular2-jwt/angular2-jwt'
import {LoginPage} from '../../pages/login/login'

@CanActivate(() => tokenNotExpired())
@Page({
  templateUrl: 'build/pages/home/home.html'
})



export class HomePage {
 constructor( app: IonicApp, nav: NavController, navParams: NavParams) { 
    this.nav = nav;
    this.app = app;
    
    //routing to login not working (02/02/16)
    if(!tokenNotExpired()) {
         this.nav.push(LoginPage);
    }
    ;
 };
 
 
 navigateToMyRegisters(event) {
    this.nav.push(RegisterList);
 }
 
};
