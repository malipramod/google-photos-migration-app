import React, { useEffect, useState, useCallback } from 'react';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Spinner, Button, Alert } from "@blueprintjs/core";
import { useHistory  } from 'react-router-dom';
import Container from '../Container';
import AlbumCard from './AlbumCard';
import { googlePhotosLibInstance } from '../../config/axios';
import { AlbumItem } from '../../model/IGooglePhoto';
import { AuthUser } from '../../model/IAuth';

export default function Migrate() {
    const [googlePhotosAlbums, setGooglePhotosAlbums] = useState<AlbumItem>({ albums: [], nextPageToken: "" })
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const source: AuthUser = JSON.parse(localStorage.getItem('GSource')!);
    const sourceToken: string = source ? source.token! : "";    

    const getAlbums = useCallback((next?: boolean) => {
        if (sourceToken) {
            setLoading(true);
            const url = next ? '/v1/albums?pageToken=' + googlePhotosAlbums.nextPageToken : '/v1/albums';
            const config: AxiosRequestConfig = {
                url,
                method: 'GET',
                headers: {
                    "Authorization": 'Bearer ' + sourceToken
                }
            };
            googlePhotosLibInstance(config)
                .then((resp: AxiosResponse<AlbumItem>) => {
                    setGooglePhotosAlbums(resp.data);
                    setLoading(false);
                })
                .catch(err => {
                    setLoading(false)
                    console.log(err);
                });
        }
    },[googlePhotosAlbums.nextPageToken, sourceToken])

    useEffect(() => {
        if(googlePhotosAlbums && !googlePhotosAlbums.nextPageToken){
            getAlbums();
        }
    },[getAlbums, googlePhotosAlbums]);    

    const moveNext = ()=>{
        if(googlePhotosAlbums && googlePhotosAlbums.nextPageToken){            
            getAlbums(true);
        }
    }

    const navigate = (path: string) => {
        history.push(`/${path}`);
    }

    return (
        source && source.loggedIn ?
            (<>
                <Container align='flex-end'>
                    {!loading &&
                        <Button
                            text="Next"
                            onClick={moveNext}
                        />
                    }
                </Container>
                <Container>
                    {
                        loading ?
                            <Spinner intent="success" size={Spinner.SIZE_STANDARD} /> :
                            <>
                                {
                                    googlePhotosAlbums.albums.map(googlePhotoAlbum => (
                                        <AlbumCard
                                            key={googlePhotoAlbum.id}
                                            album={googlePhotoAlbum}
                                        />
                                    ))
                                }
                            </>
                    }
                </Container>
            </>) :
            <Container align="center">
                <Alert
                    confirmButtonText="Go to Login"
                    cancelButtonText="Go to Home"
                    onCancel={()=>navigate('')}
                    onConfirm={()=>navigate('auth')}
                    isOpen={!source || !source.loggedIn}>
                    <p>
                        You are logged out. Please Login.
                    </p>
                </Alert>
            </Container>
    )
}
