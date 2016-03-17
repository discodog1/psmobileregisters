///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ionic_angular_1 = require('ionic-angular');
var home_1 = require('./pages/home/home');
var logout_1 = require('./pages/logout/logout');
var sync_1 = require('./pages/sync/sync');
var help_1 = require('./pages/help/help');
var preferences_1 = require('./pages/preferences/preferences');
var about_1 = require('./pages/about/about');
var RegisterService_1 = require('./services/RegisterService');
var login_1 = require('./pages/login/login');
var angular2_jwt_1 = require('angular2-jwt/angular2-jwt');
require('rxjs/Rx');
var MyApp = (function () {
    function MyApp(app, platform) {
        this.app = app;
        this.platform = platform;
        this.rootPage = home_1.HomePage;
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages =
            [
                { title: 'Home', component: home_1.HomePage, icon: 'home' },
                { title: 'Sync', component: sync_1.SyncPage, icon: 'sync' },
                { title: 'Preferences', component: preferences_1.PreferencesPage, icon: 'cog' },
                { title: 'Help', component: help_1.HelpPage, icon: 'help-buoy' },
                { title: 'About', component: about_1.AboutPage, icon: 'information-circle' },
                { title: 'Log Out', component: logout_1.LogOutPage, icon: 'log-out' }
            ];
        this.jwt = localStorage.getItem('id_token');
        //check credentials exist
        if (this.jwt) {
            //check credentials valid
            this.jwtHelper = new angular2_jwt_1.JwtHelper();
            if (this.jwtHelper.isTokenExpired(this.jwt)) {
                //cookie expired - login again
                this.rootPage = login_1.LoginPage;
            }
            else {
                //cookie fine
                this.rootPage = home_1.HomePage;
            }
        }
        else {
            this.rootPage = login_1.LoginPage;
        }
    }
    MyApp.prototype.initializeApp = function () {
        this.platform.ready().then(function () {
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
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        var nav = this.app.getComponent('nav');
        nav.setRoot(page.component);
    };
    MyApp = __decorate([
        ionic_angular_1.App({
            templateUrl: 'build/app.html',
            providers: [RegisterService_1.RegisterService],
            // Check out the config API docs for more info
            // http://ionicframework.com/docs/v2/api/config/Config/
            config: {}
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.IonicApp, ionic_angular_1.Platform])
    ], MyApp);
    return MyApp;
}());
