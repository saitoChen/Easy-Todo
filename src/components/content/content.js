import React, {useState, useEffect} from 'react';
import Style from './content.module.css'
import { Scrollbars } from 'react-custom-scrollbars';
import Tick from '../base/tick'

export default (props) => {

  const [todoList, setTodoList] = useState(props.list)
  useEffect(() => {
    setTodoList(props.list)
  }, [props.list])

  function changeState(index){
    return function(checkedState){
      todoList[index]['checked'] = checkedState
      document.querySelector(`#todoItems-${index}`).classList.add(`${Style['line']}`)
      props.changeState(index, checkedState)
    }
  }

  function mouseover(index){
    let curItems = document.querySelector(`#delete-${index}`)
    curItems.style.display = 'block'
  }

  function mouseout(index) {
    let curItems = document.querySelector(`#delete-${index}`)
    curItems.style.display = 'none'
  }


  function deleteItems(index) {
    props.deleteTodo(index)
  }


  const listDom = todoList.map((item, index) => {
    return (
      <li key={index} className={Style.listItemWrapper} onMouseOver={ mouseover.bind(this, index) } onMouseOut={ mouseout.bind(this, index) }>
        <div className={Style.tickWrapper}>
          <Tick changeState={changeState(index)} checked={item.checked} key={index} />
        </div>
        <div id={`todoItems-${index}`} className={`${Style.listItem} ${item['checked'] ? Style['line'] : '' }`}>
          <div className={Style.listText}>{item.value}</div>
        </div>
        <div className={`${Style.listDelete}`}>
          <i id={`delete-${index}`} className={`iconfont icon-cc-delete ${Style.iconDelete}`} onClick={deleteItems.bind(this, index)} />
        </div>
      </li>
    )
  })

  return (
    <div className={Style.contentWrapper}>
      <div className={Style.listWrapper}>
        <ul className={Style.list}>
          <Scrollbars autoHide autoHideTimeout={1000}>
            {listDom}
          </Scrollbars>
        </ul>
      </div>
    </div>
  )
}