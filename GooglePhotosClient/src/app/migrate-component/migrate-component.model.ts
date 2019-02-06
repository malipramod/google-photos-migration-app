export interface IAlbum {
    coverPhotoBaseUrl: string;
    coverPhotoMediaItemId: string;
    id: string;
    mediaItemsCount: string;
    productUrl: string;
    title: string;
}

export interface IMediaItems {
    mediaItems: IMediaItem[];
    nextPageToken: string;
}
export interface IMediaItem {
    baseUrl: string;
    filename: string;
    id: string;
    mimeType: string;
    productUrl: string;
    mediaMetadata: IMediaMetadata;
}
interface IMediaMetadata {
    creationTime: Date;
    height: string;
    width: string;
    photo: IPhoto;
}
interface IPhoto {
    apertureFNumber: number;
    cameraMake: string;
    cameraModel: string;
    focalLength: number;
    isoEquivalent: number;
}


export interface ICreateAlbum {
    productUrl: string;
    id: string;
    title: string;
    isWriteable: string;
}

export interface IUploadGooglePhotos {
    albumId: string;
    mediaItems: Array<IMediaItem>;

}