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
