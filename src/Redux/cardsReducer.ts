import {generateCards} from "../Utils/generateCards";

//CONST for action types
enum ACTION_TYPES_CARDS {
    SET_MIX_CARDS = 'APP/SET_MIX_CARDS',
    SET_CARDS_IS_FLIPPED = 'APP/SET_CARD_IS_FLIPPED',
    SET_CARD_CAN_FLIP = 'APP/SET_CARD_CAN_FLIP',
    SET_FIRST_CHOICE_CARD = 'APP/SET_FIRST_CHOICE_CARD',
    SET_SECOND_CHOICE_CARD = 'APP/SET_SECOND_CHOICE_CARD',
}

//Type for card
export type CardType = {
    id: string,
    color: string,
    isFlipped: boolean,
    canFlip: boolean,
}

//State type
type CardsStateType = {
    cards: Array<CardType>,
    firstChoiceCard:  CardType | null,
    secondChoiceCard: CardType | null,

}

//Action creator types
type SetCardIsFlippedActionType = {
    type: ACTION_TYPES_CARDS.SET_CARDS_IS_FLIPPED,
    cardId: string,
    isFlipped: boolean,
}

type SetCardCanFlipActionType = {
    type: ACTION_TYPES_CARDS.SET_CARD_CAN_FLIP,
    cardId: string,
    canFlip: boolean,
}

type SetFirstChoiceCardActionType = {
    type: ACTION_TYPES_CARDS.SET_FIRST_CHOICE_CARD,
    card:  CardType | null,
}

type SetSecondChoiceCardActionType = {
    type: ACTION_TYPES_CARDS.SET_SECOND_CHOICE_CARD,
    card: CardType | null,
}

type SetMixCardsActionType = {
    type: ACTION_TYPES_CARDS.SET_MIX_CARDS,
    cards: Array<CardType>,
}

type AllActionsTypes = SetCardIsFlippedActionType | SetCardCanFlipActionType | SetSecondChoiceCardActionType
    | SetFirstChoiceCardActionType | SetMixCardsActionType


//initial state, is used how default value in reducer parameter
const initialState: CardsStateType = {
    cards: generateCards(),
    firstChoiceCard: null,
    secondChoiceCard: null,
};

//Reducer
export const cardsReducer = (state: CardsStateType = initialState, action: AllActionsTypes): CardsStateType => {
    switch (action.type) {
        case ACTION_TYPES_CARDS.SET_CARD_CAN_FLIP:
            return {
                ...state,
                cards: state.cards.map(c => c.id === action.cardId ? {...c, canFlip: action.canFlip} : c)
            }
        case ACTION_TYPES_CARDS.SET_CARDS_IS_FLIPPED:
            return {
                ...state,
                cards: state.cards.map(c => c.id === action.cardId ? {...c, isFlipped: action.isFlipped} : c)
            }
        case ACTION_TYPES_CARDS.SET_FIRST_CHOICE_CARD:
            return {
                ...state,
                firstChoiceCard: action.card,
            }
        case ACTION_TYPES_CARDS.SET_SECOND_CHOICE_CARD:
            return {
                ...state,
                secondChoiceCard: action.card,
            }
        case ACTION_TYPES_CARDS.SET_MIX_CARDS:
            return {
                ...state,
                cards: action.cards,
            }
        default:
            return state

    }
}


//ActionCreators
export const setCardIsFlippedAC = (cardId: string, isFlipped: boolean): SetCardIsFlippedActionType => {
    return {
        type: ACTION_TYPES_CARDS.SET_CARDS_IS_FLIPPED,
        cardId,
        isFlipped,
    }
}

export const setCardCanFlipAC = (cardId: string, canFlip: boolean): SetCardCanFlipActionType => {
    return {
        type: ACTION_TYPES_CARDS.SET_CARD_CAN_FLIP,
        cardId,
        canFlip,
    }
}

export const setFirstChoiceCardAC = (card: CardType | null): SetFirstChoiceCardActionType => {
    return {
        type: ACTION_TYPES_CARDS.SET_FIRST_CHOICE_CARD,
        card,
    }
}

export const SetSecondChoiceCardAC = (card: CardType | null): SetSecondChoiceCardActionType => {
    return {
        type: ACTION_TYPES_CARDS.SET_SECOND_CHOICE_CARD,
        card,
    }
}

export const setMixCardsAC = (cards: Array<CardType>): SetMixCardsActionType => {
    return {
        type: ACTION_TYPES_CARDS.SET_MIX_CARDS,
        cards,
    }
}



