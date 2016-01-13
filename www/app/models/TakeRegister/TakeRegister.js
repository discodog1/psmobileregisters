/* global console */
import {IonicApp,Page, NavController, NavParams} from 'ionic/ionic';
import {Register,RegisterStudent,RegisterMark,RegisterSession,MarkType,DataSet} from '../objects';
import {RegisterService} from '../../services/RegisterService'
import {HomePage} from '../../pages/home/home';
import {CanActivate} from 'angular2/router'
import {tokenNotExpired} from 'angular2-jwt/angular2-jwt';

@CanActivate(() => tokenNotExpired())

@Page({
   selector: 'take-register', 
   templateUrl:'app/models/TakeRegister/TakeRegister.html',
   providers: [RegisterService],
   bindings: [RegisterService]
   })
   
export class TakeRegister {

	constructor(public regService: RegisterService,app: IonicApp, nav: NavController, navParams: NavParams) { 
   
    this.nav = nav;
       
     //service will be used to retrieve register data
    this.service = regService;
    
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedRegister = navParams.get('register');
    this.selectedRegisterSession = navParams.get('session');  
    

   if (localStorage.getItem("MarkTypes")) {
         this.markTypes = JSON.parse(localStorage.getItem("MarkTypes"));
      }
      else {
   this.service.getMarks().subscribe(res => this.markTypes = res);
      }
      
  };
  
  save() {
    if (this.service.save(this.selectedRegisterSession)) {
        //ideally this shouldn't go on the stack, as the back button is enabled.
        //need to work out how to go direct to home and clear nav stack
        this.nav.push(HomePage);
  }
 
}

}