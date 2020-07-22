import React from 'react';
import Container from '../Container';
import AuthCard from './AuthCard';
import { loginButtons } from '../../config/config';

export default function Auth() {
    return (
        <Container>
            {loginButtons.map(loginButton => (
                <AuthCard
                    key={loginButton.id}
                    title={loginButton.title}
                    subTitle={loginButton.subTitle}
                    buttonText={loginButton.buttonText}
                />
            ))}
        </Container>
    )
}
