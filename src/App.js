import React, { useState, useEffect, useRef } from 'react';
import Style from './App.module.css';
import TodoBar from './components/bar/bar'
import TodoHeader from './components/header/header'
import ContentList from './components/content/content'
import TodoFooter from './components/footer/footer'
import picJson from './asserts/image/pic.json'
import {timeCondition} from '../src/utils/moment'
import {notificate} from '../src/utils/notification'
const Store = window.require('electron-store')
const store = new Store()

function App() {
  let storeTodoList = store.get('todoList') || []
  const [todoList, setTodoList] = useState(storeTodoList)

  const bgRef = useRef()
  const contentRef = useRef()
  const picList = picJson.pic
  const currentBg = picList[Math.floor((Math.random()*picList.length))]

  useEffect(() => {
    // render background image
    bgRef.current.classList.add(`${Style[currentBg['name']]}`)

  }, [picList, currentBg])

  useEffect(() => {
    // render init todoList from store
    if (todoList.length > 0) isContentSectionShow(true)
  }, [todoList.length])

  // set store pending todoList
  useEffect(() => {
    console.log(todoList)
    let timer = setInterval(() => {
      let now = new Date()
      let arr = []
      // it's 0：00 o'clock
      if (timeCondition(now)) {
        todoList.forEach((item,index,list) => {
          item.isToday = false
          if (!item.checked) {
            arr.push(item)
          }
        })
        if (arr.length > 0) {
          notificate()
        }
        setTodoList(arr)
        setTodoInStore(arr)
      }
    }, 1000)

    return () => clearInterval(timer)

  }, [todoList])

  function setTodoInStore(todoList){
    store.set('todoList', todoList)
  }

  // add todoList items
  function addTodo(items){
    let arr = [...todoList]
    arr.unshift({value: items, checked: false, isToday: true})
    isContentSectionShow(true)
    setTodoList(arr)
    setTodoInStore(arr)
  }

  // remove todoList items
  function deleteTodo(index){
    let arr = [...todoList]
    arr.splice(index, 1)
    setTodoList(arr)
    setTodoInStore(arr)
    if (arr.length <= 0) {
      isContentSectionShow(false)
    }
  }

  // toggle content show or hide
  function isContentSectionShow (flag) {
    flag ? contentRef.current.classList.add(`${Style['content-show']}`) : contentRef.current.classList.remove(`${Style['content-show']}`)
  }

  function changeState(index, status) {
    let arr = [...todoList]
    arr[index]['checked'] = status
    setTodoList(arr)
    setTodoInStore(arr)
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
        <ContentList changeState={changeState} deleteTodo={deleteTodo} list={ todoList } />
      </div>
      <footer className={ Style.footer }><TodoFooter info={currentBg} /></footer>
    </div>
  );
}

export default App;
