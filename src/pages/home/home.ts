import { Component,ViewChild } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { Slides } from 'ionic-angular';
import { RegisterPage } from '../register/register';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;

  quesRef = firebase.database().ref("Questions/");
  questions : Array<any> = [];
  curIndex : number = 1;
  allSlides : number ;

  constructor(
  public navCtrl: NavController,
  public loadingCtrl : LoadingController,
  ) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      }else{
        this.navCtrl.setRoot(RegisterPage);
    }
    });
    this.getQuestions();
  }

  ionViewDidLoad(){
    this.slides.lockSwipes(true);
    document.getElementById("pBarId").style.width = '0';
  }

  getQuestions(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.quesRef.once('value',itemSnapshot=>{
      this.questions = [];
      itemSnapshot.forEach(itemSnap=>{
        this.questions.push(itemSnap.val());
        this.allSlides = this.questions.length;
      })
    }).then(()=>{
      this.slideChanged();
      loading.dismiss();
    })
  }

  slideChanged() {
    this.curIndex = this.slides.getActiveIndex()+1;
    var wid = (+this.curIndex/+this.allSlides)*100;
    var bar = document.getElementById("pBarId");
    bar.style.width = wid.toString()+"%" ;
    bar.style.transition = "width 0.5s ease";
  }


  signOut(){
    firebase.auth().signOut().then(()=>{
      this.navCtrl.setRoot(RegisterPage);
    })
  }


  slidePrev() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev(500);
    this.slides.lockSwipes(true);
  }

  slideNext() {
    this.slides.lockSwipes(false);
    this.slides.slideNext(500);
    this.slides.lockSwipes(true);
  }

}
