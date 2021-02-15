import {v1} from "uuid";
import {CardType} from "../Redux/cardsReducer";

// Make double colors
// return double input array
export const doubleArray = (array: Array<string>) => {
    return  array.concat(...array);
}

// Sort function, algorithm by Donald Knut
// return sorting input array
export const sortArray = (array: Array<string>) => {
    array.forEach((color, i) => {
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    })
    return array
}

// This function create card objects base on input colors
// return array card for render in game
export const generateCards = (colors: Array<string>): Array<CardType> => {
    const doubleColors = doubleArray(colors);
    const sortColors = sortArray(doubleColors);
        return sortColors.map(c => {
        return {
            id: v1(),
            color: c,
            isFlipped: true,
            canFlip: true,
        }
    })
}