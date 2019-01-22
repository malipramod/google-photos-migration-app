import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginComponentService } from "../login-component/login-component.service";
import * as AppComponent from "../app.constant";
import { Injectable } from "@angular/core";

@Injectable()
export class MigrateComponentService {
    constructor(private httpClient:HttpClient,private loginService:LoginComponentService){}
    getHeader(type:string){
        return{
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': "Bearer "+this.loginService.getToken(type)
            })
          };
    }
    getAllAlbums(type: string) {
        return this.httpClient.get(AppComponent.googlePhotoApiURL + "albums", this.getHeader(type));
    }
}