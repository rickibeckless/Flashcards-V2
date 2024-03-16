import React from 'react';
import Flashcard from './Flashcard';

const FlashcardList = ({ cards, currentCardIndex, userInput, setUserInput }) => {
    const currentCard = cards[currentCardIndex];

    return (
    <div className="flashcard-list">
        <Flashcard question={currentCard.question} answer={currentCard.answer} />
    </div>
    );
};

export default FlashcardList;
