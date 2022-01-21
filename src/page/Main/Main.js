import React, {useContext, useState, useRef} from 'react';
import {actionTypes} from "../../context/TodoCntext"
import {TodoContext} from "../../context/TodoCntext";
import TodoItem from "../../component/TodoItem";
import Button from "../../component/Button";

const Main = () => {
    const [todoText, setTodoText] = useState("")
    const {todos, dispatch} = useContext(TodoContext)
    const [category, setCategory] = useState("")
    const [current, setCurrent] = useState("All")
    const [sort, setSort] = useState(false)
    const inputRef = useRef(null)


    const addTodo = () => {
        setTodoText("")
            dispatch({type: actionTypes.ADD_TODO, text: todoText, sort, category: category})
    }

    const deleteAll = () => {
        const conf = window.confirm("Действитльно ли вы хотите удалить,")
        if(conf){
            dispatch({type: actionTypes.DELETE_ALL})
        }
    }

    window.onkeydown = del
   function del(e)  {
        e.stopPropagation()
       if(e.key === "Delete"){
           const conf = window.confirm("Действитльно ли вы хотите удалить,")
           if(conf){
               dispatch({type: actionTypes.DELETE_ALL})
           }
       }
    }

    const addTodoInp = (e) => {
        if(e.key === "Enter"){
            addTodo()
        }
        if(e.key === "Escape"){
            inputRef.current.blur()
            setTodoText("")
        }
    }

    const sortToggle = () => {
        dispatch({type: actionTypes.SORT_TODO, sort})
        setSort(!sort)
    }

    return (
        <div className="todos border-2 border-gray-300 bg-gray-100 ">
            <div className="bg-gray-300 grid grid-cols-3 px-6 text-center font-semibold py-2">
                <div className="flex">
                    <Button onClick={()=>sortToggle()} color={"blue"} text={sort ?  <>Sort &#9650;</> : <>Sort &#9660;</>}/>
                    <select defaultValue="All" onChange={(e) => setCurrent(e.target.value)}>
                        <option value="All">All</option>
                        {
                            todos.map(it => it.category)
                                .filter((it, ind, arr) => arr.indexOf(it) === ind)
                                .map(it => <option value={it}>{it}</option>)
                        }
                    </select>
                </div>


                <div className="text-center">Todos ({todos.length})</div>
                <div className="text-right" >
                    { !!todos.length && <Button onClick={() => deleteAll()} color={"red"} text={"Delete All"}/>}
                </div>
            </div>
            <div className="flex px-6">
                <input
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-36 text-center py-2 px-4 border-2 border-gray-200 my-2 rounded-l-md"
                    type="text"
                    list="categories-list"
                    placeholder="Categories"
                />

                <datalist id="categories-list">
                    <option value="purchases">purchases</option>
                    <option value="debts">debts</option>
                    <option value="todo">todo</option>
                    <option value="meetings">meetings</option>
                    <option value="Other">Other</option>
                </datalist>
                <input ref={inputRef} onKeyDown={(e) => addTodoInp(e)} value={todoText} onChange={(e) => setTodoText(e.target.value.trim())}
                       className="w-full text-center py-2 px-4 border-2 border-gray-200 my-2 " type="text"/>
                <button onClick={addTodo} className="px-6 bg-blue-300 my-2 rounded-r-md">ADD</button>
            </div>
            <div className="px-6 py-2">
                {todos.filter(it => it.category === current || current === "All").map(it => {
                    return (
                        <TodoItem key={it.id} it={it}/>
                    )
                })}
            </div>
        </div>
    );
};

export default Main;