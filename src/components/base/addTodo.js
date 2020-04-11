import React, {useState, useRef} from 'react';
import Style from './addTodo.module.css'

export default function(props){

  const [curValue, setValue] = useState('')
  const inputRef = useRef()
  
  function btnAddTodo(){
    if (curValue) {
      props.addTodo(curValue)
      inputRef.current.value = ''
    }
  }

  function keyBoardAddTodo(e){
    let isKeyEnter = e.keyCode === 13
    if (isKeyEnter) {
      btnAddTodo()
    }
  }

  return (
    <div className={Style.todoWrapper}>
      <div className={Style.todoController}>
        <input onKeyUp={keyBoardAddTodo} ref={inputRef} placeholder="添加新的待办列表" onChange={ e => setValue(e.target.value)} className={`${Style.todoInputComponent} ${Style.clearInputDefault}`} type="text" />
        <i onClick={ btnAddTodo } className={`iconfont icon-add ${Style.add}`} />
      </div>
    </div>

  )

}