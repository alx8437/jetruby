import React from "react"
import {CardType} from "../../App";
import styles from "./Card.module.css"

type CardPropsType = {
    onClick: (card: CardType) => void,
    card: CardType,
}

export const Card: React.FC<CardPropsType> = ({onClick, card}) => {
    const onCardClick = () => {
        onClick(card)
    }

    const backgroundColor = card.isFlipped ? '' : card.color

    return <div
        onClick={onCardClick}
        className={`${styles.card} + ${backgroundColor}` }
        style={{backgroundColor}}>
        {card.color}
    </div>
}