import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { WaitingMPage } from '../pages/MobileVersion/waiting-m/waiting-m';
import { InstructionsPage } from '../pages/instructions/instructions';
import { HomePage } from '../pages/home/home';
import { PaymentsPage } from '../pages/payments/payments';
import { WaitingPage } from '../pages/waiting/waiting';
import { ReRegisterPage } from '../pages/re-register/re-register';
import { RegisterPage } from '../pages/register/register';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform,  public plt : Platform,statusBar: StatusBar) {
    platform.ready().then(() => {
      if(this.plt.is("core")){
        this.rootPage = RegisterPage;
      }else{
        this.rootPage = WaitingMPage;
      }

      statusBar.styleDefault();
    });
  }
}

