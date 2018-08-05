import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { SignUpMPage } from '../sign-up-m/sign-up-m';
import { ReRegisterMPage } from '../re-register-m/re-register-m';
import { LoginMPage } from '../login-m/login-m';



@IonicPage()
@Component({
  selector: 'page-waiting-m',
  templateUrl: 'waiting-m.html',
})
export class WaitingMPage {

  userRef = firebase.database().ref("Users/");
  Name : string;

  constructor(
  public navCtrl: NavController, 
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
    this.userRef.child(firebase.auth().currentUser.uid).once('value',itemSnap=>{
      var nums = itemSnap.numChildren();
      if(nums){
        this.Name = itemSnap.val().Name;
      }else{
        this.navCtrl.setRoot(ReRegisterMPage);
      }
    })
  }


  ionViewDidEnter() {
var countDownDate = new Date("Aug 5, 2018 14:00:00").getTime();
var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("demo").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
    }
}, 1000);

  }
  signOut(){
    firebase.auth().signOut().then(()=>{
      this.navCtrl.setRoot(LoginMPage);
    })
  }

}
