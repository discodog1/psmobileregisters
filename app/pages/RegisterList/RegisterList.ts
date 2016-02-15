import {IonicApp, Page, NavController, NavParams} from 'ionic-framework/ionic'
import {Component,OnInit} from 'angular2/core';

import {RegisterSessionList} from '../RegisterSessionList/RegisterSessionList'
import {RegisterService} from '../../services/RegisterService'
import {Register} from '../../models/objects'

import {tokenNotExpired} from 'angular2-jwt/angular2-jwt';



@Page({
   selector: 'register-list', 
   templateUrl:'build/pages/RegisterList/RegisterList.html'
   })
   
export class RegisterList implements OnInit {
  nav: NavController;
  isBusy:boolean;
  statusS:string;
  detailsS:any;
  registers: Register[];

  ngOnInit() {
      
      //populate registers variable with data loaded from service
      if (localStorage.getItem("Registers")) {
         this.registers = JSON.parse(localStorage.getItem("Registers"));
      }
      else {        
          this.isBusy=true
          this.statusS="Fetching Data...";
          this._regService.getRegisters().subscribe(res=> this.gotRegisters(res),err=> this.failedGet(err));
      }
  }
  
  
	constructor( private _regService: RegisterService,  nav: NavController) { 
    this.nav = nav;
    this.isBusy = false;
    this.statusS="Idle";
    this.detailsS="";
      
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
                this._regService.Sync().subscribe(
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
            this._regService.getRegisters().subscribe(res=> this.gotRegisters(res),err=> this.failedGet(err) );
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
