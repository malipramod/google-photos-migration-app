import axios from 'axios';

export const googlePhotosLibInstance = axios.create({
    baseURL: 'https://photoslibrary.googleapis.com'
});
