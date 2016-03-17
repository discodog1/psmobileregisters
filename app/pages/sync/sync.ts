/* global localStorage */
import {IonicApp, Page, NavController, NavParams} from 'ionic-angular';
import {AuthHttp,tokenNotExpired} from 'angular2-jwt/angular2-jwt'

import {RegisterService} from '../../services/RegisterService'
import {LoginPage} from '../../pages/login/login'
import {Register} from '../../models/objects'
import {OnInit} from 'angular2/core'

@Page({
  templateUrl: 'build/pages/sync/sync.html'
})



export class SyncPage implements OnInit {
    nav:NavController;
    app:IonicApp;
    statusS:string;
    detailsS:any;
    registers:Register[];
    
    
    ngOnInit() {
        //routing to login not working (02/02/16)
        if(!tokenNotExpired()) {
         this.nav.push(LoginPage);
    };
    }
    
    constructor(private regService: RegisterService, app: IonicApp, nav: NavController, navParams: NavParams) { 
    this.nav = nav;
    this.app = app;
    this.statusS="status";
    this.detailsS="details";
 };
       
      Sync() {
          var data = localStorage.getItem("MyRegistersToday");
        
         //probably won't happen but cropped up when manually messing with localStorage
         if (!data) {
             data=[];
         }
             
          if (data.length > 2) {
              this.statusS="Processing";
              this.detailsS = "Posting to server"
              
              this.regService.Sync()            
              .subscribe(
                  res=>this.ParseSessionsResult(res),
                  err=>this.detailsS=err 
                  );
              
          }
          else {
              this.statusS = "Done";
              this.detailsS = "No sessions to sync";
          }
          
      
      }
      
      ParseSessionsResult(result) {
          
         var success=false;
          if (result._body == "Session(s) Uploaded") {
              success=true;
           
          }
           if (success) {
              this.statusS = "Success";
              this.ClearSessions()
          }
          else {
               this.statusS = "Failed to Upload";
          }
          
          this.detailsS=result._body;
          
      }
        
      ClearSessions() {
         
          localStorage.removeItem("Registers"); 
          localStorage.removeItem("MyRegistersToday"); 
          this.regService.getRegisters().subscribe(res=> this.GetUpdatedList(res)); //reloads cache
      }
      
      GetUpdatedList(res) {
          this.registers = res;
          this.detailsS="Retrieved Updated List";
      }
}
