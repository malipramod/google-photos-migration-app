import React, { CSSProperties } from 'react';
import { Button, Card, Classes, Elevation, H4, H6, Divider, Tooltip } from "@blueprintjs/core";
import { Album } from '../../model/IGooglePhoto';

interface AuthCardProps {
    album: Album;
    disabledMigrate: boolean;
    migrate: (album: Album) => void;
}
export default function AlbumCard({ album, disabledMigrate, migrate }: AuthCardProps): JSX.Element {
	const cardStyle = { margin: '10px', width: '250px' };
	const keepTextCenter = { textAlign: 'center' } as CSSProperties;
	return(
		<Card elevation={ Elevation.THREE } style={ cardStyle }>
			<H4 style={ keepTextCenter }>
				{album.title}
			</H4>
			<H6 style={ keepTextCenter }>{album.mediaItemsCount} Items</H6>
			<Divider />
			<img alt="This is alt" height="200" src={ album.coverPhotoBaseUrl } width="200" />
			<Divider />
			<div style={ { display: 'flex', justifyContent: 'flex-end' } }>
				<Tooltip content={ disabledMigrate?"Please login to destination account":"Click to migrate album" }>
					<Button className={ Classes.BUTTON } disabled={ disabledMigrate } intent="success" onClick={ () => migrate(album) } style={ { margin: '0px 5px' } } text="Migrate" />
				</Tooltip>
				<Tooltip content="Click to view album">
					<Button className={ Classes.BUTTON } intent="primary" onClick={ () => { window.open(album.productUrl); } } style={ { margin: '0px 5px' } } text="View" />
				</Tooltip>
			</div>
		</Card>
	);
}
