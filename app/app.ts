import {App, IonicApp, Platform, Config} from 'ionic-framework/ionic';
import {HomePage} from './pages/home/home'
import {LogOutPage} from './pages/logout/logout'
import {SyncPage} from './pages/sync/sync'
import {HelpPage} from './pages/help/help'
import {PreferencesPage} from './pages/preferences/preferences'
import {AboutPage} from './pages/about/about'
import {RegisterService} from './services/RegisterService'
import {LoginPage} from './pages/login/login'
import {JwtHelper} from 'angular2-jwt/angular2-jwt'
import {Type} from 'angular2/core';
import 'rxjs/Rx'
@App({
  templateUrl: 'build/app.html',
  providers: [RegisterService],
  // Check out the config API docs for more info
  // http://ionicframework.com/docs/v2/api/config/Config/
  config: {}
})
class MyApp {
  rootPage: Type = HomePage;
  pages: Array<{title: string, component: Type,icon:string}>
  jwt: string;
  jwtHelper: JwtHelper;
  
  constructor(private app: IonicApp, private platform: Platform) {
    
    this.initializeApp();
    
    
    
    // used for an example of ngFor and navigation
     this.pages = 
         [

          { title: 'Home',  component:HomePage,  icon: 'home'},
          { title: 'Sync', component:SyncPage, icon: 'sync'},
          { title: 'Preferences', component: PreferencesPage, icon: 'cog'},
          { title: 'Help', component: HelpPage, icon: 'help-buoy'},
          { title: 'About', component: AboutPage, icon: 'information-circle'},
          { title: 'Log Out', component: LogOutPage, icon: 'log-out'}
        ];
        
                 
        this.jwt = localStorage.getItem('id_token');
        
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
      
      
       //////////////////////////////////////////////////////////////////
       //push notification start
    //    Ionic.io();
    //     ionicPush = new Ionic.Push().init({
    //         debug: true,
    //         onNotification: (data) => {
    //             console.log('New push notification received');
    //             console.log(data);
    //         }
    //     });

    //     ionicPush.register(data => {
    //         console.log("Device token:", data.token);
    //     });
        //push notification end
        //////////////////////////////////////////////////////////////////
    
    
        //////////////////////////////////////////////////////////////////
        //NFC start
        //NFC end
        //////////////////////////////////////////////////////////////////
    
        //////////////////////////////////////////////////////////////////
        //BT start
        //BT end
        //////////////////////////////////////////////////////////////////
     

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
