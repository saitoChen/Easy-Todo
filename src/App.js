import React, { useState, useEffect, useRef } from 'react';
import Style from './App.module.css';
import TodoBar from './components/bar/bar'
import TodoHeader from './components/header/header'
import ContentList from './components/content/content'
import TodoFooter from './components/footer/footer'
import picJson from './asserts/image/pic.json'
import {timeCondition, getNowDate} from '../src/utils/moment'
import {notificate} from '../src/utils/notification'
const Store = window.require('electron-store')
const store = new Store()

const picList = picJson.pic
const currentBg = picList[Math.floor((Math.random()*picList.length))]

function App() {
  const storeTodoList = store.get('todoList') || []
  const lastTime = store.get('lastTime') || getNowDate()
  const [todoList, setTodoList] = useState(storeTodoList)

  const bgRef = useRef()
  const contentRef = useRef()

  const currentTime = getNowDate()

  deleteUncheckedList()

  useEffect(() => {
    // render background image
    bgRef.current.classList.add(`${Style[currentBg['name']]}`)

  }, [])

  useEffect(() => {
    // render init todoList from store
    if (todoList.length > 0) isContentSectionShow(true)
  }, [todoList.length])

  // set store pending todoList
  useEffect(() => {
    let timer = setInterval(() => {
      let now = new Date()
      // it's 0：00 o'clock
      if (timeCondition(now)) {
        let arr = []
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

  function storeTimeIsToday(){
    return lastTime.year === currentTime.year && lastTime.month === currentTime.month && lastTime.day === currentTime.day
  }

  function setTodoInStore(todoList){
    store.set('todoList', todoList)
  }

  function deleteUncheckedList(){
    if (!storeTimeIsToday()) {
      let arr = []
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
      store.set('lastTime', currentTime)
    }
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
