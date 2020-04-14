import React from 'react';
import Style from './bar.module.css'
import logo from "../../asserts/image/logo64.png"
const { ipcRenderer } = window.require('electron')

export default () => {

  function handleMessage(type){
    ipcRenderer.send(type)
  }

  return (
    <div className={Style.barWrapper}>
      <div className={Style.lefBar}>
        <img className={Style.barLogo} src={logo} alt="logo" />
        <span className={Style.title}>Easy-todo</span>
      </div>
      <div className={Style.rightBar}>
        <div className={Style.closeWrapper} onClick={handleMessage.bind(this, 'close')}>
          <i className={`iconfont icon-close ${Style['icon-bar']} ${Style['icon-danger']} ${Style['mouse-event']}`} />
        </div>
        <div className={Style.minWrapper} onClick={handleMessage.bind(this, 'min')}>
          <i className={`iconfont icon-shrink ${Style['icon-bar']} ${Style['mouse-event']}`} />
        </div>
      </div>
    </div>
  )
}