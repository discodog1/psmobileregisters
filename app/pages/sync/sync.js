/* global localStorage */
import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';
import {Http,HTTP_PROVIDERS, Headers} from 'angular2/http'
import {AuthHttp,tokenNotExpired} from 'angular2-jwt/angular2-jwt'
import {CanActivate} from 'angular2/router'
import {RegisterService} from '../../services/RegisterService'

@Page({
  templateUrl: 'build/pages/sync/sync.html',
  providers: [RegisterService]
})

@CanActivate(() => tokenNotExpired())

export class SyncPage {
    constructor(public regService: RegisterService,public http: Http, app: IonicApp, nav: NavController, navParams: NavParams) { 
    this.nav = nav;
    this.app = app;
    
    this.statusS="status";
    this.detailsS="details";
    
    this.service = regService;
    
     this.jwt = localStorage.getItem('id_token');
     
      this.authHeader = new Headers();
        if(this.jwt) {
            this.authHeader.append('Authorization', 'Bearer ' + this.jwt);      
        }
 };
 
    
    
      Sync() {
          var data = localStorage.getItem("MyRegistersToday");
          var urlS = 'http://localhost/PSMobileRegisters_Backend/HandleSessions.ashx';
     
          
          if (data.length > 2) {
              this.statusS="Processing";
              this.detailsS = "Posting to:" + urlS + "\n"
              this.http.post(urlS,data, {headers: this.authHeader})
              .subscribe(
                  res=>this.ParseSessionsResult(res) + "\n",
                  err=>this.detailsS=err + "\n"
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
          this.service.getRegisters().subscribe(res=> this.registers = res); //reloads cache
      }
}
