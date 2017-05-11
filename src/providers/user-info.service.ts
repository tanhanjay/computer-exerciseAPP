import { DbService } from './db.service';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { ItemData } from "./item-data.service";
function getDayString(): string {
    let date = new Date();
    return date.getFullYear() + "年" + date.getMonth() + "月" + date.getDate() + "日";
}
@Injectable()
export class UserInfoService {
    userInfo: UserInfo;
    userExeciseInfo: {
        resultSet: {};
        collectItems: {};
    }
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
            this.dbService.getFromStorage('UserExerciseInfos', (userExerciseInfos) => {
                this.userExeciseInfo = userExerciseInfos[this.userInfo.username];
            }, (userExerciseInfos) => {
                this.userExeciseInfo = {
                    collectItems: {},
                    resultSet: {}
                }
            });
        }, (userInfo) => {
            this.isLogin = false;
            this.userInfo = null;
            this.userExeciseInfo = {
                resultSet: {},
                collectItems: {}
            }
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

    checkIn() {
        if (!this.userInfo.today.todayCheckIn) {
            this.userInfo.today.todayCheckIn = true;
            this.userInfo.totalCheckIn.push(new Date());
        }
        this.updateAndSave();
    }

    //统计用户做题情况

    addRight() {
        if (this.isLogin) {
            this.userInfo.today.rcache++;
        }
    }
    addWrong() {
        if (this.isLogin) {
            this.userInfo.today.wcache++;
        }
    }

    //计算比率，返回百分比的数字部分
    private getRate(one, two): number {
        if (two + one)
            return Math.round(one * 100 / (one + two));
        else
            return 0;
    }

    isInCollect(itemId: string): boolean {
        return this.userExeciseInfo.collectItems[itemId] ? true : false;
    }
    addToCollect(item: ItemData): string {
        let msg: string;
        if (this.userExeciseInfo.collectItems[item.itemID]) {
            msg = "本题已存在于收藏中";
        } else {
            this.userExeciseInfo.collectItems[item.itemID] = item;
            msg = "成功地加入我的收藏";
        }
        return msg;
    }
    getCollect(): ItemData[] {
        let items = [];
        for (let key in this.userExeciseInfo.collectItems) {
            items.push(this.userExeciseInfo.collectItems[key]);
        }
        return items;
    }
    deleteCollectItemById(ItemId: string): string {
        let msg: string;
        if (this.userExeciseInfo.collectItems[ItemId]) {
            delete this.userExeciseInfo.collectItems[ItemId];
        }
        else {
            msg = "出错";
        }
        return msg;
    }
    saveUserExerciseInfo() {
        if (!this.isLogin)
            return;
        this.dbService.getFromStorage('UserExerciseInfos', (userExerciseInfos) => {
            userExerciseInfos[this.userInfo.username] = this.userExeciseInfo;
            this.dbService.set('UserExerciseInfos', userExerciseInfos);
        }, (userExerciseInfos) => {
            userExerciseInfos = {};
            userExerciseInfos[this.userInfo.username] = this.userExeciseInfo;
            this.dbService.set('UserExerciseInfos', userExerciseInfos);
        });
    }
    getResultById(idstr: string): string {
        return this.userExeciseInfo.resultSet[idstr];
    }
    setResultById(idstr: string, result: string) {
        this.userExeciseInfo.resultSet[idstr] = result;
    }

    //计算统计的数据，并保存到本地
    updateAndSave() {
        if (!this.isLogin)
            return;
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


    //用户登录注册相关方法

    signIn(username: string, password: string, callback: () => void): string {
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
            msg = "注册成功";
            this.dbService.set('LogInfos', this.loginfos);
            this.logIn(username, password, callback);
        }
        return msg;
    }

    logIn(username: string, password: string, callback: () => void): string {
        let msg = "";
        if (this.loginfos[username]) {
            if (this.loginfos[username] === password) {
                msg = "登录成功";
                this.isLogin = true;
                this.dbService.getFromStorage('Users', (users) => {
                    if (users[username]) {
                        this.userInfo = users[username];
                        if (this.userInfo.today.daystring !== getDayString()) {
                            this.userInfo.today.daystring = getDayString();
                            this.userInfo.today.todayCheckIn = false;
                            this.userInfo.today.rightItemCount = 0;
                            this.userInfo.today.wrongItemCount = 0;
                        }
                    } else {
                        this.userInfo = new UserInfo(username);
                    }
                    this.updateAndSave();
                    callback();
                }, (users) => {
                    this.userInfo = new UserInfo(username);
                    this.updateAndSave();
                    callback();
                });
                this.dbService.getFromStorage('UserExerciseInfos', (userExerciseInfos) => {
                    if (userExerciseInfos[username]) {
                        this.userExeciseInfo = userExerciseInfos[username];
                    } else {
                        this.userExeciseInfo = {
                            resultSet: {},
                            collectItems: {}
                        };
                    }
                }, (UserExerciseInfos) => {
                    this.userExeciseInfo = {
                        resultSet: {},
                        collectItems: {}
                    };
                });

            } else {
                msg = "密码错误";
            }
        } else {
            msg = "无此用户";
        }
        return msg;
    }
    logOut(callback: () => void) {
        this.isLogin = false;
        this.dbService.getFromStorage("Users", (users) => {
            users[this.userInfo.username] = this.userInfo;
            this.dbService.set('Users', users);
            this.dbService.set('UserInfo', false);
            this.userInfo = null;
            this.userExeciseInfo = {
                resultSet: {},
                collectItems: {}
            }
            callback();
        }, (users) => {
            users = {};
            users[this.userInfo.username] = this.userInfo;
            this.dbService.set('Users', users);
        })

    }
}


//原始用户信息类
export class UserInfo {
    username: string;
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
