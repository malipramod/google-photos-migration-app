import React, { CSSProperties } from 'react';
import { Button, Card, Classes, Elevation, H5, Divider } from "@blueprintjs/core";
import placeHolderImage from '../../static/logo512.png';

interface AuthCardProps {
    title: string;
    subTitle: string;
    buttonText: string;
}
export default function AlbumCard(){
    const cardStyle = { margin: '10px' };
    const keepTextCenter = { textAlign: 'center' } as CSSProperties;
    return(
        <Card elevation={Elevation.THREE} style={cardStyle}>
            <H5 style={keepTextCenter}>
                Album Name
            </H5>
            <Divider/>
            <img width="200" height="200" src={placeHolderImage} alt="This is alt"/>
            <Divider/>
            <Button text="Migrate" intent="success" className={Classes.BUTTON} />
        </Card>
    )
}
