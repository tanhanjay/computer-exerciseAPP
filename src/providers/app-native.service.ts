import { Injectable } from "@angular/core";
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
@Injectable()
export class APPNativeService {
    enterOptions: NativeTransitionOptions;
    public hasUsed: boolean;
    
    constructor(public storage: Storage, private nativePageTransitions: NativePageTransitions) {
        this.enterOptions = {
            direction: 'up',
            duration: 300,
            slowdownfactor: 3,
            slidePixels: 40,
            iosdelay: 100,
            androiddelay: 70,
            fixedPixelsTop: 0,
            fixedPixelsBottom: 0
        };
    }

    pushPage(navCtrl: NavController, page: any, data?: any) {
        if (!data)
            data = {};
        this.nativePageTransitions.slide(this.enterOptions);

        navCtrl.push(page, data, { animate: false })
    }
}