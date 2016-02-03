import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic'
import {Component} from 'angular2/core';

import {RegisterSessionList} from '../RegisterSessionList/RegisterSessionList'
import {RegisterService} from '../../services/RegisterService'
import {Register} from '../../models/objects'
import {CanActivate} from 'angular2/router'
import {tokenNotExpired} from 'angular2-jwt/angular2-jwt';

@CanActivate(() => tokenNotExpired())
@Page({
   selector: 'register-list', 
   templateUrl:'build/pages/RegisterList/RegisterList.html',
   providers: [RegisterService]
   })
   
export class RegisterList {
  
  //"OnLoad"
	constructor( public regService: RegisterService, app: IonicApp, nav: NavController, navParams: NavParams) { 
    this.nav = nav;
    this.isBusy = false;
       this.statusS="Idle";
    this.detailsS="";
    //populate registers variable with data loaded from service
      if (localStorage.getItem("Registers")) {
         this.registers = JSON.parse(localStorage.getItem("Registers"));
      }
      else {
          //service will be used to retrieve register data
          this.service = regService;
          
          this.isBusy=true
          this.statusS="Fetching Data...";
          this.service.getRegisters().subscribe(res=> this.gotRegisters(res),err=> this.failedGet(err));
      }
    
      
  };
  
  gotRegisters(res) {
      this.registers = res;
      this.statusS="Pull Complete";
      this.detailsS="Successfully received data."
      this.isBusy=false;
  }
  
  failedGet(err) {
      this.statusS="Pull Failed";
      this.detailsS=err;
      this.isBusy=false;
  }
  
  //"module variables"
 
  selectedRegister:Register;

  
  //"register click event"
  selectRegister(event,register: Register) { 
    
    //navigate
    this.nav.push(RegisterSessionList,{data:register});
    };
    
    refreshRegisters(event) {   
        this.statusS="Starting";
        this.detailsS="";
        
          var data = localStorage.getItem("MyRegistersToday");
         
         //probably won't happen but cropped up when manually messing with localStorage
         if (!data) {
             data=[];
         }
             
          if (data.length > 2) {
                this.isBusy=true
                this.statusS="Uploading Data...";
                this.regService.Sync().subscribe(
                        res=>this.ParseSyncResult(res),
                        err=>this.detailsS=err 
                        );
          }  
          
        this.pullData();
        
        
    };
     
     pullData() {
          this.registers = [];
            localStorage.removeItem("Registers");
            localStorage.removeItem("MyRegistersToday");
            this.isBusy=true;
            this.regService.getRegisters().subscribe(res=> this.gotRegisters(res),err=> this.failedGet(err) );
     }
     
     ParseSyncResult(result) {
          
         var success=false;
          if (result._body == "Session(s) Uploaded") {
              success=true;
            
          }
           if (success) {
              this.statusS = "Successfully Pushed Data - Pulling from Server...";
             this.pullData();
          }
          else {
               this.statusS = "Failed to Upload Existing Sessions";
          }
          
          this.detailsS=result._body;
          
      }
      
}
