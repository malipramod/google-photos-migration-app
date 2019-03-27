'use strict';

export const clientId:string ="62681126361-p2dmnds3qt7h1e52ds98po6eem5f4f7i.apps.googleusercontent.com";
export const scope = [
    'profile',
    'email',
    // 'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly',
    'https://www.googleapis.com/auth/photoslibrary.readonly',
    'https://www.googleapis.com/auth/photoslibrary.appendonly',
    'https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata',
    'https://www.googleapis.com/auth/photoslibrary',
    'https://www.googleapis.com/auth/photoslibrary.sharing'
].join(' ');

export const googleLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png';

export const googlePhotoApiURL='https://photoslibrary.googleapis.com/v1/';
export const pageSize = 100;
export const googlePhotosUploadAPILocal = 'http://localhost:57355/api/UploadToGooglePhotos';
// export const googlePhotosMigrateAPINode = "https://google-photos-migration.herokuapp.com/";
export const googlePhotosMigrateAPINode = "http://localhost:8080/";
