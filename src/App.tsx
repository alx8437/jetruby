import React, {useCallback, useEffect} from 'react';
import styles from './App.module.css';
import {Card} from "./Components/Card/Card";
import {generateCards} from "./Utils/generateCards";
import {
    CardType,
    setCardCanFlip,
    setCardIsFlipped,
    setFirstChoiceCard,
    setMixCards,
    setSecondChoiceCard
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


    // Clear value for first and second choice card
    // Use dispatch method for sent action in reducer
    const resetFirstAndSecondCards = useCallback(() => {
        dispatch(setFirstChoiceCard({card: null}));
        dispatch(setSecondChoiceCard({card: null}));

    }, [dispatch])


    // Sending flipped and can be flipped
    // After value both cards clear
    const onSuccessGuess = useCallback(() => {
        if (!firstChoiceCard || !secondChoiceCard) {
            return;
        }
        dispatch(setCardCanFlip({cardId: firstChoiceCard.id, canFlip: false}));
        dispatch(setCardCanFlip({cardId: secondChoiceCard.id, canFlip: false}));
        dispatch(setCardIsFlipped({cardId: firstChoiceCard.id, isFlipped: false}));
        dispatch(setCardIsFlipped({cardId: secondChoiceCard.id, isFlipped: false}));
        resetFirstAndSecondCards();
    }, [dispatch, firstChoiceCard, secondChoiceCard, resetFirstAndSecondCards])


    // This function run when user guess both cards
    // After value both cards clear
    const onFailureGuess = useCallback(() => {
        if (!firstChoiceCard || !secondChoiceCard) {
            return;
        }
        setTimeout(() => {
            dispatch(setCardIsFlipped({cardId: firstChoiceCard.id, isFlipped: true}))
        }, 500);
        setTimeout(() => {
            dispatch(setCardIsFlipped({cardId: secondChoiceCard.id, isFlipped: true}))
        }, 500);
        resetFirstAndSecondCards();
    }, [dispatch, firstChoiceCard, secondChoiceCard, resetFirstAndSecondCards])


    // This we add firstChoiceCard and secondChoiceCard in dependencies that
    // Check changes and make render after it
    useEffect(() => {
        if (!firstChoiceCard || !secondChoiceCard)
            return;
        (firstChoiceCard.color === secondChoiceCard.color) ? onSuccessGuess() : onFailureGuess();

    }, [firstChoiceCard, secondChoiceCard, onSuccessGuess, onFailureGuess]);


    // This function run when onclick on card
    // Compares value id choice and input card, if true then return
    // Else sent card in firstChoiceCard or secondChoiceCard
    const onCardClick = useCallback((card: CardType) => {
        if (!card.canFlip) {
            return;
        }
        if ((firstChoiceCard && (card.id === firstChoiceCard.id))) {
            return;
        }
        if (secondChoiceCard && (card.id === secondChoiceCard.id)) {
            return;
        }
        dispatch(setCardIsFlipped({cardId: card.id, isFlipped: false}));
        firstChoiceCard ? dispatch(setSecondChoiceCard({card})) : dispatch(setFirstChoiceCard({card}));
    }, [dispatch, firstChoiceCard, secondChoiceCard])


    // This function make reset game
    const resetGame = () => {
        const mixCards = generateCards()
        dispatch(setMixCards({cards: mixCards}))
    }

    return <React.Fragment>
        <div className={styles.title}>Memo game</div>
        <div className={styles.wrapper}>
            {cards.map(card =>
                <Card
                    key={card.id}
                    onClick={onCardClick}
                    card={card}
                >{card.color}</Card>)}
        </div>
        <button className={styles.button} onClick={resetGame}>Reset game</button>
    </React.Fragment>
}

export default App;
