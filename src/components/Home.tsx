import React, { useEffect, useState } from 'react';
import showdown from 'showdown';
import parse from 'html-react-parser';
import readme from '../types/md-files/home.md';
import Container from './Container';

export default function Home(): JSX.Element {
	const [ html, setHTML ] = useState("");

	useEffect(() => {
		fetch(readme)
			.then(data => data.text())
			.then(text => {
				const converter = new showdown.Converter();
				setHTML(converter.makeHtml(text));
			});
	}, []);

	return (
		<Container display="block">{parse(html)}</Container>
	);
}
