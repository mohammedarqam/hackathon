import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { RegisterPage } from '../register/register';
import { PaymentsPage } from '../payments/payments';

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {

  userRef = firebase.database().ref("Users/");
  Name : string;

  scoreRef = firebase.database().ref("Results").child(firebase.auth().currentUser.uid);
  score : number;
  status : string;

  constructor(
  public navCtrl: NavController, 
  public loadingCtrl : LoadingController,
  public navParams: NavParams) {

  }

  ionViewDidEnter() {
    this.getScore();
    this.getUser();
  }
  getScore(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.scoreRef.once('value',itemSnap=>{
      var score = itemSnap.val().Score;
      this.score = score;
      if(this.score>8){
        if(this.score>30){
          var x = 30 - this.score;
          x= x*-1;
          this.score = 20+ x; 
        }
        this.status = "Qualified"
      }else{
        this.status = "Disqualified"
      }
    })
    loading.dismiss();
  }
  gtPayments(){
    this.navCtrl.setRoot(PaymentsPage);
  }

  getUser(){
    this.userRef.child(firebase.auth().currentUser.uid).once('value',itemSnap=>{
        this.Name = itemSnap.val().Name;
    })
  }

  signOut(){
    firebase.auth().signOut().then(()=>{
      this.navCtrl.setRoot(RegisterPage);
    })
  }


}
