import React, { ReactNode, CSSProperties } from 'react';

interface ContainerProps {
    children: ReactNode;
    align?: string;
    display?: string;
}
export default function Container({ children, align, display }: ContainerProps): JSX.Element {
	const containerStyle = {
		margin: '10px 5%',
		padding: '0px 10px',
		display: display ? display : 'flex',
		flexWrap: 'wrap',
		justifyContent: align ? align : 'center',
		borderRadius: '10xp'
	} as CSSProperties;
	return (
		<div style={ containerStyle }>
			{children}
		</div>
	);
}
