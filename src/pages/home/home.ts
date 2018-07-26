import { Component,ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from 'firebase';
import { Slides } from 'ionic-angular';


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
  ) {
    this.getQuestions();
  }

  ionViewDidLoad(){
    this.slides.lockSwipes(true);
    document.getElementById("pBarId").style.width = '0';
  }

  getQuestions(){
    this.quesRef.once('value',itemSnapshot=>{
      this.questions = [];
      itemSnapshot.forEach(itemSnap=>{
        this.questions.push(itemSnap.val());
        this.allSlides = this.questions.length;
      })
    })
  }

  slideChanged() {
    this.curIndex = this.slides.getActiveIndex()+1;
    var wid = (+this.curIndex/+this.allSlides)*100;
    console.log(wid.toString());
    document.getElementById("pBarId").style.width = wid.toString()+"%" ;
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
