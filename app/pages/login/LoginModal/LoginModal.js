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
           
        return this.http.get(url + 'GetSystemSettings.ashx')
        .map((responseData) => {
            if (responseData.status == '200') {
                return responseData;
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
        
        this.status = res.status;
        this.response=res._body;
        this.confirmedUrl=field.value;
    }
    
    fail(err,field) {
        console.log('Failed',err)
        this.confirmedUrl='';
        this.status = err.status;
        this.response= err._body;
    }
    
  }
