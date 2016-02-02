import {IonicApp, Page, NavController, NavParams,Storage, Modal} from 'ionic/ionic'
import {HomePage} from '../home/home'
import {JwtHelper,AuthHttp} from 'angular2-jwt/angular2-jwt'
import {Http, Headers} from 'angular2/http'
import {LoginModal} from './LoginModal/LoginModal'

@Page({
  selector: 'login',
  templateUrl: 'build/pages/login/login.html'
})

export class LoginPage {
  constructor( app: IonicApp, nav: NavController, navParams: NavParams,public http: Http) {
    this.nav = nav;
    this.app = app;
    this.serviceUrl = '';
    
    //check if first-run (there'll be no url to get data from)
    if (!localStorage.getItem('serviceUrl')) {
        this.showModal()
    }
     else {
         this.serviceUrl = localStorage.getItem('serviceUrl');
     }
    
    
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

  this.http.post(this.serviceUrl + 'login.ashx', creds, {
    headers: headers
    })
    .map(res => res.json())
    .subscribe(
      data => this.checkJwt(data),
      err => console.log(err)
    );
}
    
    
    showModal() {
    let modal = Modal.create(LoginModal);
    modal.onDismiss(data => {
     localStorage.setItem('serviceUrl',data);   //save for next time
     this.serviceUrl = localStorage.getItem('serviceUrl');
     
   });
    this.nav.present(modal)
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

