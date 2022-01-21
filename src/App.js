import React from 'react';
import {Route, Routes} from "react-router-dom"
import Main from "./page/Main/Main";
import Header from "./page/Header/Header";
import TodoProvider from "./context/TodoCntext";




function App() {
  return (
    <TodoProvider>
      <Header/>
    <Routes>
      <Route path="/" element={<Main/>}/>
    </Routes>
    </TodoProvider>
  );
}

export default App;
