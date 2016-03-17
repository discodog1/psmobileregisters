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
var TakeRegister_1 = require('../TakeRegister/TakeRegister');
var RegisterService_1 = require('../../services/RegisterService');
var RegisterSessionList = (function () {
    function RegisterSessionList(regService, app, nav, navParams) {
        this.regService = regService;
        this.nav = nav;
        this.regParam = navParams.get('data');
    }
    RegisterSessionList.prototype.ngOnInit = function () {
        this.register = this.regService.loadSessions(this.regParam);
    };
    ;
    RegisterSessionList.prototype.selectSession = function (event, session) {
        var filtered = jLinq.from(this.register.sessions)
            .starts('mRegisterSessionID', session.mRegisterSessionID)
            .first();
        this.nav.push(TakeRegister_1.TakeRegister, { register: this.register, session: filtered });
    };
    RegisterSessionList = __decorate([
        ionic_angular_1.Page({
            selector: 'register-session-list',
            templateUrl: 'build/pages/RegisterSessionList/RegisterSessionList.html'
        }), 
        __metadata('design:paramtypes', [RegisterService_1.RegisterService, ionic_angular_1.IonicApp, ionic_angular_1.NavController, ionic_angular_1.NavParams])
    ], RegisterSessionList);
    return RegisterSessionList;
}());
exports.RegisterSessionList = RegisterSessionList;
