import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import * as firebase from'firebase';
import { WaitingPage } from '../waiting/waiting';

@IonicPage()
@Component({
  selector: 'page-re-register',
  templateUrl: 're-register.html',
})
export class ReRegisterPage {

  Name : string;
  Email : string;
  College : string;
  Branch : string;
  Plevel : string;
  news : boolean = true;


  constructor(
  public navCtrl: NavController, 
  public alertCtrl:AlertController,
  public loadingCtrl : LoadingController,
  public navParams: NavParams) {
  }




  checkData(){
      
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.Email))
      {
        this.sendData();
      }else{
        let alert = this.alertCtrl.create({
          title: "Email Error",
          subTitle: "Try with a valid Email",
          buttons: ['Try Again']
        });
        alert.present();
          }
  }

  sendData(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
      });
      loading.present();
  
    firebase.database().ref("Users/").child(firebase.auth().currentUser.uid).set({
      Name : this.Name,
      Email : this.Email,
      College : this.College,
      Branch : this.Branch,
      PhoneNo : firebase.auth().currentUser.phoneNumber,
      Plevel : this.Plevel
    }).then(()=>{
      this.navCtrl.setRoot(WaitingPage);
      loading.dismiss();
    });

  }



}
