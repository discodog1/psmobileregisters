/* global console */
import {App, IonicApp, Platform} from 'ionic/ionic'
import {HomePage} from './pages/home/home'
import {LogOutPage} from './pages/logout/logout'
import {SyncPage} from './pages/sync/sync'
import {HelpPage} from './pages/help/help'
import {PreferencesPage} from './pages/preferences/preferences'
import {AboutPage} from './pages/about/about'
import {RegisterService} from './services/RegisterService'
import {LoginPage} from './pages/login/login'
import {JwtHelper,AuthHttp} from 'angular2-jwt/angular2-jwt'

import {Component, View, bootstrap, provide} from 'angular2/angular2';
import {HTTP_PROVIDERS, Http} from 'angular2/http';

@App({
    templateUrl: 'app/app.html',
    providers: [RegisterService]
})
class MyApp {
    constructor(app: IonicApp, platform: Platform) {
        this.app = app;
        this.platform = platform;
        
        this.initializeApp();
        
            
  
        // menu items
        this.pages = [

          { title: 'Home', component: HomePage, icon: 'ion-ios-home'},
          { title: 'Sync', component:SyncPage, icon: 'ion-android-sync'},
          { title: 'Preferences', component: PreferencesPage, icon: 'ion-ios-gear'},
          { title: 'Help', component: HelpPage, icon: 'ion-help-buoy'},
          { title: 'About', component: AboutPage, icon: 'ion-information-circled'},
          { title: 'Log Out', component: LogOutPage, icon: 'ion-log-out'}
        ];
        
        
        this.jwt = localStorage.getItem('jwt');
        
        //check credentials exist
        if (this.jwt) {
            //check credentials valid
            this.jwtHelper=  new JwtHelper();
           
            if (this.jwtHelper.isTokenExpired(this.jwt)) {
                //cookie expired - login again
                this.rootPage = LoginPage;
            }
            else {
                //cookie fine
                this.rootPage = HomePage;
            }
             
        }
        //no login cookie
        else {
            this.rootPage = LoginPage;
        }
        
    }
  initializeApp() {
    this.platform.ready().then(() => {
      console.log('Platform ready');

      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      // Keyboard.setAccessoryBarVisible(false);
      //
      // For example, we might change the StatusBar color. This one below is
      // good for dark backgrounds and light text:
      // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
  
  
}

bootstrap(App, [
  HTTP_PROVIDERS,
  provide(AuthHttp, { useFactory: () => {
    return new AuthHttp({})
  }})
])