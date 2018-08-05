import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentsMPage } from './payments-m';

@NgModule({
  declarations: [
    PaymentsMPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentsMPage),
  ],
})
export class PaymentsMPageModule {}
