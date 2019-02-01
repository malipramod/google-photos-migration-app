import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { LoginComponentService } from "../login-component/login-component.service";
import * as AppConstant from "../app.constant";
import { Injectable } from "@angular/core";

@Injectable()
export class MigrateComponentService {
    constructor(private httpClient: HttpClient, private loginService: LoginComponentService) { }
    getHeader(type: string,
        param: string = null,
        contentType: string = "application/json",
        XGoogUploadFileName: string = null,
        XGoogUploadProtocol: string = "raw") {
        if (param !== undefined && param !== null && (XGoogUploadFileName != null || XGoogUploadProtocol != "raw")) {
            return {
                headers: new HttpHeaders({
                    'Content-Type': contentType,
                    'Authorization': "Bearer " + this.loginService.getToken(type)
                }),
                params: new HttpParams().set('pageToken', param)
            };
        } else if ((XGoogUploadFileName != null && XGoogUploadProtocol != null)) {
            return {
                headers: new HttpHeaders({
                    'Content-Type': contentType,
                    'Authorization': "Bearer " + this.loginService.getToken(type),
                    'X-Goog-Upload-File-Name': XGoogUploadFileName,
                    'X-Goog-Upload-Protocol': XGoogUploadProtocol
                }),
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

    async downloadMedia() {
        let url = "https://lh3.googleusercontent.com/lr/AGWb-e51zqOrDmyjErB-iHF6ttMEdQSCUEbdl3myhtT3GFr5GdqcD6YDrozb3SEWvOEsVAVdus_yMlVLucrNIdeklKc-783JuRlKJUjys1FBGqBvavQAlIMWpf-LNVs4Uz6-4bjRlhcMEbTKZBYZ_qHBpF7ZOpk1mruHnQX26lld8QpaATL-GeDn_KV5efkPnzOCVqHV5thc4UCaKGDBWO3MfRrSCzlBdqkGUanWw8RN6zb7VS8u8MbtofB7e78cmD3-S89_m6IwmmnkXTOAvITPHeAv-wLbxxhyRqrOxm3yNAtSS3MNnwAmrdpXhewQjCPSceNJTmKOPCN_IPwBiNcliUBjenpVG_6ZBbo0oCHkariCZ9vy8w7seTx2ywxf-3aGTR8Mpr882zO08fpjEQ2qhMXVWBhBXNk_TSTN5-yDTXxehPvcAOPTNMhwL1YIfWZ4uxd2ti6fQD0mkZq3qU1WPKgbWLfPoO1rR1WvswNCy_WUkK2N5UjFOnr2XJUFQK7FZTw_TeS2W_LJvRyAOc8-NWx--rQ7Y88b2gJEQzcSrd7-HKqmSoe8Ae6XadENO_ZVpWMhliXcwA5EmChdI3WXLH2FGx0uzruuGVcBaj03zRv0yTC8wBuG0K6V_2IqIOgxlORUOE2OHzjFYBSKQR3eefNnIDzvEWllV_VZAyK7d_XZHbqVr3_Jnc9VC7mrGmJu5YeCtt0k1Y2hO-iYYFRuukbQ7JLCGSOpAPqJ7-UInK-A7xR8QRVy3vrut_clX94WfIyEn71mbzDGT3TsxHq20vyVKH4wnv1eVsEMmwUdPA3nJqVX94RXcKg9_eLR3C5EZPdRxFCNkJMuW9QSTHRnFaSD-BVi8vKGQX0aUigx2Jgv6_3MX6zKbmA-sR7I8MOPmxBOvl_X3z5gPmSKiZNvKHZrnGeVYP7tdMJQiLonhpGpuYo=w100-h100-d";
        fetch(url, {
            mode: 'no-cors'
        }).then(response => {
           
        });
    }

    //    response.blob().then(blobData=>{
    //         // return this.httpClient.post(`${AppConstant.googlePhotoApiURL}uploads`, blobData, this.getHeader('dest', null, "application/octet-stream", 'Test', "raw"));
    //    })


    //    console.log(content);
    // // return this.httpClient.post(`${AppConstant.googlePhotoApiURL}uploads`, content, this.getHeader('dest', null, "application/octet-stream", 'Test', "raw"));
    // });



    uploadMediaToAlubm(type: string, fileName: string, bytes: string) {
        return this.httpClient.post(`${AppConstant.googlePhotoApiURL}uploads`, bytes, this.getHeader(type, null, "application/octet-stream", fileName, "raw"));
    }


}