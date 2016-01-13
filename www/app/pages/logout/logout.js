import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';


@Page({
  templateUrl: 'app/pages/logout/logout.html'
})
export class LogOutPage {
  constructor() {
      if (localStorage.getItem('id_token')) {
          localStorage.removeItem('id_token')
      };
      
  }
}