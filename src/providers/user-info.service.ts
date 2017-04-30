import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
//原始用户信息类
export class UserInfo {
    name: string;
    moto: string;
    picURI:string;
    today: {
        daystring: string;
        rightItemCount: number;
        wrongItemCount: number;
        todayCheckIn: boolean;
        rate: number;
        rcache: number;
        wcache: number;
    }
    rightItemCount: number;
    wrongItemCount: number;
    rate: number;
    totalCheckIn: Date[];
    checkInCounts: number;

    constructor() {
        this.name = "请输入用户";
        this.moto = "请输入座右铭";
        this.picURI = "assets/img/user.gif";
        this.today = {
            daystring: getDayString(),
            wcache: 0,
            rcache: 0,
            rightItemCount: 0,
            wrongItemCount: 0,
            todayCheckIn: false,
            rate: 0,
        };
        this.rightItemCount = 0;
        this.wrongItemCount = 0;
        this.rate = 0;
        this.totalCheckIn = [];
        this.checkInCounts = 0;
    }
};

function getDayString(): string {
    let date = new Date();
    return date.getFullYear() + "年" + date.getMonth() + "月" + date.getDate() + "日";
}
@Injectable()
export class UserInfoService {
    userInfo: UserInfo;
    constructor(private storage: Storage) {
       this.storage.get('UserInfo').then((userInfo) => {
            if (userInfo) {
                if (userInfo.today.daystring === getDayString()) {
                    this.userInfo = userInfo;
                }
                else {
                    this.userInfo = userInfo;
                    this.userInfo.today.daystring = getDayString();
                    this.userInfo.today.todayCheckIn = false;
                    this.userInfo.today.rightItemCount = 0;
                    this.userInfo.today.wrongItemCount = 0;
                }
            } else {
                this.userInfo = new UserInfo();
            }
            this.updateAndSave();
        });   
    }

    clearS() {
        this.storage.clear();
    }
    saveUserInfo() {
        this.storage.set('UserInfo', this.userInfo);
    }

    // getUserInfo(): UserInfo {
             
    // }

    checkIn() {
        if (!this.userInfo.today.todayCheckIn) {
            this.userInfo.today.todayCheckIn = true;
            this.userInfo.totalCheckIn.push(new Date());
        }
        this.updateAndSave();
    }

    addRight() {
        this.userInfo.today.rcache++;
    }
    addWrong() {
        this.userInfo.today.wcache++;
    }

    //计算比率，返回百分比的数字部分
    getRate(one, two): number {
        if(two+one)
        return Math.round(one* 100 / (one + two) );
        else
        return 0;
    }

    updateAndSave() {
        this.userInfo.checkInCounts = this.userInfo.totalCheckIn.length;
        
        let rcache = this.userInfo.today.rcache;
        let wcache = this.userInfo.today.wcache;
        this.userInfo.rightItemCount += rcache;
        this.userInfo.wrongItemCount += wcache;
        this.userInfo.today.rightItemCount += rcache;
        this.userInfo.today.wrongItemCount += wcache;
        this.userInfo.today.rcache = 0;
        this.userInfo.today.wcache = 0;
        this.userInfo.today.rate = this.getRate(this.userInfo.today.rightItemCount, this.userInfo.today.wrongItemCount);
        this.userInfo.rate = this.getRate(this.userInfo.rightItemCount, this.userInfo.wrongItemCount);        
        this.saveUserInfo();
    }

    getUserInfo(userinfo:UserInfo){
        userinfo = this.userInfo;
    }

}