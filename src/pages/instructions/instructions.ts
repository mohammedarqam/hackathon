import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { ResultsPage } from '../results/results';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';


@IonicPage()
@Component({
  selector: 'page-instructions',
  templateUrl: 'instructions.html',
})
export class InstructionsPage {

  userRef = firebase.database().ref("Users/");
  actBtn : boolean = false;


  constructor(
  public navCtrl: NavController, 
  public loadingCtrl : LoadingController,
  public navParams: NavParams) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      }else{
        this.navCtrl.setRoot(RegisterPage);
    }
    });
    this.getUser();
  }


  getUser(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.userRef.child(firebase.auth().currentUser.uid).once('value',itemSnap=>{
      if(itemSnap.val().Attempted){
        this.navCtrl.setRoot(ResultsPage);
      }else{
        this.navCtrl.setRoot(HomePage);
      }
    })
    loading.dismiss();
  }

}
