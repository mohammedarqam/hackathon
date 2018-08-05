import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import * as firebase from 'firebase';
import { LoginPage } from '../login/login';
import { ReRegisterPage } from '../re-register/re-register';

@IonicPage()
@Component({
  selector: 'page-waiting',
  templateUrl: 'waiting.html',
})
export class WaitingPage {
  
  userRef = firebase.database().ref("Users/");
  Name : string;

  constructor(
  public navCtrl: NavController, 
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
    this.userRef.child(firebase.auth().currentUser.uid).once('value',itemSnap=>{
      var nums = itemSnap.numChildren();
      if(nums){
        this.Name = itemSnap.val().Name;
      }else{
        this.navCtrl.setRoot(ReRegisterPage);
      }
    })
  }


  ionViewDidEnter() {
var countDownDate = new Date("Aug 5, 2018 12:00:00").getTime();
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
      this.navCtrl.setRoot(LoginPage);
    })
  }

}
