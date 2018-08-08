import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { SignUpMPage } from '../MobileVersion/sign-up-m/sign-up-m';
import { HomeMPage } from '../home-m/home-m';
import { ResultsMPage } from '../results-m/results-m';

@IonicPage()
@Component({
  selector: 'page-instructions-m',
  templateUrl: 'instructions-m.html',
})
export class InstructionsMPage {


  userRef = firebase.database().ref("Users/");
  actBtn : boolean = false;


  constructor(
  public navCtrl: NavController, 
  public loadingCtrl : LoadingController,
  public navParams: NavParams) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      }else{
        this.navCtrl.setRoot(SignUpMPage);
    }
    });
    this.getUser();
  }


  getUser(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.userRef.child(firebase.auth().currentUser.uid).child("Attempted").once('value',itemSnap=>{
      if(itemSnap.exists()){
        this.navCtrl.setRoot(ResultsMPage)
      }else{
        this.navCtrl.setRoot(HomeMPage);
      }
    })
    loading.dismiss();
  }

}
