import {generateCards} from "../Utils/generateCards";

export type CardType = {
    id: string,
    color: string,
    isFlipped: boolean,
    canFlip: boolean,
}

type CardsStateType = Array<CardType>

const colorsForCards = [
    'red',
    'orange',
    'yellow',
    'green',
    'aquamarine',
    'blue',
    'magenta',
    'indigo',
]


const initialState: CardsStateType = generateCards(colorsForCards);

export const cardsReducer = (state: CardsStateType = initialState, action: any): CardsStateType => {
    return state
}