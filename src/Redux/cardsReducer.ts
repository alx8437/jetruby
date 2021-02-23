import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {generateCards} from "../Utils/generateCards";

//Type for card
export type CardType = {
    id: string,
    color: string,
    isFlipped: boolean,
    canFlip: boolean,
}

//State type
export type CardsStateType = {
    cards: Array<CardType>,
    firstChoiceCard: CardType | null,
    secondChoiceCard: CardType | null,

}


//initial state, is used how default value in reducer parameter
const initialState: CardsStateType = {
    cards: generateCards(),
    firstChoiceCard: null,
    secondChoiceCard: null,
};

// use feature redux-toolkit, that minimal boiler code
// immerJs into redux toolkit allows you to work with immutable state in a more convenient way
const slice = createSlice({
    name: "card",
    initialState,
    reducers: {
        setCardIsFlipped(state, action: PayloadAction<{ cardId: string, isFlipped: boolean }>) {
            const index = state.cards.findIndex(c => c.id === action.payload.cardId);
            if (index > -1) {
                state.cards[index].isFlipped = action.payload.isFlipped
            }
        },
        setCardCanFlip(state, action: PayloadAction<{ cardId: string, canFlip: boolean }>) {
            const index = state.cards.findIndex(c => c.id === action.payload.cardId)
            if (index > -1) {
                state.cards[index].canFlip = action.payload.canFlip
            }
        },
        setFirstChoiceCard(state, action: PayloadAction<{card: CardType | null}>) {
            debugger
            state.firstChoiceCard = action.payload.card
        },
        setSecondChoiceCard(state, action: PayloadAction<{card: CardType | null}>) {
            debugger
            state.secondChoiceCard = action.payload.card
        },
        setMixCards(state, action: PayloadAction<{cards: Array<CardType>}>) {
            state.cards = action.payload.cards
        }
    }
})

export const {
    setCardIsFlipped,
    setCardCanFlip,
    setFirstChoiceCard,
    setSecondChoiceCard,
    setMixCards
} = slice.actions;

//Reducer
export const cardsReducer = slice.reducer;


