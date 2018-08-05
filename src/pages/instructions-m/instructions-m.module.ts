import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstructionsMPage } from './instructions-m';

@NgModule({
  declarations: [
    InstructionsMPage,
  ],
  imports: [
    IonicPageModule.forChild(InstructionsMPage),
  ],
})
export class InstructionsMPageModule {}
