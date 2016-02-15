import {IonicApp, Page, NavController, NavParams} from 'ionic-framework/ionic'
import {RegisterList} from '../../pages/RegisterList/RegisterList'

import {tokenNotExpired} from 'angular2-jwt/angular2-jwt'
import {LoginPage} from '../../pages/login/login'
import {OnInit} from 'angular2/core'


import {RdLoading} from '../../components/rd-loading/rd-loading'
import {RdWidget} from '../../components/rd-widget/rd-widget'

import {RdWidgetHeader} from '../../components/rd-widget-header/rd-widget-header'
import {RdWidgetBody} from '../../components/rd-widget-body/rd-widget-body'
import {RdWidgetFooter} from '../../components/rd-widget-footer/rd-widget-footer'


import {RegisterService} from '../../services/RegisterService'


@Page({
  templateUrl: 'build/pages/home/home.html'
 ,directives: [ RdWidget, RdWidgetHeader, RdWidgetBody, RdWidgetFooter]

})



export class HomePage implements OnInit {
    nav:NavController;
    app: IonicApp;
    today:any;
    taken:any;
    missed:any;
    
    ngOnInit() {
        
        //routing to login not working (02/02/16)
        if(!tokenNotExpired()) {
            this.nav.push(LoginPage);
        };
    
        this.service.getRegisterStats();
        
        //register stats
        this.today= this.service.today;
        this.taken= this.service.taken;
        this.missed= this.service.missed;
    }
    
 constructor(private service:RegisterService, app: IonicApp, nav: NavController, navParams: NavParams) { 
    this.nav = nav;
    this.app = app;

   
    
 };
 
 
 navigateToMyRegisters(event) {
    this.nav.push(RegisterList);
 }
 
};
