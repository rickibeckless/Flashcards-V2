import { useState } from 'react';

const Flashcard = ({ question, answer }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className='flashcard' onClick={handleClick}>
            <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}>
                <div className='front'>
                    <p className='card-text'>{question}</p>
                </div>
                <div className='back'>
                    <p className='card-text'>{answer}</p>
                </div>
            </div>
        </div>
    );
};

export default Flashcard;
