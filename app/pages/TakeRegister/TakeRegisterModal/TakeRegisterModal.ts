import { Page, ViewController} from 'ionic-framework/ionic'

@Page({
  templateUrl: 'build/pages/TakeRegister/TakeRegisterModal/TakeRegisterModal.html'
})
export class TakeRegisterModal {
    viewCtrl: ViewController;
    
  constructor(viewCtrl: ViewController) {    
      this.viewCtrl = viewCtrl;
      
  }
  
  dismiss(choice) {  
        this.viewCtrl.dismiss(choice); 
 }
   
}