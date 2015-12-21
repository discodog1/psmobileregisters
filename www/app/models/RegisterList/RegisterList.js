import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic'
import {Component} from 'angular2/core';

import {TakeRegister} from '../TakeRegister/TakeRegister'
import {RegisterService} from '../../services/RegisterService'
import {Register} from '../objects'

@Page({
   selector: 'register-list', 
   templateUrl:'app/models/RegisterList/RegisterList.html'
   })
   
export class RegisterList {
  
  //"OnLoad"
	constructor( public regService: RegisterService, app: IonicApp, nav: NavController, navParams: NavParams) { 
    this.nav = nav;
    
    //service will be used to retrieve register data
    this.service = regService;
    
    //populate registers variable with data loaded from service
    this.service.getRegisters().subscribe(res=> this.registers = res);
      
  };
  
  //"module variables"
 
  selectedRegister:Register;

  
  //"register click event"
  selectRegister(event,register: Register) { 
    
    //get single register object to pass to next page - MOVE THIS OUT OF HERE
    var filtered = jLinq.from(this.registers)
    .starts('registerID',register.registerID)
    .first()
    
    //navigate
    this.nav.push(TakeRegister,{data:filtered});
    }
}
