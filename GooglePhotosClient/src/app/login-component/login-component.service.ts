declare const gapi: any;
import { ElementRef, Injectable } from '@angular/core';
import * as AppConstant from '../app.constant';

@Injectable()
export class LoginComponentService {
    public auth2: any;

    isLoggedInSource: boolean;
    isLoggedInDest: boolean;

    googleInit(type: string, element: ElementRef) {
        let that = this;
        gapi.load('auth2', function () {
            that.auth2 = gapi.auth2.init({
                client_id: AppConstant.clientId,
                cookiepolicy: 'single_host_origin',
                scope: AppConstant.scope
            });
            that.googleSignin(element.nativeElement.firstChild, type);
        });
    }

    googleSignin(element: any, type: string) {
        this.auth2.attachClickHandler(element, {},
            function (googleUser: any) {
                let profile = googleUser.getBasicProfile();
                if (type === "src") {
                    localStorage.setItem("GoogleTokenSrc", googleUser.getAuthResponse().id_token);
                    localStorage.setItem("GoogleIdSrc", profile.getId());
                    localStorage.setItem("GoogleToeknExpiresSrc", (new Date(googleUser.getAuthResponse().expires_at)).toString());
                    localStorage.setItem("isLoggedInSource", "true");          
                } else if (type === "dest") {
                    localStorage.setItem("GoogleTokenDest", googleUser.getAuthResponse().id_token);
                    localStorage.setItem("GoogleIdDest", profile.getId());
                    localStorage.setItem("GoogleToeknExpiresDest", (new Date(googleUser.getAuthResponse().expires_at)).toString());
                    localStorage.setItem("isLoggedInDest", "true");                      
                }                
            }, function (error: any) {
                console.log(JSON.stringify(error, undefined, 2));
            });
    }

    checkLogIn():boolean {
        return (JSON.parse(localStorage.getItem("isLoggedInSource")) && JSON.parse(localStorage.getItem("isLoggedInDest"))) ? true : false;
    }
}