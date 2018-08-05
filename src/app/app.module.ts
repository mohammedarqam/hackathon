import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import * as firebase from 'firebase';
import { RegisterPage } from '../pages/register/register';
import { InstructionsPage } from '../pages/instructions/instructions';
import { ResultsPage } from '../pages/results/results';
import { ReviewPage } from '../pages/review/review';
import { WaitingPage } from '../pages/waiting/waiting';
import { LoginPage } from '../pages/login/login';
import { ReRegisterPage } from '../pages/re-register/re-register';
import { LoginMPage } from '../pages/MobileVersion/login-m/login-m';
import { SignUpMPage } from '../pages/MobileVersion/sign-up-m/sign-up-m';
import { ReRegisterMPage } from '../pages/MobileVersion/re-register-m/re-register-m';
import { WaitingMPage } from '../pages/MobileVersion/waiting-m/waiting-m';
import { PaymentsPage } from '../pages/payments/payments';
import { InstructionsMPage } from '../pages/instructions-m/instructions-m';
import { ResultsMPage } from '../pages/results-m/results-m';
import { PaymentsMPage } from '../pages/payments-m/payments-m';

firebase.initializeApp({
  apiKey: "AIzaSyC-MuPFFSmsEX8WiR5PiNLea1UUuFEtyY4",
  authDomain: "hacathon-969fe.firebaseapp.com",
  databaseURL: "https://hacathon-969fe.firebaseio.com",
  projectId: "hacathon-969fe",
  storageBucket: "hacathon-969fe.appspot.com",
  messagingSenderId: "870783797722"
});


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    InstructionsPage,
    ResultsPage,
    ReviewPage,
    WaitingPage,
    LoginPage,
    ReRegisterPage,
    LoginMPage,
    SignUpMPage,
    ReRegisterMPage,
    WaitingMPage,
    PaymentsPage,
    InstructionsMPage,
    ResultsMPage,
    PaymentsMPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    InstructionsPage,
    ResultsPage,
    ReviewPage,
    WaitingPage,
    LoginPage,
    ReRegisterPage,
    LoginMPage,
    SignUpMPage,
    ReRegisterMPage,
    WaitingMPage,
    PaymentsPage,
    InstructionsMPage,
    ResultsMPage,
    PaymentsMPage
  ],
  providers: [
    StatusBar,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
