import { Component, OnInit } from '@angular/core';
import { LoginComponentService } from '../login-component/login-component.service';
import { Router } from '@angular/router';
import { MigrateComponentService } from './migrate-component.service';
import * as AppConstant from '../app.constant';
import { IMediaItems, IAlbum, ICreateAlbum, IMediaItem } from './migrate-component.model';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-migrate-component',
    templateUrl: './migrate-component.component.html',
    styleUrls: ['./migrate-component.component.css']
})
export class MigrateComponentComponent implements OnInit {

    constructor(private loginService: LoginComponentService, 
                private router: Router, 
                private migrateService: MigrateComponentService,
                private spinnerService: Ng4LoadingSpinnerService) { }
    albums: any;
    nextButton: string = "Next";
    nextPageToken: string;
    pageToken: string = null;
    mediaMap = [];
    ngOnInit() {
        this.spinnerService.show();
        if (!this.loginService.checkLogIn()) {
            alert('Please Authorize first');
            this.router.navigateByUrl("\Authorize");
        } else {
            this.migrateService.getAllAlbums('src', null).subscribe(
                (val: any) => {
                    this.albums = val.albums;
                    this.nextPageToken = val.nextPageToken;
                }
            )
        }
        //this.spinnerService.hide();
        
    }

    next() {
        if (!this.loginService.checkLogIn()) {
            alert('Please Authorize first');
            this.router.navigateByUrl("\Authorize");
        } else {
            this.migrateService.getAllAlbums('src', this.nextPageToken).subscribe(
                (val: any) => {
                    this.albums = val.albums
                    this.nextPageToken = val.nextPageToken;
                }
            )
        }
    }

    startMigrateAlbum(album: any) {
        this.pageToken = null;
        this.mediaMap = [];
        length = (Math.floor(album.mediaItemsCount / AppConstant.pageSize) + 1);
        this.getItemsFromAlbum('src', album, this.pageToken, length);
    }

    getItemsFromAlbum(type: string, album: IAlbum, pageToken: string, length: number) {
        if (length > 0) {
            this.migrateService.getAllItemsFromAlbum(type, album.id, pageToken).then(
                (val: IMediaItems) => {
                    this.mediaMap.push(val.mediaItems);
                    pageToken = val.nextPageToken;
                    length--;
                    this.getItemsFromAlbum('src', album, pageToken, length);
                },
                (err: string) => {
                    console.log(err);
                }
            )
        } else {
            this.migrateService.createAlbum("dest", album.title).subscribe(
                (album: ICreateAlbum) => {
                    let mediaLength:number=this.mediaMap.length;
                    let files = this.mediaMap[mediaLength-1];
                    this.uploadMediaToAlbum('dest', album.id, files, mediaLength - 1);
                },
                (err: string) => {
                    console.log(err);
                }
            );



        }
    }

    uploadMediaToAlbum(type: string, albumId: string, files: ICreateAlbum,mediaLength:number) {
        this.migrateService.uploadMediaToAlubm(type, albumId, files).subscribe(
            (val: any) =>{ 
                if(mediaLength>0){
                    mediaLength--;
                    let files = this.mediaMap[mediaLength];
                    this.uploadMediaToAlbum('dest', albumId, files,mediaLength);
                }
            }
        );
    }
}
