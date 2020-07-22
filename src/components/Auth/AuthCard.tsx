import React from 'react';
import { Button, Card, Classes, Elevation, H5 } from "@blueprintjs/core";

interface AuthCardProps {
    title: string;
    subTitle: string;
    buttonText: string;
}

export default function AuthCard({ title, subTitle, buttonText }: AuthCardProps) {
    const cardStyle = { margin: '10px' };
    return (
        <Card elevation={Elevation.THREE} style={cardStyle}>
            <H5>
                {title}
            </H5>
            <p>
                {subTitle}
            </p>
            <Button text={buttonText} className={Classes.BUTTON} />
        </Card>
    )
}
