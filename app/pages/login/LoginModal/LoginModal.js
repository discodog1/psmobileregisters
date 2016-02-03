import { Page, Modal,ViewController} from 'ionic/ionic'
import {SystemSetting} from '../../../models/objects'
import {Http,HTTP_PROVIDERS,Headers} from 'angular2/http'

@Page({
  templateUrl: 'build/pages/login/LoginModal/LoginModal.html'
})
export class LoginModal {
  constructor(public http: Http,viewCtrl: ViewController) {
      console.log('Task Service created.', http);
      
      this.viewCtrl = viewCtrl;
      
      this.status='';
      this.confirmedUrl = '';
  }
  
   
  testConnection(event,field) {
      
      event.preventDefault();
       if (field.value) {
          this.tryConnect(field.value).subscribe(res=> this.success(res,field),err=> this.fail(err,field));            
      }            
    }
    
    tryConnect(url) {
           
        return this.http.get(url + 'GenerateDeviceID.ashx?Code=1234')
        .map((responseData) => {
            if (responseData) {
                localStorage.setItem('deviceID',responseData._body);
            }
            else {
                return false;
            }
         
        })
    }
    
    dismiss() {     
        this.viewCtrl.dismiss(this.confirmedUrl);
    }
    success(res,field) {
        
        this.status = '200';
        //this.response=res._body;
        this.confirmedUrl=field.value;
      
    }
    
    fail(err,field) {
        console.log('Failed',err)
        this.confirmedUrl='';
        this.status = '404';
        this.response= err._body;
    }
    
//     generateDeviceID() {
//         this.http.get(this.confirmedUrl + 'GenerateDeviceID.ashx?Code=1234')
//         .map((responseData) => {           
//                 localStorage.setItem('deviceID',responseData._body);
           
//     }).subscribe(res=> console.log(res),err=> console.log(err)); 
    
//   }
}