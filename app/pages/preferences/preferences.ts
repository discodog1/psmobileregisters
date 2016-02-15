import {Page} from 'ionic-framework/ionic';

import {tokenNotExpired} from 'angular2-jwt/angular2-jwt';
import {SystemSetting} from '../../models/objects'
import {RegisterService} from '../../services/RegisterService'
import {OnInit} from 'angular2/core'



@Page({
  templateUrl: 'build/pages/preferences/preferences.html'
  //,providers: [RegisterService]
})
export class PreferencesPage implements OnInit {
    systemsettings: string;
    
    
    ngOnInit() {
        
        if (localStorage.getItem("SystemSettings")) {
         this.systemsettings = JSON.parse(localStorage.getItem("SystemSettings"));
      }
      else {
          this.regService.getSystemSettings().subscribe(res=> this.systemsettings = res);        
      }        
    }
    
    constructor(private regService: RegisterService) {}
    
              
        changeColor(color) {
            localStorage.setItem('myBG',color);
        }
    
}
