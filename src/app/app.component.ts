import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { RegisterPage } from '../pages/register/register';
import { MobileLimitPage } from '../pages/mobile-limit/mobile-limit';
import { ReRegisterPage } from '../pages/re-register/re-register';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar) {
    platform.ready().then(() => {
      
      statusBar.styleDefault();
    });
  }
}

