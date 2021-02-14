import React, {useEffect, useState} from 'react';
import styles from './App.module.css';
import {v1} from "uuid";
import {Card} from "./Components/Card/Card";

export type CardType = {
    id: string,
    color: string,
    isFlipped: boolean,
    canFlip: boolean,
}

// Sort function, algorithm by Donald Knut
// return sorting input array
const sortArray = (array: Array<string>) => {
    array.forEach((color, i) => {
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    })
    return array
}


// function for set all card white color
// return all card in white color
// const setWhiteSquare = (card: Array<SquareType>): Array<SquareType> => {
//     return card.map(s => ({...s, color: 'white'}))
// }


// Colors
// This colors use in create card for game
const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'aquamarine',
    'blue',
    'magenta',
    'indigo',
]


// Make double colors
const doubleColors = colors.concat(...colors);

// Sort all colors
// return sorting array colors
sortArray(doubleColors);


// This function create card objects base on input colors
// return array card for render in game
const generateSquares = (colors: Array<string>): Array<CardType> => {
    return colors.map(c => {
        return {
            id: v1(),
            color: c,
            isFlipped: true,
            canFlip: true,
        }
    })
}


const App = () => {

    const [cards, setCards] = useState<Array<CardType>>(generateSquares(doubleColors));
    const [firstCard, setFirstCard] = useState<CardType | null>(null);
    const [secondCard, setSecondCard] = useState<CardType | null>(null);

    useEffect(() => {
        if (!firstCard || !secondCard)
            return;
        (firstCard.color === secondCard.color) ? onSuccessGuess() : onFailureGuess();

    }, [firstCard, secondCard]);


    const setCardIsFlipped = (cardId: string, isFlipped: boolean) => {
        setCards(prev => prev.map(c =>
            c.id !== cardId ? c : {...c, isFlipped}))
    }

    const setCardCanFlip = (cardId: string, canFlip: boolean) => {
        setCards(prev => prev.map(c =>
            c.id !== cardId ? c : {...c, canFlip}))
    }

    const resetFirstAndSecondCards = () => {
        setFirstCard(null);
        setSecondCard(null);
    }

    function onSuccessGuess() {
        if (!firstCard || !secondCard)
            return;

        setCardCanFlip(firstCard.id, false);
        setCardCanFlip(secondCard.id, false);
        setCardIsFlipped(firstCard.id, false);
        setCardIsFlipped(secondCard.id, false);
        resetFirstAndSecondCards();
    }

    function onFailureGuess() {
        if (!firstCard || !secondCard)
            return

        const firstCardID = firstCard.id;
        const secondCardID = secondCard.id;

        setTimeout(() => {
            setCardIsFlipped(firstCardID, true);
        }, 500);
        setTimeout(() => {
            setCardIsFlipped(secondCardID, true);
        }, 500);

        resetFirstAndSecondCards();
    }


    const onCardClick = (card: CardType) => {
        if (!card.canFlip)
            return;

        if ((firstCard && (card.id === firstCard.id)))
            return;

        if (secondCard && (card.id === secondCard.id))
            return;

        setCardIsFlipped(card.id, false);

        (firstCard) ? setSecondCard(card) : setFirstCard(card);
    }

    const resetGame = () => {
        sortArray(doubleColors);
        setCards(generateSquares(doubleColors));
        setFirstCard(null);
        setSecondCard(null);
    }


    return <React.Fragment>
        <div className={styles.title}>Memo game</div>
        <div className={styles.wrapper}>
            {cards.map(card =>
                <Card
                    key={card.id}
                    onClick={() => onCardClick(card)}
                    card={card}
                >{card.color}</Card>)}
        </div>
        <button className={styles.button} onClick={resetGame}>Reset game</button>
    </React.Fragment>
}

export default App;
