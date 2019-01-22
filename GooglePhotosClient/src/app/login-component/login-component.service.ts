declare const gapi: any;
import { ElementRef, Injectable } from '@angular/core';
import * as AppConstant from '../app.constant';

@Injectable()
export class LoginComponentService {
    public auth2: any;

    isLoggedInSource: boolean;
    isLoggedInDest: boolean;

    googleInit(element: ElementRef, type: string) {
        return new Promise((resolve, reject) => {
            let that = this;
            gapi.load('auth2', function () {
                that.auth2 = gapi.auth2.init({
                    client_id: AppConstant.clientId,
                    cookiepolicy: 'single_host_origin',
                    scope: AppConstant.scope
                });
                that.googleSignin(element.nativeElement.firstChild, type).then(
                    (val) => resolve(val),
                    (err) => reject(err)
                );
            })

        });
    }

    googleSignin(element: any, type: string) {
        return new Promise((resolve, reject) => {
            this.auth2.attachClickHandler(element, {},
                function (googleUser: any) {
                    let profile = googleUser.getBasicProfile();
                    if (type === "src") {
                        localStorage.setItem("GoogleTokenSrc", googleUser.getAuthResponse().access_token);
                        localStorage.setItem("GoogleIdSrc", profile.getId());
                        localStorage.setItem("GoogleToeknExpiresSrc", (new Date(googleUser.getAuthResponse().expires_at)).toString());
                        localStorage.setItem("loggedInEmailSrc", profile.U3);
                        localStorage.setItem("loggedInImageSrc", profile.Paa);
                        localStorage.setItem("isLoggedInSrc", "true");
                        resolve(localStorage.getItem("isLoggedInSrc"));
                    } else if (type === "dest") {
                        localStorage.setItem("GoogleTokenDest", googleUser.getAuthResponse().access_token);
                        localStorage.setItem("GoogleIdDest", profile.getId());
                        localStorage.setItem("GoogleToeknExpiresDest", (new Date(googleUser.getAuthResponse().expires_at)).toString());
                        localStorage.setItem("loggedInEmailDest", profile.U3);
                        localStorage.setItem("loggedInImageDest", profile.Paa);
                        localStorage.setItem("isLoggedInDest", "true");
                        resolve(localStorage.getItem("isLoggedInDest"));
                    }
                }, function (error: any) {
                    console.log(JSON.stringify(error, undefined, 2));
                    reject(JSON.stringify(error, undefined, 2));
                });
        });

    }

    getToken(type:string){
        return type === 'src' ? localStorage.getItem("GoogleTokenSrc") : type === 'dest' ? localStorage.getItem("GoogleTokenDest") : "";
    }
    checkLogIn(): boolean {
        return (JSON.parse(localStorage.getItem("isLoggedInSrc")) && JSON.parse(localStorage.getItem("isLoggedInDest"))) ? true : false;
    }
}