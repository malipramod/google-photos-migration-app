import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { LoginComponentService } from "../login-component/login-component.service";
import * as AppConstant from "../app.constant";
import { Injectable } from "@angular/core";
import { ICreateAlbum } from "./migrate-component.model";

@Injectable()
export class MigrateComponentService {
    constructor(private httpClient: HttpClient, private loginService: LoginComponentService) { }
    getHeader(type: string,
        param: string = null,
        contentType: string = "application/json",
        XGoogUploadFileName: string = null,
        XGoogUploadProtocol: string = "raw") {
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
        return this.httpClient.get(AppConstant.googlePhotoApiURL + "albums", this.getHeader(type, param));
    }

    getAllItemsFromAlbum(type: string, albumId: string, param: string) {
        let body = {
            "pageSize": AppConstant.pageSize,
            "albumId": albumId
        };
        return this.httpClient.post(`${AppConstant.googlePhotoApiURL}mediaItems:search`, body, this.getHeader(type, param)).toPromise();
    }

    createAlbum(type: string, albumName: string) {
        let body = {
            "album": {
                "title": albumName
            }
        };
        return this.httpClient.post(`${AppConstant.googlePhotoApiURL}albums`, body, this.getHeader(type, null));
    }


    uploadMediaToAlubm(type: string, albumId: string, files: ICreateAlbum) {
        let body = {
            albumId:albumId,
            mediaItems:files
        };

        return this.httpClient.post(AppConstant.googlePhotosUploadAPILocal,body,this.getHeader(type));
    }

}