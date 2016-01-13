import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic'
import {HomePage} from '../home/home'
import {JwtHelper,AuthHttp} from 'angular2-jwt/angular2-jwt'
import {Http, Headers} from 'angular2/http'

@Page({
  selector: 'login',
  templateUrl: 'app/pages/login/login.html'
})

export class LoginPage {
  constructor( app: IonicApp, nav: NavController, navParams: NavParams,public http: Http) {
       this.nav = nav;
    this.app = app;
    
    // this.jwt = localStorage.getItem('id_token');
        
    //     //check credentials exist
    //     if (this.jwt) {
    //         //check credentials valid
    //         this.jwtHelper=  new JwtHelper();
           
    //         if (this.jwtHelper.isTokenExpired(this.jwt)) {
    //            alert('Session expired, please log in again')
    //         }
    //         else {
    //            this.nav.push(HomePage)
    //         }
             
    //     }
  }

  login(event, username, password) {
      
      //move these out and secure.
      var application = "http://psmobileregisters.com";
      var issuer = "compasscc";
      var symkey = "super duper secret with some more on top";
      
    event.preventDefault();
    
    var headers = new Headers();
    var creds = '{"username":"' + username + '","password":"' + password + '","application":"' + application + '","issuer":"' + issuer + '","symkey":"' + symkey + '"}';
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

  this.http.post('http://localhost/psmobileregisters_backend/login.ashx', creds, {
    headers: headers
    })
    .map(res => res.json())
    .subscribe(
      data => this.checkJwt(data),
      err => console.log(err)
    );
}
    
    
    checkJwt(response) {
        if(response.error) {
           console.log(response.error);
           alert(response.error);
        }
        else {
             localStorage.setItem('id_token', response.id_token);
             this.nav.push(HomePage)
        }
    }
    

}
