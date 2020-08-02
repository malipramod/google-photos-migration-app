import React from 'react';
import { Link } from 'react-router-dom';
import { Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading } from "@blueprintjs/core";

interface HeaderProps {
    title: string;
}

export default function Header({ title }: HeaderProps): JSX.Element {
	const noUnderline = { textDecoration: 'none' };
	return (
		<Navbar>
			<NavbarGroup align={ Alignment.LEFT }>
				<Link style={ noUnderline } to="/">
					<NavbarHeading>{title}</NavbarHeading>
				</Link>
				<NavbarDivider />
				<Link style={ noUnderline } to="/auth">
					<Button className={ Classes.MINIMAL } icon="shield" text="Authorize" />
				</Link>
				<Link style={ noUnderline } to="/migrate">
					<Button className={ Classes.MINIMAL } icon="refresh" text="Migrate" />
				</Link>
			</NavbarGroup>
			<NavbarGroup align={ Alignment.RIGHT }>
				<Button className={ Classes.MINIMAL } icon="code" onClick={ () => { window.open('https://github.com/malipramod/google-photos-migration-app', '_blank'); } } title="Code" />
			</NavbarGroup>
		</Navbar>
	);
}
