import {configureStore} from "@reduxjs/toolkit";
import {cardsReducer} from "./cardsReducer";


// Here create store, by configureStore from redux-toolkit
export const store = configureStore({
    reducer: cardsReducer,
    middleware: getDefaultSettings => getDefaultSettings(),
})

//Create type object store
export type AppRootStateType = ReturnType<typeof cardsReducer>

//that can make refer to store
// @ts-ignore
window.store = store;