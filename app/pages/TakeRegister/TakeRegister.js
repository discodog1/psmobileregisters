/* global console */
import {IonicApp,Page, NavController,Modal, NavParams} from 'ionic/ionic'
import {Register,RegisterStudent,RegisterMark,RegisterSession,MarkType,DataSet,BrokenRules} from '../../models/objects'
import {RegisterService} from '../../services/RegisterService'
import {HomePage} from '../../pages/home/home'
import {SyncPage} from '../../pages/sync/sync'
import {CanActivate} from 'angular2/router'
import {tokenNotExpired} from 'angular2-jwt/angular2-jwt'
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
    this.app = app;
    this.nav = nav;
       
     //service will be used to retrieve register data
    this.service = regService;
    
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedRegister = navParams.get('register');
    this.selectedRegisterSession = navParams.get('session');  
    
    //failed validation rules
    this.rules = [];
    this.togValid = false;
    
   if (localStorage.getItem("MarkTypes")) {
         this.markTypes = JSON.parse(localStorage.getItem("MarkTypes"));
      }
      else {
   this.service.getMarks().subscribe(res => this.markTypes = res);
      }
      
  };
  
  save() {
      if (this.validatePage()) {
            if (this.service.save(this.selectedRegisterSession)) {
                this.showModal();   
                
        }
      }
      else {
          
      }
 
}


validatePage():boolean {
    this.rules=[];
    if (this.togValid) {
        return true;
    }
    else {       
        this.rules.push(new BrokenRules("Please mark all students"));
        this.rules.push(new BrokenRules("Cannot take registers in the future"));
        this.rules.push(new BrokenRules("Dave H smells"));
        return false;
    }
    
}

showModal() {
    let modal = Modal.create(TakeRegisterModal);
    modal.onDismiss(data => {
     if (data==1) {
             //go to sync page
         console.log('take another register',this.nav);
         let nav = this.app.getComponent('nav'); 
           nav.setRoot(SyncPage);
     }
     else {
         //return home
         console.log('return home page');
         let nav = this.app.getComponent('nav');
         nav.setRoot(HomePage);

     }
   });
    this.nav.present(modal);
  }
}