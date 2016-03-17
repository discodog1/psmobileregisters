import {IonicApp, Page, NavController, NavParams} from 'ionic-angular'
import {OnInit} from 'angular2/core'


@Page({
  templateUrl: 'build/pages/logout/logout.html'
})

export class LogOutPage implements OnInit {
    
    ngOnInit() {
         if (localStorage.getItem('id_token')) {
          localStorage.removeItem('id_token')
      };
    }
    
  constructor() {}
}