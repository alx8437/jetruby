import React from "react"
import styles from "./Card.module.css"
import {CardType} from "../../Redux/cardsReducer";

type CardPropsType = {
    onClick: (card: CardType) => void,
    card: CardType,
}

export const Card: React.FC<CardPropsType> = ({onClick, card}) => {

    //Sent onClick callback
    const onCardClick = () => {
        onClick(card)
    }

    //Set color if card not flipped
    const backgroundColor = card.isFlipped ? '' : card.color

    return <div
        onClick={onCardClick}
        className={`${styles.card} + ${backgroundColor}` }
        style={{backgroundColor}}>
    </div>
}