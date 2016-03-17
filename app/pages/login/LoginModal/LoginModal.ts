import { Page, ViewController} from 'ionic-angular'
import {SystemSetting} from '../../../models/objects'
import {Http,HTTP_PROVIDERS,Headers} from 'angular2/http'

@Page({
  templateUrl: 'build/pages/login/LoginModal/LoginModal.html'
})
export class LoginModal {
    viewCtrl: ViewController;
    status:string;
    confirmedUrl: string;
    response: string;
    
  constructor(private http: Http,viewCtrl: ViewController) {
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
        this.confirmedUrl=field.value;
      
    }
    
    fail(err,field) {
        console.log('Failed',err)
        this.confirmedUrl='';
        this.status = '404';
        this.response= err._body;
    }

}