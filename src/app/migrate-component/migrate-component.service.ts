import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { LoginComponentService } from "../login-component/login-component.service";
import { Injectable } from "@angular/core";
import * as googlePhotosMigration from 'google-photos-migration'

@Injectable()
export class MigrateComponentService {
    constructor(private httpClient: HttpClient, private loginService: LoginComponentService) { }
    getHeader(type: string,
        param: string = null,
        contentType: string = "application/json") {
        if (param !== undefined && param !== null) {
            return {
                headers: new HttpHeaders({
                    'Content-Type': contentType,
                    'Authorization': "Bearer " + this.loginService.getToken(type)
                }),
                params: new HttpParams().set('pageToken', param)
            };
        } else {
            return {
                headers: new HttpHeaders({
                    'Content-Type': contentType,
                    'Authorization': "Bearer " + this.loginService.getToken(type)
                }),
            };
        }

    } 

    getAllAlbums(type: string, param: string) {
        return googlePhotosMigration.getAlbums(this.loginService.getToken(type), param);
    }

    getAllItemsFromAlbum(type: string, albumData: any) {
        return googlePhotosMigration.getAllItemsFromAlbum(albumData,this.loginService.getToken(type));       
    }

    createAlbum(type: string, albumName: string) {
        return googlePhotosMigration.createAlbum(albumName,this.loginService.getToken(type));        
    }

    migrateAlbum(albumData:any){
        return googlePhotosMigration.migrateAlbum(this.loginService.getToken('src'),this.loginService.getToken('dest'),albumData);
    }
}