import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { LoginMPage } from '../login-m/login-m';
import { WaitingMPage } from '../waiting-m/waiting-m';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-sign-up-m',
  templateUrl: 'sign-up-m.html',
})
export class SignUpMPage {

  Name : string;
  Email : string;
  Phone : string;
  College : string;
  Branch : string;
  Plevel : string;
  news : boolean = true;
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;

  constructor(
  public navCtrl: NavController, 
  public loadingCtrl : LoadingController,
  public alertCtrl:AlertController) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.navCtrl.setRoot(WaitingMPage);
      }else{
    }
    });
  }

  ionViewDidEnter(){
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }


  checkData(phoneNumber){
    var phoneL = phoneNumber.toString().length;
    if(phoneL===10){
      
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.Email))
      {
        this.signUp(phoneNumber);
      }else{
        console.log("Invalid");
        this.presentAlert("Email Error","Try with a valid Email");
      }

    }else{
      this.presentAlert("Phone Number Error","Try with a valid Phone Number");
    }
  }


  signUp(phoneNumber: number){
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
                let loading = this.loadingCtrl.create({
                  content: 'Please wait...'
                  });
                  loading.present();
              
                firebase.database().ref("Users/").child(firebase.auth().currentUser.uid).set({
                  Name : this.Name,
                  Email : this.Email,
                  PhoneNo : phoneNumber,
                  College : this.College,
                  Branch : this.Branch,
                  Plevel : this.Plevel
                }).then(()=>{
                  this.navCtrl.setRoot(WaitingMPage);
                  loading.dismiss();
                });
              }).catch(function (error) {
                alert("Wrong Verification Code");
                this.navCtrl.setRoot(SignUpMPage);
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





  gtLogin() {
    this.navCtrl.setRoot(LoginMPage);
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
