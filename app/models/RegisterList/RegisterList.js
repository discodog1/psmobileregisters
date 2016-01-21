import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic'
import {Component} from 'angular2/core';

import {RegisterSessionList} from '../RegisterSessionList/RegisterSessionList'
import {RegisterService} from '../../services/RegisterService'
import {Register} from '../objects'
import {CanActivate} from 'angular2/router'
import {tokenNotExpired} from 'angular2-jwt/angular2-jwt';

@CanActivate(() => tokenNotExpired())
@Page({
   selector: 'register-list', 
   templateUrl:'build/models/RegisterList/RegisterList.html',
   providers: [RegisterService]
   })
   
export class RegisterList {
  
  //"OnLoad"
	constructor( public regService: RegisterService, app: IonicApp, nav: NavController, navParams: NavParams) { 
    this.nav = nav;
    
   
    //populate registers variable with data loaded from service
      if (localStorage.getItem("Registers")) {
         this.registers = JSON.parse(localStorage.getItem("Registers"));
      }
      else {
          //service will be used to retrieve register data
          this.service = regService;
          this.service.getRegisters().subscribe(res=> this.registers = res);
      }
    
      
  };
  
  //"module variables"
 
  selectedRegister:Register;

  
  //"register click event"
  selectRegister(event,register: Register) { 
    
    //navigate
    this.nav.push(RegisterSessionList,{data:register});
    };
    
    refreshRegisters(event) {      
        this.registers = [];
        localStorage.removeItem("Registers");
        localStorage.removeItem("MyRegistersToday");
        this.regService.getRegisters().subscribe(res=> this.registers = res);

    };
}
