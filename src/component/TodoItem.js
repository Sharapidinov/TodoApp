import React, {useContext, useState} from 'react';
import Button from "./Button";
import {actionTypes, TodoContext} from "../context/TodoCntext";


const TodoItem = ({it}) => {
    const [isEdit, setIsEdit] = useState(false)
    const [todoText, setTodoText] = useState(it.text)
    const {dispatch} = useContext(TodoContext)


    const SaveTodo = () => {
        setIsEdit(false)
        dispatch({type: actionTypes.EDIT_TODO, id: it.id, text: todoText})
    }

    const saveInp = (e) => {
        if (e.key === "Enter") {
            SaveTodo()
        }
    }

    return (
        <div key={it.id} className="py-3 items-center flex justify-between px-6 text-center todo-row rounded-md">
            <input className="mr-3" checked={it.isDone}
                   onChange={(e) => dispatch({type: actionTypes.CHECK_TODO, isDone: e.target.checked, id: it.id})}
                   type="checkbox"/>
            <div className="flex-grow">
                {
                    isEdit
                        ? <input autoFocus className="text-center" onKeyDown={(e) => saveInp(e)} value={todoText}
                                 onChange={(e) => setTodoText(e.target.value)} type="text"/>
                        : <span className="todo-text">{it.text}</span>
                }
            </div>
            <div>
                {
                    isEdit
                        ? <Button className="bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600" text={"Save"} color={"yellow"} onClick={SaveTodo}/>
                        : <Button className="bg-green-400 hover:bg-green-500 active:bg-green-600" text={"Edit"} color={"green"} onClick={() => setIsEdit(true)}/>

                }
                <Button className="bg-red-400 hover:bg-red-500 active:bg-red-600" text={"Delete"} color={"red"}
                        onClick={() => dispatch({type: actionTypes.DELETE_TODO, id: it.id})}/>

            </div>

        </div>
    );
};

export default TodoItem;