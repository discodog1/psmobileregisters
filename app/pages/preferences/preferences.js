import {Page} from 'ionic/ionic';
import {CanActivate} from 'angular2/router'
import {tokenNotExpired} from 'angular2-jwt/angular2-jwt';

@CanActivate(() => tokenNotExpired())
@Page({
  templateUrl: 'build/pages/preferences/preferences.html'
})
export class PreferencesPage {}
