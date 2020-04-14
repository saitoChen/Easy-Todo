import React from 'react';
import Style from './content.module.css'
import { Scrollbars } from 'react-custom-scrollbars';
import Tick from '../base/tick'

export default (props) => {

  // change todoList checked status
  function changeState(index){
    return function(checkedState){
      document.querySelector(`#todoItems-${index}`).classList.add(`${Style['line']}`)
      props.changeState(index, checkedState)
    }
  }

  function mouseover(index){
    let curItems = document.querySelector(`#delete-${index}`)
    let backUpitems = document.querySelector(`#backUp-${index}`)
    if (props.list[index]['checked']) {
      curItems.style.display = 'none'
      backUpitems.style.display = 'block'
    } else {
      curItems.style.display = 'block'
      backUpitems.style.display = 'none'
    }
  }

  function mouseout(index) {
    let curItems = document.querySelector(`#delete-${index}`)
    let backUpitems = document.querySelector(`#backUp-${index}`)
    curItems.style.display = 'none'
    backUpitems.style.display = 'none'
  }


  function deleteItems(index) {
    props.deleteTodo(index)
  }

  function backSpaceItems(index) {
    props.list[index]['checked'] = false
    document.querySelector(`#todoItems-${index}`).classList.remove(`${Style['line']}`)
    props.changeState(index, false)
  }

  const listDom = props.list.map((item, index) => {
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
          <i id={`backUp-${index}`} className={`iconfont icon-backup ${Style.iconBackUp}`} onClick={backSpaceItems.bind(this, index)} />
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