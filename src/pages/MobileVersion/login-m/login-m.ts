import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { WaitingMPage } from '../waiting-m/waiting-m';
import { SignUpMPage } from '../sign-up-m/sign-up-m';

@IonicPage()
@Component({
  selector: 'page-login-m',
  templateUrl: 'login-m.html',
})
export class LoginMPage {

  // public recaptchaVerifierl:firebase.auth.RecaptchaVerifier;
  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  public alertCtrl:AlertController) {
  /*  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.navCtrl.setRoot(WaitingMPage);
      }else{
    }
    });
  */ }
/*
  ionViewDidLoad(){
    this.recaptchaVerifierl = new firebase.auth.RecaptchaVerifier('recaptcha-containerl');
  }

  checkData(phoneNumber){
  var numL =phoneNumber.toString().length;
  if(numL===10){
    this.signIn(phoneNumber);
  }else{
    this.pAlert("Phone Number Error","Try with a valid Phone Number");
  }
}

  

  signIn(phoneNumber: number){
    const appVerifier = this.recaptchaVerifierl;
    const phoneNumberString = "+91" + phoneNumber;
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then( confirmationResult => {
        console.log("SMS sent");

        let prompt = this.alertCtrl.create({
        title: 'Enter the Confirmation code',
        inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
        buttons: [
          { text: 'Cancel',
            handler: data => { console.log('Cancel clicked'); }
          },
          { text: 'Send',
            handler: data => {
              confirmationResult.confirm(data.confirmationCode)
              .then(()=>{
                this.navCtrl.setRoot(WaitingMPage);
              
              }).catch(function (error) {
                alert("Wrong Verification Code");
                this.navCtrl.setRoot(LoginMPage);
              });
            }
          }
        ]
      }) ;
      prompt.present();
    }).catch(function (error) {
      let alert = this.alertCtrl.create({
        title: "SMS not Sent",
        subTitle: error.message,
        buttons: ['Try Again']
      });
      alert.present();
  
    });



  }

  gtSignUP() {
    this.navCtrl.setRoot(SignUpMPage);
  }

  pAlert(title,subtitle) {
  }
*/}