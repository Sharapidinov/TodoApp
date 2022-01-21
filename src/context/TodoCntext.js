import React, {createContext, useReducer} from 'react';
import {nanoid} from "nanoid";


export  const TodoContext = createContext()

export const actionTypes = {
    ADD_TODO:"ADD_TODO",
    DELETE_TODO:"DELETE_TODO",
    EDIT_TODO: "EDIT_TODO",
    CHECK_TODO:"CHECK_TODO",
    DELETE_ALL: "DELETE_ALL",
    SORT_TODO: 'SORT_TODO'
}



const reducer = (state, action) => {
    let newState


    switch (action.type) {

        case actionTypes.ADD_TODO:
            if(!action.text.trim()) return state
            const newTodo = {
                id:nanoid(),
                isDone: false ,
                category: action.category.trim() || "Other",
                text:action.text,
                createdAt: Date.now()
            }
           newState = action.sort ? [...state, newTodo] : [newTodo, ...state]
            localStorage.setItem("todos", JSON.stringify(newState))
            return newState

        case actionTypes.DELETE_TODO:
            newState = state.filter(it => it.id !== action.id)
            localStorage.setItem("todos", JSON.stringify(newState))
            return newState

        case  actionTypes.EDIT_TODO:
            newState = state.map(it => (
                it.id === action.id ? {...it, text: action.text }: it
            ))
            localStorage.setItem("todos", JSON.stringify(newState))
            return  newState

        case actionTypes.CHECK_TODO:
            newState = state.map(it => (
                it.id === action.id ? {...it, isDone: action.isDone }: it
            ))
            localStorage.setItem("todos", JSON.stringify(newState))
            return newState
        case actionTypes.DELETE_ALL:
            newState = state.filter(it => it.id === action.id)
            localStorage.removeItem("todos")
            return newState

        case actionTypes.SORT_TODO:
            newState = [...state].sort( (a,b) => {
              return  action.sort? a.createdAt - b.createdAt : b.createdAt - a.createdAt
            })
            localStorage.setItem("todos", JSON.stringify(newState))
            return newState

        default: return state
    }

}

const initialState = JSON.parse(localStorage.getItem("todos")) || []

const TodoProvider = ({children}) => {

    const [todos, dispatch] = useReducer(reducer, initialState)
    return (
        <TodoContext.Provider value={{todos, dispatch}}>
            {children}
        </TodoContext.Provider>
    );
};

export default TodoProvider;