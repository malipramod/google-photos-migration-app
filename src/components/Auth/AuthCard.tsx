import React from 'react';
import { Card, Elevation, H5, Divider } from "@blueprintjs/core";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout } from 'react-google-login';
import { clientKey, scope } from '../../config/config';   

interface AuthCardProps {
    title: string;
    subTitle: string;
    buttonText: string;
    type: string;
    isLoggedIn: boolean;
    imageURL: string;
    onSuccess: (response: GoogleLoginResponse | GoogleLoginResponseOffline, type: string) => void;
    onFailure: (error: any) => void;
    onLogoutSuccess: (type: string) => void;
    onLogoutFailure: () => void;
}

export default function AuthCard({ title, subTitle, buttonText, type, isLoggedIn, imageURL, onSuccess, onFailure, onLogoutSuccess, onLogoutFailure }: AuthCardProps) {
    const cardStyle = { margin: '10px' };    
    return (
        <Card elevation={Elevation.THREE} style={cardStyle}>
            <H5>
                {title}
            </H5>
            <p>
                {subTitle}
            </p>
            <Divider/>
            <img width="200" height="200" src={imageURL} alt=""/>
            <Divider/>
            {
                isLoggedIn?
                (<GoogleLogout
                    clientId={clientKey}
                    buttonText={"Logout"}                    
                    onLogoutSuccess={()=>onLogoutSuccess(type)}
                    onFailure={onLogoutFailure}
                />):
                (<GoogleLogin
                    clientId={clientKey}
                    buttonText={buttonText}
                    onSuccess={(response: GoogleLoginResponse | GoogleLoginResponseOffline)=>onSuccess(response, type)}
                    onFailure={onFailure}
                    cookiePolicy={ 'single_host_origin' }
                    responseType='code,token'
                    scope={scope}
                />)
            }
            
        </Card>
    )
}
