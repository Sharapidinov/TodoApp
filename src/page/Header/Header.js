import React from 'react';
import {TodoContext} from "../../context/TodoCntext";
import {useContext} from "react"

const Header = () => {
    const {todos} = useContext(TodoContext)
    return (
        <div className="bg-gray-800 text-white flex justify-around px-5 items-center py-3">
            <div>TodoApp</div>
            <div>Total todos: ({todos.length})</div>
        </div>
    );
};

export default Header;