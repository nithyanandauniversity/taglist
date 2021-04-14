import React, { createContext, useReducer } from "react";
import Reducer from './Reducer'


const initialState = {
    selectedTag: null,
    currentImage: null,
    currentImageTags: null,
    taggedImages: null,
    tagList: null,
    searchResult: null,
    suggestions: null,
    images: null,
    tags: null,
    isLoading: true
}


const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;