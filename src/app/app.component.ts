import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { WaitingMPage } from '../pages/MobileVersion/waiting-m/waiting-m';
import { InstructionsMPage } from '../pages/instructions-m/instructions-m';
import { RegisterPage } from '../pages/register/register';
import { ResultsMPage } from '../pages/results-m/results-m';
import { PaymentsMPage } from '../pages/payments-m/payments-m';
import { HomeMPage } from '../pages/home-m/home-m';

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
        this.rootPage = HomeMPage;
      }

      statusBar.styleDefault();
    });
  }
}

