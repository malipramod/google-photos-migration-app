/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState, useCallback } from 'react';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Spinner, Alert, Intent } from "@blueprintjs/core";
import { useHistory  } from 'react-router-dom';
import * as googlePhotosMigration from 'google-photos-migration';
import Container from '../Container';
import AlbumCard from './AlbumCard';
import NextButton from './NextButton';
import { googlePhotosLibInstance } from '../../config/axios';
import { AlbumItem, Album, GooglePhotosMigrationResponse } from '../../model/IGooglePhoto';
import { AuthUser } from '../../model/IAuth';

export default function Migrate(): JSX.Element {
	const [ googlePhotosAlbums, setGooglePhotosAlbums ] = useState<AlbumItem>({ albums: [], nextPageToken: "" });
	const [ loading, setLoading ] = useState(true);
	const [ migrationStatus, setMigrationStatus ] = useState(false);
	const [ noOfPhotos, setNoOfPhotos ] = useState(0);
	const [ source, setSource ] = useState<AuthUser>(JSON.parse(localStorage.getItem('GSource')!));
	const [ dest, setDest ] = useState<AuthUser>(JSON.parse(localStorage.getItem('GDestination')!));
	const [ disabledMigrate, setDisabledMigrate ] = useState(dest && !dest.loggedIn);
	const history = useHistory();
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
					setLoading(false);
					console.log(err);
				});
		}
	}, [ googlePhotosAlbums.nextPageToken, sourceToken ]);

	//ComponentDidMount/First time page load
	useEffect(() => {
		if (source && !source.loggedIn) {
			setSource({ ...source, loggedIn: false });
			return;
		}

		if (source && source.expiresAt && (new Date() > new Date(source.expiresAt))){
			setSource({ ...source, loggedIn: false });
			return;
		}
		getAlbums();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const moveNext = () => {
		if(googlePhotosAlbums && googlePhotosAlbums.nextPageToken){
			getAlbums(true);
		}
	};

	const navigate = (path: string) => {
		history.push(`/${path}`);
	};

	const migrate = (album:Album) => {
		if (dest && !dest.loggedIn) {
			setDisabledMigrate(true);
			setDest({ ...dest, loggedIn: false });
			return;
		}

		if(dest && dest.expiresAt && (new Date() > new Date(dest.expiresAt) )){
			setDest({ ...dest, loggedIn: false });
			return;
		}
		setLoading(true);
		googlePhotosMigration.migrateAlbum(sourceToken, destToken, album)
			.then((res: AxiosResponse<GooglePhotosMigrationResponse>) => {
				setLoading(false);
				if(res.data && res.data.newMediaItemResults){
					setNoOfPhotos(res.data.newMediaItemResults[0].length);
					setMigrationStatus(true);
				}
			})
			.catch((err: unknown) => {
				setLoading(false);
				console.log(err);
			});
	};

	return (
		source && source.loggedIn ?
			(<>
				<Alert
					confirmButtonText="Okay"
					icon="media"
					intent={ Intent.SUCCESS }
					isOpen={ migrationStatus }
					onConfirm={ () => setMigrationStatus(false) }>
					<p>
						{noOfPhotos} Photos Migrated!
					</p>
				</Alert>
				<NextButton
					loading={ loading }
					moveNext={ moveNext }
				/>
				<Container>
					{
						loading ?
							<Spinner intent="success" size={ Spinner.SIZE_STANDARD } /> :


							(googlePhotosAlbums.albums.map(googlePhotoAlbum => (
								<AlbumCard
									album={ googlePhotoAlbum }
									disabledMigrate = { disabledMigrate }
									key={ googlePhotoAlbum.id }
									migrate={ migrate }
								/>
							)))

					}
				</Container>
				<NextButton
					loading={ loading }
					moveNext={ moveNext }
				/>
			</>) :
			<Container align="center">
				<Alert
					cancelButtonText="Go to Home"
					confirmButtonText="Go to Login"
					isOpen={ !source || !source.loggedIn }
					onCancel={ () => navigate('') }
					onConfirm={ () => navigate('auth') }>
					<p>
                        You are logged out. Please Login.
					</p>
				</Alert>
			</Container>
	);
}
