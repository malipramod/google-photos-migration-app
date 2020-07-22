import React, { useState, useEffect } from 'react';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import Container from '../Container';
import AuthCard from './AuthCard';
import { loginButtons } from '../../config/config';

interface AuthUser {
    token?: string;
    id?: string;
    expiresAt?: string;
    email?: string;
    image?: string;
    name?: string;
    loggedIn?: boolean;
}

export default function Auth() {
    const [sourceUser, setSourceUser] = useState<AuthUser>({});
    const [destinationUser, setDestinationUser] = useState<AuthUser>({});

    useEffect(()=>{
        const localStorageSource: AuthUser = JSON.parse(localStorage.getItem('GSource')!);
        const localStorageDestination: AuthUser = JSON.parse(localStorage.getItem('GDestination')!);
        if(localStorageSource.loggedIn)
            setSourceUser(localStorageSource);
        if(localStorageDestination.loggedIn)
            setDestinationUser(localStorageDestination);
    },[]);

    useEffect(()=>{
        const localStorageSource: AuthUser = JSON.parse(localStorage.getItem('GSource')!);
        const localStorageDestination: AuthUser = JSON.parse(localStorage.getItem('GDestination')!);
        const currentTime = new Date().getTime()

        if (localStorageSource.expiresAt) {
            const sourceExpiry = new Date(localStorageSource.expiresAt).getTime();
            if (currentTime > sourceExpiry) {
                const newSourceUser = { ...sourceUser, loggedIn: false };
                setSourceUser(newSourceUser);
                localStorage.setItem("GSource", JSON.stringify(newSourceUser));
            }
        }
        if(localStorageDestination.expiresAt){
            const destinationExpiry = new Date(localStorageDestination.expiresAt).getTime();    
            if (currentTime > destinationExpiry) {
                const newDestinationUser = { ...destinationUser, loggedIn: false };
                setDestinationUser(newDestinationUser);
                localStorage.setItem("GDestination", JSON.stringify(newDestinationUser));
            }
        }
        

    }, [destinationUser, sourceUser])

    function onSuccess(response: GoogleLoginResponse | GoogleLoginResponseOffline, type: string) {
        const authResponse = (response as GoogleLoginResponse).getAuthResponse();
        const profile = (response as GoogleLoginResponse).getBasicProfile();
        const accountData: AuthUser = {
            token: authResponse.access_token,
            id: profile.getId(),
            expiresAt: (new Date(authResponse.expires_at)).toString(),
            email: profile.getEmail(),
            image: profile.getImageUrl(),
            name: profile.getName(),
            loggedIn: true
        }
        if (type === "source"){
            localStorage.setItem("GSource", JSON.stringify(accountData));
            setSourceUser(accountData);
        }else if (type === "destination"){
            localStorage.setItem("GDestination", JSON.stringify(accountData));
            setDestinationUser(accountData)
        }
    }

    function onFailure(error: any){
        console.log(error);
    }
    
    function onLogoutSuccess(type: string){
        if(type==="source"){
            const newSourceUser = { ...sourceUser, loggedIn: false };
            setSourceUser(newSourceUser);
            localStorage.setItem("GSource", JSON.stringify(newSourceUser));
        }else if(type==="destination"){
            const newDestinationUser = { ...destinationUser, loggedIn: false };
            setDestinationUser(newDestinationUser);
            localStorage.setItem("GDestination", JSON.stringify(newDestinationUser));
        }
    }

    function onLogoutFailure() {
        console.log('Failed to logout');
    }

    return (
        <Container>
            {loginButtons.map(loginButton => (
                <AuthCard
                    key={loginButton.id}
                    title={
                        loginButton.type === "source" && sourceUser.loggedIn! ? sourceUser.name! :
                        loginButton.type === "destination" && destinationUser.loggedIn! ? destinationUser.name! :
                        loginButton.title
                    }
                    subTitle={
                        loginButton.type === "source" && sourceUser.loggedIn! ? sourceUser.email! :
                        loginButton.type === "destination" && destinationUser.loggedIn! ? destinationUser.email! :
                        loginButton.subTitle
                    }
                    imageURL={
                        loginButton.type === "source" && sourceUser.loggedIn! ? sourceUser.image! :
                        loginButton.type === "destination" && destinationUser.loggedIn! ? destinationUser.image! :
                        ""}
                    buttonText={loginButton.buttonText}
                    type={loginButton.type}
                    isLoggedIn={loginButton.type === "source" ? sourceUser.loggedIn! : destinationUser.loggedIn!}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    onLogoutSuccess={onLogoutSuccess}
                    onLogoutFailure={onLogoutFailure}
                />
            ))}
        </Container>
    )
}
