import {createStore} from "redux";
import {cardsReducer} from "./cardsReducer";


// Here create store
export const store = createStore(cardsReducer);

//Create type object store
export type AppRootStateType = ReturnType<typeof cardsReducer>

//that can make refer to store
// @ts-ignore
window.store = store;