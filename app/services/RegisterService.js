/* global console,localStorage,JSON */
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
var http_1 = require('angular2/http');
var core_1 = require('angular2/core');
var objects_1 = require('../models/objects');
var RegisterService = (function () {
    function RegisterService(http) {
        this.http = http;
        this.jwt = localStorage.getItem('id_token');
        this.authHeader = new http_1.Headers();
        if (this.jwt) {
            this.authHeader.append('Authorization', 'Bearer ' + this.jwt);
        }
    }
    RegisterService.prototype.ngOnInit = function () {
    };
    RegisterService.prototype.getRegisters = function () {
        return this.http.get(localStorage.getItem('serviceUrl') + 'getregisterstoday.ashx?DeviceID=' + localStorage.getItem('deviceID'), { headers: this.authHeader })
            .map(function (responseData) {
            return responseData.json();
        })
            .map(function (registers) {
            var result = [];
            if (registers) {
                registers.forEach(function (reg) {
                    result.push(new objects_1.Register(reg.mRegisterID, reg.registerID, reg.registerNo, reg.title));
                });
            }
            localStorage.setItem("Registers", JSON.stringify(result));
            localStorage.setItem("MyRegistersToday", JSON.stringify(registers));
            return result;
        });
    };
    RegisterService.prototype.getMarks = function () {
        return this.http.get(localStorage.getItem('serviceUrl') + 'GetMarkTypes.ashx', { headers: this.authHeader })
            .map(function (responseData) {
            localStorage.setItem("MarkTypes", JSON.stringify(responseData.json()));
            return responseData.json();
        });
    };
    RegisterService.prototype.loadSessions = function (reg) {
        var data = JSON.parse(localStorage.getItem("MyRegistersToday"));
        var result = jLinq.from(data)
            .starts('registerID', reg.registerID)
            .first();
        return result;
    };
    RegisterService.prototype.loadDataSet = function (sess) {
        var ds = new objects_1.DataSet(null, null, null);
        var data = JSON.parse(localStorage.getItem("MyRegistersToday"));
        ds.register = jLinq.from(data)
            .starts('mRegisterID', sess.mRegisterID)
            .first();
        ds.session = jLinq.from(ds.register.sessions)
            .starts('mRegisterSessionID', sess.mRegisterSessionID)
            .first();
        //ds.register.sessions[0];
        ds.marks = ds.session.marks;
        return ds;
    };
    ;
    RegisterService.prototype.save = function (sess) {
        var result = [];
        //get original data
        result = JSON.parse(localStorage.getItem("MyRegistersToday"));
        sess.registerTaken = true;
        if (result) {
            for (var i = 0; i < result.length; i++) {
                if (result[i].mRegisterID === sess.mRegisterID) {
                    for (var x = 0; x < result[i].sessions.length; x++) {
                        if (result[i].sessions[x].mRegisterSessionID === sess.mRegisterSessionID) {
                            result[i].sessions[x] = sess;
                            break;
                        }
                    }
                }
            }
        }
        ;
        //store changes                
        localStorage.setItem("MyRegistersToday", JSON.stringify(result));
        return true;
    };
    RegisterService.prototype.getSystemSettings = function () {
        return this.http.get(localStorage.getItem('serviceUrl') + 'GetSystemSettings.ashx', { headers: this.authHeader })
            .map(function (responseData) {
            localStorage.setItem("SystemSettings", JSON.stringify(responseData.json()));
            return responseData.json();
        });
    };
    RegisterService.prototype.Sync = function () {
        var data = localStorage.getItem("MyRegistersToday");
        if (!data) {
            data = [];
        }
        if (data.length > 2) {
            return this.http.post(localStorage.getItem('serviceUrl') + 'HandleSessions.ashx?DeviceID=' + localStorage.getItem('deviceID'), data, { headers: this.authHeader });
        }
    };
    RegisterService.prototype.getRegisterStats = function () {
        this.taken = 0;
        this.today = 0;
        this.missed = 0;
        var result = [];
        //get original data
        result = JSON.parse(localStorage.getItem("MyRegistersToday"));
        if (result) {
            for (var i = 0; i < result.length; i++) {
                var result2 = [];
                result2 = result[i].sessions;
                if (result2) {
                    for (var i2 = 0; i2 < result2.length; i2++) {
                        if (result[i].sessions[i2].registerTaken) {
                            this.taken++;
                        }
                        else {
                            //console.log('date: ' + result[i].sessions[i2].date + ', start: ' + result[i].sessions[i2].startTime)
                            var t = new Date(result[i].sessions[i2].endTime);
                            var str = result[i].sessions[i2].date;
                            var parts = str.split("/");
                            var d = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
                            var dt = d.setHours(t.getHours());
                            //console.log(dt);
                            var now = new Date();
                            if (dt < now.getUTCDate()) {
                                this.missed++;
                            }
                            var g = new Date(dt).setHours(0, 0, 0, 0);
                            var nowN = now.setHours(0, 0, 0, 0);
                            if (g == nowN) {
                                this.today++;
                            }
                        }
                    }
                }
            }
        }
        ;
    };
    RegisterService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], RegisterService);
    return RegisterService;
}());
exports.RegisterService = RegisterService;
