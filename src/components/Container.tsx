import React, { ReactNode, CSSProperties } from 'react';

interface ContainerProps {
    children: ReactNode;
}
export default function Container({ children }: ContainerProps) {
    const containerStyle = {
        margin: '10px 5%',
        padding: '0px 10px',
        display: 'flex',        
        flexWrap:'wrap',
        justifyContent: 'center',
        background: 'slategrey',
        borderRadius: '10xp'
    } as CSSProperties;
    return (
        <div style={containerStyle}>
            {children}
        </div>
    )
}
