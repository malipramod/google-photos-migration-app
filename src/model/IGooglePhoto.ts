export interface Album {
    id: string;
    title: string;
    productUrl: string;
    mediaItemsCount: string;
    coverPhotoBaseUrl: string;
    coverPhotoMediaItemId: string;
}

export interface AlbumItem {
    albums: Album[];
    nextPageToken: string;
}

export interface GooglePhotosMigrationResponse {
    newMediaItemResults: Array<Array<NewMediaItemResult>>;
}

interface NewMediaItemResult {
    uploadToken: string;
    status: Status;
    mediaItem: MediaItem;
}

interface MediaItem {
    id: string;
    description: string;
    productUrl: string;
    mimeType: string;
    mediaMetadata: MediaMetadata;
    filename: string;
}

interface MediaMetadata {
    creationTime: Date;
    width: string;
    height: string;
}


interface Status {
    message: string;
}
