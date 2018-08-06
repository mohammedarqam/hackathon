import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { LoginMPage } from '../login-m/login-m';
import * as firebase from 'firebase';
import moment from 'moment';
import { HomeMPage } from '../../home-m/home-m';


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
  Year : string;
  news : boolean = true;
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;

  constructor(
  public navCtrl: NavController, 
  public loadingCtrl : LoadingController,
  public alertCtrl:AlertController) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.navCtrl.setRoot(HomeMPage);
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
          { text: 'Verify',
            handler: data => {
              confirmationResult.confirm(data.confirmationCode)
              .then(()=>{
                let loading = this.loadingCtrl.create({
                  content: 'Please wait...'
                  });
                  loading.present();
                  firebase.database().ref("Users/").child(firebase.auth().currentUser.uid).once('value',itemSnap=>{
                    var nums = itemSnap.numChildren();
                    if(nums){
                      this.presentAlert("User Exists","You are already Registered");
                      this.signOut();
                      loading.dismiss();
                    }else{
                firebase.database().ref("Users/").child(firebase.auth().currentUser.uid).set({
                  Name : this.Name,
                  Email : this.Email,
                  PhoneNo : phoneNumber,
                  College : this.College,
                  Branch : this.Branch,
                  Plevel : this.Plevel,
                  Year : this.Year,
                  Platform : 'Mobile',
                  TimeStamp : moment().format('MMMM Do YYYY, h:mm:ss a')
                }).then(()=>{
                  if(firebase.auth().currentUser){
                  this.navCtrl.setRoot(HomeMPage);
                  }
                  loading.dismiss();
                });
              }
            })
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

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  signOut(){
    firebase.auth().signOut().then(()=>{
      this.navCtrl.setRoot(LoginMPage);
    })
  }

}
