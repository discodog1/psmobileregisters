import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';
import {Http,HTTP_PROVIDERS} from 'angular2/http'

@Page({
  templateUrl: 'app/pages/sync/sync.html'
})

export class SyncPage {
    constructor(http: Http, app: IonicApp, nav: NavController, navParams: NavParams) { 
    this.nav = nav;
    this.app = app;
    this.http = http;
    
    this.statusS="status";
    this.detailsS="details";
    
    this.statusM="status";
    this.detailsM="details";
 };
 
    
    
      Sync() {
          var sessions = localStorage.getItem("sessions");
          var marks = localStorage.getItem("marks");
          var urlS = 'http://localhost/PSMobileRegisters_Backend/HandleSessions.ashx';
          var urlM = 'http://localhost/PSMobileRegisters_Backend/HandleMarks.ashx';
          
          if (sessions) {
              this.statusS="Processing";
              this.detailsS = "Posting to:" + urlS + "\n"
              this.http.post(urlS,sessions)
              .subscribe(
                  res=>this.ParseSessionsResult(res) + "\n",
                  err=>this.detailsS+=err + "\n"
                  );
              
          }
          else {
              this.statusS = "Done";
              this.detailsS = "No sessions to sync";
          }
          
          if (marks) {
              this.statusM="Processing";
              this.detailsM = "Posting to:" + urlM + "\n"
              this.http.post(urlM,marks)
              .subscribe(
                  res=>this.ParseMarksResult(res) + "\n",
                  err=>this.detailsM+=err + "\n"
                  );
              
          }
           else {
              this.statusM = "Done";
              this.detailsM = "No marks to sync";
          }
    
      }
      
      ParseSessionsResult(result) {
          
         var success=false;
          if (result.status="200" && result.statusText=="Ok") {
              success=true;
           
          }
           if (success) {
              this.statusS = "Success";
              this.ClearSessions()
          }
          else {
               this.statusS = "Failed to Upload";
          }
          
          this.detailsS+=result._body;
          
      }
      
      ParseMarksResult(result) {
          var success=false;
          if (result.status="200" && result.statusText=="Ok") {
              success=true;
          }
           if (success) {
               this.statusM = "Success";
              this.ClearMarks()
          }
          this.detailsM+=result._body;
      }
      
      ClearMarks() {
          localStorage.removeItem("marks");
      }
      
      ClearSessions() {
          localStorage.removeItem("sessions");
      }
}
