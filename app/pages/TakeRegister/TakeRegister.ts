/* global console */
import {IonicApp,Page, NavController,Modal, NavParams,RadioButton} from 'ionic-framework/ionic'
import {Register,RegisterStudent,RegisterMark,RegisterSession,MarkType,DataSet,BrokenRules} from '../../models/objects'
import {RegisterService} from '../../services/RegisterService'
import {HomePage} from '../../pages/home/home'
import {SyncPage} from '../../pages/sync/sync'

import {tokenNotExpired} from 'angular2-jwt/angular2-jwt'
import {NgModel,NgIf,NgFor} from 'angular2/common'
import {TakeRegisterModal} from './TakeRegisterModal/TakeRegisterModal'
import {OnInit} from 'angular2/core'



@Page({
   selector: 'take-register', 
   templateUrl:'build/pages/TakeRegister/TakeRegister.html'
   })
   
export class TakeRegister implements OnInit {
app:IonicApp;
nav:NavController;
selectedRegisterSession:RegisterSession;
selectedRegisterMark:RegisterMark;
rules:BrokenRules[];
togValid:boolean;
markTypes:MarkType[];
currentIndex:number;
existingmark:number;
selectedRegisterMarkAsString:string;
selectedRegister: Register;
ngOnInit() {
    
    if (localStorage.getItem("MarkTypes")) {
        this.setupMarkTypes(JSON.parse(localStorage.getItem("MarkTypes")));
      }
      else {
    this.regService.getMarks().subscribe(res => this.setupMarkTypes(res));
      }

    
}


	constructor(private regService: RegisterService,app: IonicApp, nav: NavController, navParams: NavParams) { 
    this.app = app;
    this.nav = nav;
    this.selectedRegister = navParams.get('register'); 
    this.selectedRegisterSession = navParams.get('session');    
  
    //failed validation rules
    this.rules = [];
    this.togValid = false;
      
  };
  
  
  setupMarkTypes(res) {
      this.markTypes = res;
      
      if (this.selectedRegisterSession) {
        this.currentIndex=0;
        this.selectedRegisterMark = this.selectedRegisterSession.marks[this.currentIndex];
        this.selectedRegisterMarkAsString = String(this.selectedRegisterMark.markTypeID);
    }
  }
  
  save() {
      if (this.validatePage()) {
            if (this.regService.save(this.selectedRegisterSession)) {
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
  
  updateMark(event,mark:MarkType,slides) {
   event.preventDefault();
   
   this.selectedRegisterSession.marks[this.currentIndex].markTypeID = Number(mark.markTypeID); //set mark to selected mark

  slides.next(); //go to next student, raises onSlideChanged
}

onSlideChanged(slides) {
    //use selectedRegisterMark to track current mark type ID to highlight
    this.currentIndex = slides.activeIndex;
    this.selectedRegisterMark = this.selectedRegisterSession.marks[this.currentIndex];
    this.selectedRegisterMarkAsString = String(this.selectedRegisterMark.markTypeID);
}


}

