import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { LoginComponentService } from "../login-component/login-component.service";
import * as AppComponent from "../app.constant";
import { Injectable } from "@angular/core";

@Injectable()
export class MigrateComponentService {
    constructor(private httpClient: HttpClient, private loginService: LoginComponentService) { }
    getHeader(type: string, param: string) {
        if (param !== undefined && param !== null) {
            return {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + this.loginService.getToken(type)
                }),           
                params: new HttpParams().set('pageToken', param)
            };
        }else{
            return {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + this.loginService.getToken(type)
                }),           
            };
        }
        
    }

    getAllAlbums(type: string, param: string) {
        return this.httpClient.get(AppComponent.googlePhotoApiURL + "albums", this.getHeader(type, param));
    }
}