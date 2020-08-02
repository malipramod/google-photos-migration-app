import React from 'react';
import { Card, Elevation, H5, Divider } from "@blueprintjs/core";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { clientKey, scope } from '../../config/config';

interface AuthCardProps {
    title: string;
    subTitle: string;
    buttonText: string;
    type: string;
    isLoggedIn: boolean;
    imageURL: string;
    expiryTime: string;
    onSuccess: (response: GoogleLoginResponse | GoogleLoginResponseOffline, type: string) => void;
    onFailure: (error: unknown) => void;
}

export default function AuthCard({ title, subTitle, buttonText, type, isLoggedIn, imageURL, expiryTime, onSuccess, onFailure }: AuthCardProps): JSX.Element {
	const cardStyle = { margin: '10px' };
	const now = new Date();
	const expiry = new Date(expiryTime);
	const remainingMins = Math.ceil((expiry.getTime() - now.getTime())/(1000*60));

	return (
		<Card elevation={ Elevation.THREE } style={ cardStyle }>
			<H5>
				{title}
			</H5>
			<p>
				{subTitle}
			</p>
			<Divider />
			<img alt="" height="200" src={ imageURL } width="200" />
			<Divider />
			{
				isLoggedIn?
					<p>
                    ~{remainingMins} Mins left
					</p>
					:
					(<GoogleLogin
						buttonText={ buttonText }
						clientId={ clientKey }
						cookiePolicy={ 'single_host_origin' }
						onFailure={ onFailure }
						onSuccess={ (response: GoogleLoginResponse | GoogleLoginResponseOffline) => onSuccess(response, type) }
						responseType='code,token'
						scope={ scope }
					/>)
			}
		</Card>
	);
}
