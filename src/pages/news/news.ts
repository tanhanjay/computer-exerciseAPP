import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
// import {  ThemeableBrowser, ThemeableBrowserOptions } from '@ionic-native/themeable-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser';
// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
//导入一些我们需要用到的操作符

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {

  pageContent: string = 'keji';
  homeArticles = [];
  hostURL = 'http://v.juhe.cn/toutiao/index';
  // APPKEY:string = 'ea03b219db7187cdb850589fea5e9751';
  APPKEY: string = '17702324002789c3101fab2a1cc280b7';

  public picture: string;
  public loading;
  constructor(private navCtrl: NavController, private http: Http, private loadCtrl: LoadingController,
    private iab: InAppBrowser, private alertCtrl: AlertController) {

    this.loading = this.loadCtrl.create({
      content: '加载中...',

    });

    this.loading.present();

    this.getHttpService('keji');
  }


  getHttpService(itemName) {
    this.homeArticles = [];
    let url = this.hostURL + "?type=" + itemName + "&key=" + this.APPKEY;
    this.http.get(url).map(res => res.json()).subscribe(data => {
      for (var i = 0; i < data.result.data.length; i++) {
        this.homeArticles.push({
          title: data.result.data[i].title,//标题
          picture1: data.result.data[i].thumbnail_pic_s,//图片1
          // picture2:data.result.data[i].text_ithumbnail_pic_s02mage1,//图片2
          // picture3: data.result.data[i].thumbnail_pic_s03,//图片3
          author_name: data.result.data[i].author_name,
          date: data.result.data[i].date,
          url: data.result.data[i].url,
        });

      }
      this.loading.dismiss();
    }, error => {
      this.loading.dismiss();
      this.alertCtrl.create({
        message: "网络请求失败，请确认已连接网络",
        buttons: [
          '确定'
        ]
      }).present();
    });

  }

  doRefresh(refresher) {

    setTimeout(() => {
      this.getHttpService(this.pageContent);
      refresher.complete();
    }, 1000);

  }

  showArticle(event, url) {

    this.iab.create(url, '_blank', { location: 'no' });
  }
}
