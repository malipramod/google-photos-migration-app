import React, { useEffect, useState, useCallback } from 'react';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Spinner, Button, Alert, Intent } from "@blueprintjs/core";
import { useHistory  } from 'react-router-dom';
import * as googlePhotosMigration from 'google-photos-migration';
import Container from '../Container';
import AlbumCard from './AlbumCard';
import { googlePhotosLibInstance } from '../../config/axios';
import { AlbumItem, Album, GooglePhotosMigrationResponse } from '../../model/IGooglePhoto';
import { AuthUser } from '../../model/IAuth';

export default function Migrate() {
    const [googlePhotosAlbums, setGooglePhotosAlbums] = useState<AlbumItem>({ albums: [], nextPageToken: "" })
    const [loading, setLoading] = useState(true);
    const [migrationStatus, setMigrationStatus] = useState(false);
    const [noOfPhotos, setNoOfPhotos] = useState(0);
    const history = useHistory();
    const source: AuthUser = JSON.parse(localStorage.getItem('GSource')!);
    const dest: AuthUser = JSON.parse(localStorage.getItem('GDestination')!);
    const sourceToken: string = source ? source.token! : "";    
    const destToken: string = dest ? dest.token! : "";    


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

    //ComponentDidMount/First time page load
    useEffect(() => {
            getAlbums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const moveNext = ()=>{
        if(googlePhotosAlbums && googlePhotosAlbums.nextPageToken){            
            getAlbums(true);
        }
    }

    const navigate = (path: string) => {
        history.push(`/${path}`);
    }

    const migrate = (album:Album) =>{
        setLoading(true);
        googlePhotosMigration.migrateAlbum(sourceToken, destToken, album)
            .then((res: AxiosResponse<GooglePhotosMigrationResponse>) => {
                setLoading(false);
                if(res.data && res.data.newMediaItemResults){
                    setNoOfPhotos(res.data.newMediaItemResults[0].length);
                    setMigrationStatus(true)
                }
            })
            .catch((err: any) => {
                setLoading(false);
                console.log(err)
            })
    }

    return (
        source && source.loggedIn ?
            (<>
                <Alert
                    confirmButtonText="Okay"
                    onConfirm={() => setMigrationStatus(false)}
                    isOpen={migrationStatus}
                    icon="media"
                    intent={Intent.SUCCESS}>
                    <p>
                        {noOfPhotos} Photos Migrated!
                    </p>
                </Alert>
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
                                            migrate={migrate}
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
