import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginMPage } from './login-m';

@NgModule({
  declarations: [
    LoginMPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginMPage),
  ],
})
export class LoginMPageModule {}
