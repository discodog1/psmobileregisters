import {Page} from 'ionic/ionic';
import {CanActivate} from 'angular2/router'
import {tokenNotExpired} from 'angular2-jwt/angular2-jwt';
import {SystemSetting} from '../../models/objects'
import {RegisterService} from '../../services/RegisterService'

@CanActivate(() => tokenNotExpired())
@Page({
  templateUrl: 'build/pages/preferences/preferences.html',
  providers: [RegisterService]
})
export class PreferencesPage {
    
    constructor(public regService: RegisterService) {
           
              
         if (localStorage.getItem("SystemSettings")) {
         this.systemsettings = JSON.parse(localStorage.getItem("SystemSettings"));
      }
      else {
          regService.getSystemSettings().subscribe(res=> this.systemsettings = res);        
      }            
    }
    
              
        changeColor(color) {
            localStorage.setItem('myBG',color);
        }
    
}
