import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic'
import {RegisterList} from '../../pages/RegisterList/RegisterList'
import {CanActivate} from 'angular2/router'
import {tokenNotExpired} from 'angular2-jwt/angular2-jwt'
import {LoginPage} from '../../pages/login/login'


import {RdLoading} from '../../components/rd-loading/rd-loading'
import {RdWidget} from '../../components/rd-widget/rd-widget'

import {RdWidgetHeader} from '../../components/rd-widget-header/rd-widget-header'
import {RdWidgetBody} from '../../components/rd-widget-body/rd-widget-body'
import {RdWidgetFooter} from '../../components/rd-widget-footer/rd-widget-footer'


import {RegisterService} from '../../services/RegisterService'

@CanActivate(() => tokenNotExpired())
@Page({
  templateUrl: 'build/pages/home/home.html'
 ,directives: [ RdWidget, RdWidgetHeader, RdWidgetBody, RdWidgetFooter]
 ,providers: [RegisterService]

})



export class HomePage {
 constructor(service:RegisterService, app: IonicApp, nav: NavController, navParams: NavParams) { 
    this.nav = nav;
    this.app = app;
    
    
    //register stats
    this.today= service.today;
    this.taken= service.taken;
    this.missed= service.missed;
    
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
