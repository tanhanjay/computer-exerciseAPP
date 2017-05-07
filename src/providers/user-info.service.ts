import { DbService } from './db.service';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
//原始用户信息类
export class UserInfo {
    username: string;
    password: string;
    moto: string;
    picURI: string;
    today: {
        daystring: string;        //签到日期
        rightItemCount: number;   //今日做对的题 
        wrongItemCount: number;   //今日做错的题
        todayCheckIn: boolean;    //今日是否已经签到
        rate: number;
        rcache: number;
        wcache: number;
    }
    rightItemCount: number;
    wrongItemCount: number;
    rate: number;
    totalCheckIn: Date[];
    checkInCounts: number;

    constructor(username: string) {
        this.username = username;
        this.moto = "座右铭";
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
    isLogin: boolean;
    loginfos: {};
    constructor(public storage: Storage, private dbService: DbService) {
        dbService.getFromStorage('UserInfo', (userInfo) => {
            this.isLogin = true;
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
        }, (userInfo) => {
            this.isLogin = false;
            this.userInfo = new UserInfo("本地帐户");
        });
        this.dbService.getFromStorage('LogInfos', (logInfos) => {
            this.loginfos = logInfos;
        }, (logInfo) => {
            this.loginfos = {};
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
        if (two + one)
            return Math.round(one * 100 / (one + two));
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

    getUserInfo(userinfo: UserInfo) {
        userinfo = this.userInfo;
    }

    signIn(username: string, password: string,callback:()=>void): string {
        let msg = "";
        if (username.length < 3) {
            return "用户名不能少于3个字符";
        }
        if (password.length < 6) {
            return "密码不能少于6个字符";
        }
        if (this.loginfos[username]) {
            msg = "该用户名已被注册";
        } else {
            this.loginfos[username] = password;
            this.isLogin = true;
            msg = "注册成功";
            this.userInfo = new UserInfo(username);
            this.updateAndSave();
            this.dbService.set('LogInfos', this.loginfos);
            callback();
        }
        return msg;
    }

    logIn(username: string, password: string,callback:()=>void): string {
        let msg = "";
        if (this.loginfos[username]) {
            if (this.loginfos[username] === password) {
                msg = "登录成功";
                this.isLogin = true;
                this.dbService.getFromStorage('Users', (users) => {
                    this.userInfo = users[username];
                    this.updateAndSave();
                    callback();
                }, (users) => {
                    this.userInfo = new UserInfo(username);
                    this.updateAndSave();                    
                    callback();                    
                })
                
            } else {
                msg = "密码错误";
            }
        } else {
            msg = "无此用户";
        }
        return msg;
    }
    logOut(callback:()=>void) {
        this.isLogin = false;
        this.dbService.getFromStorage("Users", (users) => {
            users[this.userInfo.username] = this.userInfo;
            this.dbService.set('Users', users);
        }, (users) => {
            users = {};
            users[this.userInfo.username] = this.userInfo;
            this.dbService.set('Users', users);
        })
        this.dbService.set('UserInfo', false);
        callback();
    }
}