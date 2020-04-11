import React from 'react';
import Style from './header.module.css'
import moment from '../../utils/moment'
import AddTodo from '../base/addTodo'

export default function(props){
  const title = `我的一天`

  return (
    <div className={Style.headerWrapper}>
      <div className={Style.title}>{ title }</div>
      <div className={Style.time}>{ moment() }</div>
      <div className={Style.baseTodoWrapper}>
        <AddTodo addTodo={ props.addTodo } />
      </div>
    </div>
  )
}