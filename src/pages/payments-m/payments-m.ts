import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-payments-m',
  templateUrl: 'payments-m.html',
})
export class PaymentsMPage {

  typ : string ;

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
