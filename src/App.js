import React, { useState, useEffect, useRef } from 'react';
import Style from './App.module.css';
import TodoBar from './components/bar/bar'
import TodoHeader from './components/header/header'
import ContentList from './components/content/content'
import TodoFooter from './components/footer/footer'
import picJson from './asserts/image/pic.json'

function App() {
  const [todoList, setTodoList] = useState([])
  const bgRef = useRef()
  const contentRef = useRef()
  const picList = picJson.pic
  const currentBg = picList[0]

  useEffect(() => {

    // add background image
    bgRef.current.classList.add(`${Style[currentBg['name']]}`)

  }, [picList, currentBg])

  // add todoList items
  function addTodo(items){
    let arr = [...todoList]
    arr.unshift({value: items, checked: false})
    contentRef.current.classList.add(`${Style['content-show']}`)
    setTodoList(arr)
  }

  function deleteTodo(index){
    let arr = [...todoList]
    arr.splice(index, 1)
    setTodoList(arr)
    if (arr.length <= 0) {
      contentRef.current.classList.remove(`${Style['content-show']}`)
    }
  }

  return (
    <div ref={bgRef} id="app" className={ `${Style.App} ${Style.bg}` }>
      <div className={Style.bar}>
        <TodoBar />
      </div>
      <header className={ Style.header }>
        <TodoHeader addTodo={ addTodo } />
      </header>
      <div ref={ contentRef } className={ Style.content }>
        <ContentList deleteTodo={deleteTodo} list={ todoList } />
      </div>
      <footer className={ Style.footer }><TodoFooter info={currentBg} /></footer>
    </div>
  );
}

export default App;
