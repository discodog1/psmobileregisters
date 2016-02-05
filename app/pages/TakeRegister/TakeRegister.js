/* global console */
import {IonicApp,Page, NavController,Modal, NavParams} from 'ionic/ionic';
import {Register,RegisterStudent,RegisterMark,RegisterSession,MarkType,DataSet} from '../../models/objects';
import {RegisterService} from '../../services/RegisterService'
import {HomePage} from '../../pages/home/home';
import {CanActivate} from 'angular2/router'
import {tokenNotExpired} from 'angular2-jwt/angular2-jwt';
import {ngModel,ngIf,ngFor} from 'angular2/common'
import {TakeRegisterModal} from './TakeRegisterModal/TakeRegisterModal'
@CanActivate(() => tokenNotExpired())

@Page({
   selector: 'take-register', 
   templateUrl:'build/pages/TakeRegister/TakeRegister.html',
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
        this.showModal();     
  }
 
}

showModal() {
    let modal = Modal.create(TakeRegisterModal);
    modal.onDismiss(data => {
     if (data==1) {
         //return to schedules list
         console.log('take another register',this.nav);
         this.nav.pop();
         
     }
     else {
         //return home
         console.log('return home page');
         this.nav.push(HomePage);
     }
   });
    this.nav.present(modal);
  }
}