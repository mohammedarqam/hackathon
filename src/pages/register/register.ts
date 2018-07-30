import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { HomePage } from '../home/home';
import { WaitingPage } from '../waiting/waiting';



@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {


  Name : string;
  Email : string;
  Phone : string;
  College : string;
  Branch : string;
  Plevel : string;
  signInT : boolean = false;

  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  public recaptchaVerifierl:firebase.auth.RecaptchaVerifier;

  constructor(
  public navCtrl: NavController, 
  public loadingCtrl : LoadingController,
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
    this.recaptchaVerifierl = new firebase.auth.RecaptchaVerifier('recaptcha-containerl');
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
                  this.navCtrl.setRoot(WaitingPage);
                  loading.dismiss();
                });
              }).catch(function (error) {
                alert("Wrong Verification Code");
                this.navCtrl.setRoot(RegisterPage);
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

  signIn(phoneNumberl: number){
    const appVerifier = this.recaptchaVerifierl;
    const phoneNumberString = "+91" + phoneNumberl;
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
                this.navCtrl.setRoot(RegisterPage);
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





  slidePrev() {
    this.signInT = false;
  }

  slideNext() {
    this.signInT = true;
  }

}
