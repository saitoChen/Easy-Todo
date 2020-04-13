import React from 'react'
import Style from './footer.module.css'

export default ({info}) => {
  return <div className={Style.footerWrapper}><a className={Style.address} href={info.address}>{info.description}</a></div>
}