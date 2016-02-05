import { Page, ViewController} from 'ionic/ionic'

@Page({
  templateUrl: 'build/pages/TakeRegister/TakeRegisterModal/TakeRegisterModal.html'
})
export class TakeRegisterModal {
  constructor(viewCtrl: ViewController) {    
      this.viewCtrl = viewCtrl;
      
  }
  
  dismiss(choice) {  
        this.viewCtrl.dismiss(choice); 
 }
   
}