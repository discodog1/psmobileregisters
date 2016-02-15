import {IonicApp, Page, NavController, NavParams} from 'ionic-framework/ionic'
import {OnInit} from 'angular2/core'


@Page({
  templateUrl: 'build/pages/logout/logout.html'
})

export class LogOutPage implements OnInIt {
    
    ngOnInit() {
         if (localStorage.getItem('id_token')) {
          localStorage.removeItem('id_token')
      };
    }
    
  constructor() {}
}