import React, {useEffect} from 'react';
import styles from './App.module.css';
import {Card} from "./Components/Card/Card";
import {generateCards, sortArray} from "./Utils/generateCards";
import {
    CardType,
    setCardCanFlipAC,
    setCardIsFlippedAC,
    setFirstChoiceCardAC,
    setMixCardsAC,
    SetSecondChoiceCardAC
} from "./Redux/cardsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Redux/store";


const App = () => {

    // Get parts of state
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards);
    const firstChoiceCard = useSelector<AppRootStateType, CardType | null>(state => state.firstChoiceCard)
    const secondChoiceCard = useSelector<AppRootStateType, CardType | null>(state => state.secondChoiceCard)

    // Dispatch method
    const dispatch = useDispatch();

    // This we add firstChoiceCard and secondChoiceCard in dependencies that
    // Check changes and make render after it
    useEffect(() => {
        console.log(cards)
        console.log(firstChoiceCard)
        console.log(secondChoiceCard)
        if (!firstChoiceCard || !secondChoiceCard)
            return;
        (firstChoiceCard.color === secondChoiceCard.color) ? onSuccessGuess() : onFailureGuess();

    }, [firstChoiceCard, secondChoiceCard]);

    // Clear value for first and second choice card
    // Use dispatch method for sent action in reducer
    const resetFirstAndSecondCards = () => {
        dispatch(setFirstChoiceCardAC(null));
        dispatch(SetSecondChoiceCardAC(null));

    }

    // Sending flipped and can be flipped
    // After value both cards clear
    const onSuccessGuess = () => {
        if (!firstChoiceCard || !secondChoiceCard) {
            return;
        }
        dispatch(setCardCanFlipAC(firstChoiceCard.id, false));
        dispatch(setCardCanFlipAC(secondChoiceCard.id, false));
        dispatch(setCardIsFlippedAC(firstChoiceCard.id, false));
        dispatch(setCardIsFlippedAC(secondChoiceCard.id, false));
        resetFirstAndSecondCards();
    }

    // This function run when user guess both cards
    // After value both cards clear
    const onFailureGuess = () => {
        if (!firstChoiceCard || !secondChoiceCard) {
            return;
        }
        setTimeout(() => {
            // setCardIsFlipped(firstChoiceCard.id, true);
            dispatch(setCardIsFlippedAC(firstChoiceCard.id, true))
        }, 500);
        setTimeout(() => {
            // setCardIsFlipped(secondChoiceCard.id, true);
            dispatch(setCardIsFlippedAC(secondChoiceCard.id, true))
        }, 500);
        resetFirstAndSecondCards();
    }

    // This function run when onclick on card
    // Compares value id choice and input card, if true then return
    // Else sent card in firstChoiceCard or secondChoiceCard
    const onCardClick = (card: CardType) => {
        if (!card.canFlip) {
            return;
        }
        if ((firstChoiceCard && (card.id === firstChoiceCard.id))) {
            return;
        }
        if (secondChoiceCard && (card.id === secondChoiceCard.id)) {
            return;
        }
        dispatch(setCardIsFlippedAC(card.id, false));
        firstChoiceCard ? dispatch(SetSecondChoiceCardAC(card)) : dispatch(setFirstChoiceCardAC(card));
    }

    // This function make reset game
    const resetGame = () => {
        const mixCards = generateCards()
        dispatch(setMixCardsAC(mixCards))
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
