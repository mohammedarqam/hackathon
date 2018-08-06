import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-payments',
  templateUrl: 'payments.html',
})
export class PaymentsPage {

  typ : string;

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams) {
  }

  paytmOn(){
    this.typ = "paytm";
  }

  tezOn(){
    this.typ = "tez";
  }

}
