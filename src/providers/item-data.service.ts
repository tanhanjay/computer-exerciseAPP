import { UserInfoService } from './user-info.service';
import { DbService } from './db.service';
import { Storage } from '@ionic/storage';
import { ToastController } from "ionic-angular";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class ItemDataService {
    testItem: TestItem;
    
    constructor(public storage: Storage, public http: Http, public toastCtrl: ToastController,private dbService:DbService,private userInfoService:UserInfoService) {
        // this.storage.get('TestItem').then(testItem => {
        //     if (testItem) {
        //         this.testItem = testItem;
        //     } else {
        //         this.updateTestItem();
        //     }
        // });

        // this.storage.get('ResultSet').then(resultSet =>{
        //     if(resultSet){
        //         this.resultSet = resultSet;
        //     }else{
        //         this.resultSet = {};
        //     }
        // });
        this.dbService.getFromStorage('TestItem',(data)=>{this.testItem=data;},(data)=>{
            this.updateTestItem();
        })
    }
    


  
    getCpts(): CPT[] {

        return this.testItem.cptDescriptions;
    }
    saveTestItem() {
        this.storage.set('TestItem', this.testItem);
    }
    public getItemDataByCpt(cptNum: number): ItemData[] {
        cptNum -= 1;
        let itemDatas: ItemData[];
        itemDatas = this.testItem.itemsInCpts[cptNum];
        return itemDatas;
    }

    //更新试题库
    updateTestItem() {
        this.http.get("assets/items/items.json").toPromise().then((response) => {
            this.testItem = response.json();
            this.saveTestItem();
            this.toastCtrl.create({
                message: '试题库载入成功',
                duration: 3000
            }).present();
        });
    }
    // 生成一组综合练习习题 selectNum:每章抽取试题的数目
    geneCombTestGroup(selectNum: number): ItemData[] {
        let combTestGroup: ItemData[] = [];
        let l = this.testItem.cptDescriptions.length;
        let itemsInCPts = this.testItem.itemsInCpts
        for (let i = 0; i < l; i++) {
            let selectIndexs = this.getMFromNNoRepeat(selectNum, itemsInCPts[i].length);
            for (let j = 0; j < selectNum; j++) {
                combTestGroup.push(itemsInCPts[i][selectIndexs[j]]);
            }
        }
        return combTestGroup;
    }

    //洗牌算法
    private getMFromNNoRepeat(m: number, n: number): number[] {
        let selects: number[] = [];
        let all: number[] = [];
        for (let i = 0; i < n; i++) {
            all[i] = i;
        }
        for (let i = 0; i < m; i++) {
            let num = Math.floor(Math.random() * n);
            let tmp = all[i]
            all[i] = all[num];
            all[num] = tmp;
        }
        selects = all.slice(0, 3);
        return selects;
    }

}


//试题对象
export class ItemData {
    itemID: string;
    itemContent: string;
    itemOptions: string[];
    itemAnswer: string;
    answerAnalysis: string;
    relevantContent: string;
}

//试题库对象类
export class TestItem {
    itemsInCpts: ItemData[][];
    cptDescriptions: CPT[];
}

// 章节对象
export class CPT {
    cptNum: number;
    title: string;
    introduction: string;
}

//综合练习题组对象

export class CombTestGroup {
    items: ItemData[];
    createDate: Date;
}