import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notifications';
import { showNotification as show, checkWin } from './Helper/Helper';

import './App.css';

const words = [
  'application', 
  'programming', 
  'interface', 
  'wizard', 
  'apple', 
  'banana', 
  'cherry', 
  'dragonfruit', 
  'elderberry', 
  'fig', 
  'grape', 
  'honeydew', 
  'kiwi', 
  'lemon',
  'mango', 
  'nectarine', 
  'orange', 
  'papaya', 
  'quince', 
  'raspberry', 
  'strawberry', 
  'tangerine', 
  'ugli', 
  'vanilla', 
  'watermelon', 
  'xigua', 
  'yam', 
  'zucchini',
  'computer', 
  'keyboard', 
  'mouse', 
  'monitor', 
  'processor', 
  'motherboard', 
  'software', 
  'hardware', 
  'network', 
  'internet',
  'soccer', 
  'basketball', 
  'tennis', 
  'baseball', 
  'football', 
  'cricket', 
  'hockey', 
  'volleyball', 
  'golf', 
  'rugby',
  'swimming', 
  'cycling'
];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;