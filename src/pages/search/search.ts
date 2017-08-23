import { Component , OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchmap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage implements OnInit {
  results;
  searchSubject = new Subject();

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public http: Http) {
  }


  findCharacter(name){
  	this.searchSubject.next(name);
  	
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  ngOnInit(){
  	this.apiObservable= this.searchSubject
  		.debounceTime(300)
  		.distinctUntilChanged()
  		.switchmap(name =>{this.searchService.createAPIObservable(name));
  		
  	})
  }

}
