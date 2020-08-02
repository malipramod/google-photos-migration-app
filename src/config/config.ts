export const loginButtons = [
	{
		id: "source-login-button",
		type: "source",
		title: "Source Google Photos Account",
		subTitle: "Please login with your source google photos account",
		buttonText: "Login with Google"
	},
	{
		id: "destination-login-button",
		type: "destination",
		title: "Destination Google Photos Account",
		subTitle: "Please login with your destination google photos account",
		buttonText: "Login with Google"
	}
];

export const clientKey = "62681126361-sl79nkbutratsgm2lae7doerlrf1fvl2.apps.googleusercontent.com";
export const scope = [
	'profile',
	'email',
	'https://www.googleapis.com/auth/contacts.readonly',
	'https://www.googleapis.com/auth/admin.directory.user.readonly',
	'https://www.googleapis.com/auth/photoslibrary.readonly',
	'https://www.googleapis.com/auth/photoslibrary.appendonly',
	'https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata',
	'https://www.googleapis.com/auth/photoslibrary',
	'https://www.googleapis.com/auth/photoslibrary.sharing'
].join(' ');
