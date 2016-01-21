import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic'
import {Component} from 'angular2/core';
import {NgClass} from 'angular2/common';

import {TakeRegister} from '../TakeRegister/TakeRegister'
import {RegisterService} from '../../services/RegisterService'
import {Register,RegisterSession} from '../objects'
import {CanActivate} from 'angular2/router'
import {tokenNotExpired} from 'angular2-jwt/angular2-jwt';

@CanActivate(() => tokenNotExpired())
@Page({
   selector: 'register-session-list', 
   templateUrl:'build/models/RegisterSessionList/RegisterSessionList.html',
    providers: [RegisterService]
   })
   
export class RegisterSessionList {
  
  //"OnLoad"
	constructor(  public regService: RegisterService,app: IonicApp, nav: NavController, navParams: NavParams) { 
    this.nav = nav;
    
      this.service = regService;
        this.register = this.service.loadSessions(navParams.get('data'));  
  };
  
  
  //"register click event"
  selectSession(event,session: RegisterSession) { 
    
   
    var filtered = jLinq.from(this.register.sessions)
    .starts('mRegisterSessionID',session.mRegisterSessionID)
    .first()
    
    //navigate
    this.nav.push(TakeRegister,{register:this.register,session:filtered});
    }
}
