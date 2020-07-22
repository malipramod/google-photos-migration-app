import React from 'react';
import { Link } from 'react-router-dom'
import { Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading } from "@blueprintjs/core";

interface HeaderProps {
    title: string;
}

export default function Header({ title }: HeaderProps) {
    const noUnderline = { textDecoration: 'none' };
    return (
        <Navbar>
            <NavbarGroup align={Alignment.LEFT}>
                <Link to="/" style={noUnderline}>
                    <NavbarHeading>{title}</NavbarHeading>
                </Link>
                <NavbarDivider />
                <Link to="/auth" style={noUnderline}>
                    <Button className={Classes.MINIMAL} icon="shield" text="Authorize" />
                </Link>
                <Link to="/migrate" style={noUnderline}>
                    <Button className={Classes.MINIMAL} icon="refresh" text="Migrate" />
                </Link>
            </NavbarGroup>
        </Navbar>
    )
}
