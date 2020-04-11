import React from 'react';
import Style from './bar.module.css'
// const { ipcRenderer } = window.require('electron')

export default () => {

  function handleMessage(type){
    // ipcRenderer.send(type)
  }

  return (
    <div className={Style.barWrapper}>
      <div className={Style.lefBar}>
        <span className={Style.title}>Easy-todo</span>
      </div>
      <div className={Style.rightBar}>
        <i className={`iconfont icon-close ${Style['icon-bar']} ${Style['icon-danger']} ${Style['mouse-event']}`} onClick={handleMessage.bind(this, 'close')} />
        <i className={`iconfont icon-shrink ${Style['icon-bar']} ${Style['mouse-event']}`} onClick={handleMessage.bind(this, 'min')} />
        {/* <i className={`iconfont icon-Removefixed ${Style['icon-bar']} ${Style['mouse-event']}`} /> */}
      </div>
    </div>
  )
}