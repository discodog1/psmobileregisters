var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ionic_1 = require('ionic-angular');
var LogOutPage = (function () {
    function LogOutPage() {
    }
    LogOutPage.prototype.ngOnInit = function () {
        if (localStorage.getItem('id_token')) {
            localStorage.removeItem('id_token');
        }
        ;
    };
    LogOutPage = __decorate([
        ionic_1.Page({
            templateUrl: 'build/pages/logout/logout.html'
        }), 
        __metadata('design:paramtypes', [])
    ], LogOutPage);
    return LogOutPage;
})();
exports.LogOutPage = LogOutPage;
