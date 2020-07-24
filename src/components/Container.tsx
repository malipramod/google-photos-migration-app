import React, { ReactNode, CSSProperties } from 'react';

interface ContainerProps {
    children: ReactNode;
    align?: string;
}
export default function Container({ children, align }: ContainerProps) {
    const containerStyle = {
        margin: '10px 5%',
        padding: '0px 10px',
        display: 'flex',        
        flexWrap:'wrap',
        justifyContent: align ? align : 'center',        
        borderRadius: '10xp'
    } as CSSProperties;
    return (
        <div style={containerStyle}>
            {children}
        </div>
    )
}
