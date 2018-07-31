import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { LoginMPage } from '../pages/MobileVersion/login-m/login-m';
import { RegisterPage } from '../pages/register/register';
import { HomePage } from '../pages/home/home';
import { SignUpMPage } from '../pages/MobileVersion/sign-up-m/sign-up-m';
import { WaitingMPage } from '../pages/MobileVersion/waiting-m/waiting-m';
import { ReRegisterMPage } from '../pages/MobileVersion/re-register-m/re-register-m';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform,  public plt : Platform,statusBar: StatusBar) {
    platform.ready().then(() => {
      if(this.plt.is("core")){
        this.rootPage = HomePage;
      }else{
        this.rootPage = ReRegisterMPage;
      }

      statusBar.styleDefault();
    });
  }
}

