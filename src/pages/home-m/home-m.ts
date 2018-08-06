import { Component,ViewChild } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { Slides } from 'ionic-angular';
import { ResultsMPage } from '../results-m/results-m';
import { SignUpMPage } from '../MobileVersion/sign-up-m/sign-up-m';


@Component({
  selector: 'page-home-m',
  templateUrl: 'home-m.html',
})
export class HomeMPage {
  @ViewChild(Slides) slides: Slides;

  quesRef = firebase.database().ref("Questions/");
  questions : Array<any> = [];
  curIndex : number = 1;
  allSlides : number ;
  ans : string;
  anser : string;
  keya : string;

  evryQuesRef = firebase.database().ref("EveryQuestion");
  ansRef = firebase.database().ref("Results");
  userRef = firebase.database().ref("Users/");

  constructor(
  public navCtrl: NavController,
  public loadingCtrl : LoadingController,
  ) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      }else{
        this.navCtrl.setRoot(SignUpMPage);
    }
    });
    this.getUser();
    this.getQuestions();
  }
  getUser(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.userRef.child(firebase.auth().currentUser.uid).once('value',itemSnap=>{
      if(itemSnap.val().Attempted){
        this.navCtrl.setRoot(ResultsMPage);
      }else{
        this.navCtrl.setRoot(HomeMPage);
      }
    })
    loading.dismiss();
  }

  ionViewDidLoad(){
    this.slides.lockSwipes(true);
    document.getElementById("pBarId").style.width = '0';
  }

  getAns(){
    var slidee = this.slides.getActiveIndex();
    this.keya =  this.questions[slidee].key;
    this.anser = this.questions[slidee].Answer;
  }

  getQuestions(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.quesRef.once('value',itemSnapshot=>{
      this.questions = [];
      itemSnapshot.forEach(itemSnap=>{
        var temp = itemSnap.val();
        temp.key = itemSnap.key;
        this.questions.push(temp);
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
    this.getAns();
  }


  signOut(){
    firebase.auth().signOut().then(()=>{
      this.navCtrl.setRoot(SignUpMPage);
    })
  }



  sendAns(){
    if(this.ans ===this.anser){
      this.evryQuesRef.child(this.keya).child(firebase.auth().currentUser.uid).transaction(function(cCata){
        var temp = "Correct";
        return temp;
      })


      this.ansRef.child(firebase.auth().currentUser.uid).child("Score").transaction(function(currentData){
        if(currentData==null){
          return 1;
        }else{
          var temp = parseFloat(currentData);
          return temp+1;
        }
      });
    }else{
      this.evryQuesRef.child(this.keya).child(firebase.auth().currentUser.uid).transaction(function(cCata){
        var temp = "Incorrect";
        return temp;
      })
      this.ansRef.child(firebase.auth().currentUser.uid).child("Score").transaction(function(currentData){
        if(currentData==null){
          return 0;
        }else{
          var temp = parseFloat(currentData);
          return temp;
        }
      });

    }
    this.slideNext();
  }

  slideNext() {
    this.slides.lockSwipes(false);
    this.slides.slideNext(500);
    this.slides.lockSwipes(true);
    this.ans = '';
  }
  finish(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    firebase.database().ref("Users/").child(firebase.auth().currentUser.uid).once('value',itemSnap=>{
      var temp = itemSnap.val();
      temp.Attempted = true;
      firebase.database().ref("Users/").child(firebase.auth().currentUser.uid).set(temp);
      console.log(temp);
      
    }).then(()=>{
      this.navCtrl.setRoot(ResultsMPage);
      loading.dismiss();
    })
  }
}