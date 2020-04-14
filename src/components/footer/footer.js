import React from 'react'
import Style from './footer.module.css'
const {shell} = window.require('electron').remote

export default ({info}) => {
  
  function toAddress(){
    shell.openExternal(info.address)
  }

  return <div className={Style.footerWrapper}><span className={Style.address} onClick={toAddress}>{info.description}</span></div>
}