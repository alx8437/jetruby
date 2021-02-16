import {generateCards} from "../Utils/generateCards";
import {
    cardsReducer,
    CardsStateType,
    CardType,
    setCardCanFlipAC,
    setCardIsFlippedAC,
    setFirstChoiceCardAC, setMixCardsAC, SetSecondChoiceCardAC
} from "./cardsReducer";

let startState: CardsStateType = {
    cards: generateCards(),
    firstChoiceCard: null,
    secondChoiceCard: null,
}

const card: CardType = {
    id: '0',
    color: 'green',
    isFlipped: true,
    canFlip: true,
}

beforeEach(() => {
    startState = {...startState, cards: generateCards()}
})

test('card is maybe flip', () => {

    const action = setCardCanFlipAC(startState.cards[0].id, false);
    const endState = cardsReducer(startState, action);

    expect(endState.cards[0].canFlip).toBeFalsy();
})

test('changed card is flipped', () => {

    const action = setCardIsFlippedAC(startState.cards[0].id, false);
    const endState = cardsReducer(startState, action);

    expect(endState.cards[0].isFlipped).toBeFalsy();
})

test('set first choice card', () => {

    const action = setFirstChoiceCardAC(card);
    const endState = cardsReducer(startState, action);

    expect(endState.firstChoiceCard).toEqual(card);
    expect(endState.firstChoiceCard?.id).toBeDefined();
})

test('set second choice card', () => {

    const action = SetSecondChoiceCardAC(card);
    const endState = cardsReducer(startState, action);

    expect(endState.secondChoiceCard).toEqual(card);
    expect(endState.secondChoiceCard?.id).toBeDefined();
})

test('reset game by mixing cards', () => {

    const newCardMix = generateCards();
    const action = setMixCardsAC(newCardMix);
    const endState = cardsReducer(startState, action);

    expect(endState.cards).toEqual(newCardMix);
    expect(startState.cards === endState.cards).toBeFalsy();
})
