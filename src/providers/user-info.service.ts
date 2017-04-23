import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

export class UserInfo{
        name:string
    };
@Injectable()
export class UserInfoService{
    constructor(private storage:Storage){
        this.setUserInfo({name:'李四'});
    }
    
    setUserInfo(userInfo:UserInfo){
        userInfo = userInfo ||{'name':'张三'};
        this.storage.set('UserInfo',userInfo);
    }

    getUserInfo():Promise<UserInfo>{
        return this.storage.get('UserInfo');
    }
}