import React from 'react';
import { Button } from "@blueprintjs/core";
import Container from '../Container';

interface NextButtonProps{
    loading: boolean;
    moveNext: () => void;
}

const NextButton = ({ loading, moveNext }: NextButtonProps): JSX.Element => (
	<Container align='flex-end'>
		{
			!loading &&
            <Button
            	onClick={ moveNext }
            	text="Next"
            />
		}
	</Container>
);

export default NextButton;
