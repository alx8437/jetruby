import React, {useEffect, useState} from 'react';
import styles from './App.module.css';
import {Card} from "./Components/Card/Card";
import {generateCards, sortArray} from "./Utils/generateCards";
import {CardType} from "./Redux/cardsReducer";











// Colors
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


// This colors use in create card for game







const App = () => {

    const [cards, setCards] = useState<Array<CardType>>(generateCards(colors));
    const [firstCard, setFirstCard] = useState<CardType | null>(null);
    const [secondCard, setSecondCard] = useState<CardType | null>(null);

//This we add firstCard and secondCard in dependencies that
//check changes and make render after it
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

    const onSuccessGuess = () => {
        if (!firstCard || !secondCard)
            return;
        setCardCanFlip(firstCard.id, false);
        setCardCanFlip(secondCard.id, false);
        setCardIsFlipped(firstCard.id, false);
        setCardIsFlipped(secondCard.id, false);
        resetFirstAndSecondCards();
    }

    const onFailureGuess = () => {
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
        sortArray(colors);
        setCards(generateCards(colors));
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
