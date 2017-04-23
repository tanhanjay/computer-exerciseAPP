import { Storage } from '@ionic/storage';
import { ToastController } from "ionic-angular";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class ItemDataService{
    
    constructor(public storage:Storage,public http:Http,public toastCtrl:ToastController){
        this.storage.get('TestItem').then(testItem=>{this.testItem=testItem});
    }

    testItem:TestItem;  
    getCptLength():number{
        
        return this.testItem.cptLength;
    }
    private saveTestItem(){
        this.storage.set('TestItem',this.testItem);
    }
    
    public getItemDataByCpt(cptNum:number):ItemData[]{
        let itemDatas:ItemData[];
        itemDatas = [];
        
        let items:ItemData[] = this.testItem.items;
        let start = this.calPosOfCpt(cptNum);
        let end = start+this.testItem.lengthOfEachCpt[cptNum]
        for(let i = start;i++;i<end){
            itemDatas.push(items[i]);
        }
        return itemDatas;
    }
    //计算起始指定章节第一道题目的开始位置
    calPosOfCpt(cptNum:number):number{
        let count:number = 0;
        let lengths:number[] = this.testItem.lengthOfEachCpt;
        for(let i=0;i<cptNum-1;i++){
            count += lengths[i]
        }
        return count;
    }
    updateTestItem(){
        this.http.get("assets/items/items.json").toPromise().then((response )=>{
            this.testItem = response.json();
            this.saveTestItem();
            this.toastCtrl.create({
              message: '试题库载入成功',
              duration: 3000
            }).present();
          });
    }
}

export class ItemData{
    itemID:number;
    itemContent:string;
    itemQuestion:string[];
    itemAnswer:string;
    answerAnalysis:string;
    relevantContent:string;
    
}

//试题库对象类
export class TestItem{
    items:ItemData[];
    cptLength:number;
    lengthOfEachCpt:number[];
}