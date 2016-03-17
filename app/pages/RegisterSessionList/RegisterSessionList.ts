import {IonicApp, Page, NavController, NavParams} from 'ionic-angular'
import {Component,OnInit} from 'angular2/core';
import {NgClass} from 'angular2/common';

import {TakeRegister} from '../TakeRegister/TakeRegister'
import {RegisterService} from '../../services/RegisterService'
import {Register,RegisterSession} from '../../models/objects'

import {tokenNotExpired} from 'angular2-jwt/angular2-jwt';


@Page({
   selector: 'register-session-list', 
   templateUrl:'build/pages/RegisterSessionList/RegisterSessionList.html'
   })
   
export class RegisterSessionList implements OnInit {
  nav:NavController;
  register: Register;
  regParam: Register;

ngOnInit() {
     this.register = this.regService.loadSessions(this.regParam); 
}
	constructor(  private regService: RegisterService,app: IonicApp, nav: NavController, navParams: NavParams) { 
    this.nav = nav;
    this.regParam = navParams.get('data')
         
  };
  
  
  selectSession(event,session: RegisterSession) { 
    
   
    var filtered = jLinq.from(this.register.sessions)
    .starts('mRegisterSessionID',session.mRegisterSessionID)
    .first()
    
    this.nav.push(TakeRegister,{register:this.register,session:filtered});
    }
}
