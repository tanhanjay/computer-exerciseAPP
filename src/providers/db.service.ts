import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DbService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DbService {

  constructor(public http: Http,public storage:Storage) {
    console.log('Hello DbService Provider');
  }
  getFromStorage(storageKey:string,onsuccess:(data)=>void,onfail:(data)=>void){
        this.storage.get(storageKey).then((value)=>{
            if(value){
                onsuccess(value);
            }else{
                onfail(value);
            }
        })
    }
    set(key:string,value:any){
      this.storage.set(key,value);
    }
    get(key:string):Promise<any>{
      return this.storage.get(key);
    }

}
