import {generateCards} from "../Utils/generateCards";
import {
    cardsReducer,
    CardsStateType,
    CardType,
    setCardCanFlip,
    setCardIsFlipped,
    setFirstChoiceCard, setMixCards, setSecondChoiceCard
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

    const action = setCardCanFlip({cardId: startState.cards[0].id, canFlip: false});
    const endState = cardsReducer(startState, action);

    expect(endState.cards[0].canFlip).toBeFalsy();
})

test('changed card is flipped', () => {

    const action = setCardIsFlipped({cardId: startState.cards[0].id, isFlipped: false});
    const endState = cardsReducer(startState, action);

    expect(endState.cards[0].isFlipped).toBeFalsy();
})

test('set first choice card', () => {

    const action = setFirstChoiceCard({card});
    const endState = cardsReducer(startState, action);

    expect(endState.firstChoiceCard).toEqual(card);
    expect(endState.firstChoiceCard?.id).toBeDefined();
})

test('set second choice card', () => {

    const action = setSecondChoiceCard({card});
    const endState = cardsReducer(startState, action);

    expect(endState.secondChoiceCard).toBe(card);
    expect(endState.secondChoiceCard?.id).toBeDefined();
})

test('reset game by mixing cards', () => {

    const newCardsMix = generateCards();
    const action = setMixCards({cards: newCardsMix});
    const endState = cardsReducer(startState, action);

    expect(endState.cards).toEqual(newCardsMix);
    expect(startState.cards === endState.cards).toBeFalsy();
})
