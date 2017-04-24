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
    getCpts():CPT[]{
        
        return this.testItem.cptDescriptions;
    }
    private saveTestItem(){
        this.storage.set('TestItem',this.testItem);
    }
    
    public getItemDataByCpt(cptNum:number):ItemData[]{
        cptNum -=1;
        let itemDatas:ItemData[];
        itemDatas = [];
        let items:ItemData[] = this.testItem.itemsInCpts[cptNum];
        let itemscount = this.testItem.itemsInCpts[cptNum].length;
        for(let i = 0;i<itemscount;i++){
            itemDatas.push(items[i]);
        }
        return itemDatas;
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
    itemsInCpts:ItemData[][];
    cptDescriptions:CPT[];
}

export class CPT{
    cptNum:number;
    title:string;
    introduction:string;
}