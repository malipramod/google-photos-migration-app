import axios from 'axios';

export const googlePhotosLibInstance = axios.create({
    baseURL: 'https://photoslibrary.googleapis.com'
});

export const googlePhotosMigrationInstance = axios.create({
    baseURL: 'https://google-photos-migration.herokuapp.com'
});
