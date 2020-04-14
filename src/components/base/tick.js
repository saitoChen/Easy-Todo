import React, {useRef} from 'react';
import Style from './tick.module.css'

export default ( {checked, changeState, index} ) => {

  const circleRef = useRef()
  const tickRef = useRef()


  function animate() {
    if (!checked) {
      circleRef.current.classList.add(`${Style['on-circle']}`)
      tickRef.current.classList.add(`${Style['on-tick']}`)
      changeState(true)
    }
  }

  return (
    <svg width="26" height="26" >
      <circle className={Style.circleBg} onClick={animate} fill="#fff" cy="13" cx="13" r="10"  stroke="#62dca5" strokeLinecap="round" strokeWidth="2" />
      <circle ref={circleRef} className={`${Style.circle} ${checked ? Style['circle-checked'] : ''}`} fill="none" cy="13" cx="13" r="10" 
          stroke="#62dca5" strokeLinecap="round" transform="rotate(-90 13 13)" strokeWidth="2" />
      <polyline ref={tickRef} className={`${Style.tick } ${checked ? Style['tick-checked'] : ''} `} fill="none" stroke="#62dca5" strokeWidth="2" 
        points="7,14 12,18 19,10" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )

}