import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { WaitingPage } from '../waiting/waiting';
import { LoginPage } from '../login/login';



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
  news : boolean = true;
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;

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

  ionViewDidEnter(){
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }


  checkData(phoneNumber,email){
    var phoneL = phoneNumber.toString().length;
    if(phoneL===10){
      
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
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

 




  gtLogin() {
    this.navCtrl.setRoot(LoginPage);
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
