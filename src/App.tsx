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
    const [canFlip, setCanFlip] = useState(false);
    const [firstCard, setFirstCard] = useState<CardType | null>(null);
    const [secondCard, setSecondCard] = useState<CardType | null>(null);

    function setCardIsFlipped(cardId: string, isFlipped: boolean) {
        setCards(prev => prev.map(c =>
            c.id !== cardId ? c : {...c, isFlipped}))
    }

    function setCardCanFlip(cardId: string, canFlip: boolean) {
        setCards(prev => prev.map(c =>
            c.id !== cardId ? c : {...c, canFlip}))
    }

    // showcase
    useEffect(() => {
        setTimeout(() => {
            let index = 0;
            for (const card of cards) {
                setTimeout(() => setCardIsFlipped(card.id, true), index++ * 100);
            }
            setTimeout(() => setCanFlip(true), cards.length * 100);
        }, 90);
    }, []);

    function resetFirstAndSecondCards() {
        setFirstCard(null);
        setSecondCard(null);
        console.log(firstCard, secondCard)
    }

    function onSuccessGuess() {
        // @ts-ignore
        setCardCanFlip(firstCard.id, false);
        // @ts-ignore
        setCardCanFlip(secondCard.id, false);
        // @ts-ignore
        setCardIsFlipped(firstCard.id, false);
        // @ts-ignore
        setCardIsFlipped(secondCard.id, false);
        resetFirstAndSecondCards();
    }

    function onFailureGuess() {
        // @ts-ignore
        const firstCardID = firstCard.id;
        // @ts-ignore
        const secondCardID = secondCard.id;

        setTimeout(() => {
            setCardIsFlipped(firstCardID, true);
        }, 100);
        setTimeout(() => {
            setCardIsFlipped(secondCardID, true);
        }, 120);

        resetFirstAndSecondCards();
    }

    useEffect(() => {
        if (!firstCard || !secondCard)
            return;
        // @ts-ignore
        (firstCard.color === secondCard.color) ? onSuccessGuess() : onFailureGuess();
    }, [firstCard, secondCard]);

    function onCardClick(card: CardType) {
        if (!canFlip)
            return;
        if (!card.canFlip)
            return;

        if ((firstCard && (card.id === firstCard.id) || (secondCard && (card.id === secondCard.id))))

            return;

        setCardIsFlipped(card.id, false);

        (firstCard) ? setSecondCard(card) : setFirstCard(card);
    }


    return (
        <div className={styles.wrapper}>

{/*
            {cards.map(card =>
                <div
                    style={{backgroundColor: card.isFlipped ? '' : card.color}}
                    key={card.id}
                    onClick={() => onCardClick(card)}
                >{card.color}</div>)}
*/}

            {cards.map(card =>
                <Card
                    key={card.id}
                    onClick={() => onCardClick(card)}
                    card={card}
                >{card.color}</Card>)}

        </div>
    );
}

export default App;
