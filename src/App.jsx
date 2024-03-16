import React, { useState, useEffect } from 'react';
import FlashcardList from './FlashcardList';
import CardSetInfo from './CardSetInfo';
import './App.css';

const App = () => {
    const [cards, setCards] = useState([
        { id: 1, question: "What's a vampire's favorite drink?", answer: "Blood" },
        { id: 2, question: "What do you call a cat magician?", answer: "Purrfect" },
        { id: 3, question: "What's a scarecrow's favorite fruit?", answer: "Strawberries" },
        { id: 4, question: "What do you call a cheese that isn't yours?", answer: "Nacho cheese" },
        { id: 5, question: "What's a ghost's favorite dessert?", answer: "Boo-berry pie" },
        { id: 6, question: "Why was the math book sad?", answer: "It had too many problems" },
        { id: 7, question: "What's a boxer's favorite drink?", answer: "Punch" },
        { id: 8, question: "What's a pirate's favorite letter?", answer: "Arrr" },
        { id: 9, question: "What's a snowman's favorite breakfast?", answer: "Frosted flakes" },
        { id: 10, question: "What do you call fake noodle?", answer: "An impasta" },
        { id: 11, question: "What's orange and sounds like parrot?", answer: "A carrot" },
        { id: 12, question: "What's brown and sticky?", answer: "A stick" },
        { id: 13, question: "Why couldn't the bicycle stand up by itself?", answer: "It was two tired" },
    ]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState('');
    const [streak, setStreak] = useState(0);
    const [longestStreak, setLongestStreak] = useState(0);

    useEffect(() => {
        if (streak > longestStreak) {
            setLongestStreak(streak);
        }
    }, [streak]);

    const handleNextCard = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
        setUserInput('');
        setFeedback('');
    };

    const handlePreviousCard = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
        setUserInput('');
        setFeedback('');
    };

    const handleShuffle = () => {
        setCards((prevCards) => {
            const shuffledCards = [...prevCards];
            for (let i = shuffledCards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
            }
            return shuffledCards;
        });
        setCurrentCardIndex(0);
        setUserInput('');
        setFeedback('');
    };

    const handleSubmit = () => {
        const currentCard = cards[currentCardIndex];
        const correctAnswer = currentCard.answer.toLowerCase();
        const userInputLowercase = userInput.trim().toLowerCase();
      
        const correctWords = correctAnswer.split(' ');
        const userWords = userInputLowercase.split(' ');
      
        const isMatch = correctWords.some(word => userWords.includes(word));
      
        if (isMatch) {
          setFeedback('Correct!');
          setStreak((prevStreak) => prevStreak + 1);
        } else {
          setFeedback('Incorrect. Try again!');
          setStreak(0);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="app">
            <CardSetInfo title="Fun Quiz" description="How many fun questions and riddles do you know the answer to?" totalCards={cards.length} />
            <div className="card-feedback-holder">
                <div className="feedback">
                    <p>{feedback}</p>
                    <p>Current Streak: {streak}</p>
                    <p>Longest Streak: {longestStreak}</p>
                </div>
                <FlashcardList cards={cards} currentCardIndex={currentCardIndex} userInput={userInput} setUserInput={setUserInput} />
            </div>

            <div className="buttons">
                <div className="nav-buttons">
                    <button onClick={handlePreviousCard}>Previous</button>
                    <button onClick={handleNextCard}>Next</button>
                    <button onClick={handleShuffle}>Shuffle</button>
                </div>
                <div className="answer-buttons">
                    <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyDown={handleKeyPress} />
                    <button onClick={handleSubmit} type="submit">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default App;
