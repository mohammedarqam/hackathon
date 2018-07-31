import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MobileLimitPage } from './mobile-limit';

@NgModule({
  declarations: [
    MobileLimitPage,
  ],
  imports: [
    IonicPageModule.forChild(MobileLimitPage),
  ],
})
export class MobileLimitPageModule {}
