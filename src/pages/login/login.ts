import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { WaitingPage } from '../waiting/waiting';
import { RegisterPage } from '../register/register';





@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  public alertCtrl:AlertController) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.navCtrl.setRoot(WaitingPage);
      }else{
    }
    });
  }

  ionViewDidLoad(){
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }

  checkData(phoneNumber){
  var numL =phoneNumber.toString().length;
  if(numL===10){
    this.signIn(phoneNumber);
  }else{
    this.presentAlert("Phone Number Error","Try with a valid Phone Number");
  }
}

  

  signIn(phoneNumber: number){
    const appVerifier = this.recaptchaVerifier;
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
                this.navCtrl.setRoot(WaitingPage);
              
              }).catch(function (error) {
                alert("Wrong Verification Code");
                this.navCtrl.setRoot(LoginPage);
              });
            }
          }
        ]
      }) ;
      prompt.present();
    }).catch(function (error) {
      console.error("SMS not sent", error);
    });



  }

  gtSignUP() {
    this.navCtrl.setRoot(RegisterPage);
  }

  presentAlert(title,subtitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['Try Again']
    });
    alert.present();
  }
  
}
