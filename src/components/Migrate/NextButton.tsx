import React from 'react';
import { Button} from "@blueprintjs/core";
import Container from '../Container';

interface NextButtonProps{
    loading: boolean;
    moveNext: () => void;
}

const NextButton = ({ loading, moveNext }: NextButtonProps) => (
    <Container align='flex-end'>
        {!loading &&
            <Button
                text="Next"
                onClick={moveNext}
            />
        }
    </Container>
)

export default NextButton;
