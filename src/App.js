import './App.css'
import {useEffect, useState} from "react";
import SingleCard from "./components/SingleCard";


const cardImages = [
  {src: "./img/helmet-1.png", matched: false},
  {src: "./img/potion-1.png", matched: false},
  {src: "./img/ring-1.png", matched: false},
  {src: "./img/scroll-1.png", matched: false},
  {src: "./img/shield-1.png", matched: false},
  {src: "./img/sword-1.png", matched: false},
];


function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setchoiceOne] = useState(null);
  const [choiceTwo, setchoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);


  const shuffelCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id:Math.random()}))

    setCards(shuffledCards);
    setTurns(0)
  };

  const handleChoice = (card) => {
    choiceOne ? setchoiceTwo(card) : setchoiceOne(card)
  };

  const resetTurn = () => {
    setchoiceOne(null)
    setchoiceTwo(null)
  if (choiceOne || choiceTwo) {
    setTurns((prev) => prev+1)
  }
    setDisabled(false)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (choiceOne.src === card.src) {
              return {...card,matched: true}
            }
            return card;
          })
        })

        resetTurn();
      }
    }

    let timerId = setTimeout(() => {
      resetTurn();
    }, 1000);

    return() => {
      clearTimeout(timerId);
    };
  },  [choiceOne,choiceTwo])

  useEffect (() => {
    shuffelCards()
  },[])
  return (
    <div className="App">
      <h1>Jujutsu Kaisen</h1>
      <button onClick={shuffelCards}>New Game</button>
      <div className='card-grid'>
        {cards.map ((card) => {
          return (
           <SingleCard key={card.id} card={card} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched} disabled={disabled}/>
          )
        })}

        <p>Turns: {turns}</p>
      </div>
    </div>
  );
}

export default App