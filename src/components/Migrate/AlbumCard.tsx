import React, { CSSProperties } from 'react';
import { Button, Card, Classes, Elevation, H4, H6, Divider } from "@blueprintjs/core";
import { Album } from '../../model/IGooglePhoto';

interface AuthCardProps {
    album: Album
}
export default function AlbumCard({album}:AuthCardProps){
    const cardStyle = { margin: '10px', width: '250px' };
    const keepTextCenter = { textAlign: 'center' } as CSSProperties;
    return(
        <Card elevation={Elevation.THREE} style={cardStyle}>
            <H4 style={keepTextCenter}>
                {album.title} 
            </H4>
            <H6 style={keepTextCenter}>{album.mediaItemsCount} Items</H6>
            <Divider/>
            <img width="200" height="200" src={album.coverPhotoBaseUrl} alt="This is alt"/>
            <Divider/>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
                <Button style={{ margin: '0px 5px' }} text="Migrate" intent="success" className={Classes.BUTTON} />
                <Button style={{ margin: '0px 5px' }} text="View" intent="primary" className={Classes.BUTTON} onClick={()=>{window.open(album.productUrl)}}/>
            </div>
        </Card>
    )
}
