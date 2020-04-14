export function timeStamp(){
  
  const date = new Date()
  const month = formateDate(date.getMonth() + 1)
  const today = formateDate(date.getDate())
  const day = EnTime2CnTime[date.getDay()]
  return `${month}月${today}日 星期${day}`
}

function formateDate(date){
  if (date >= 1 && date <= 9) {
    return `0${date}`
  }
  return `${date}`
}

const EnTime2CnTime = {
  '1': '一',
  '2': '二',
  '3': '三',
  '4': '四',
  '5': '五',
  '6': '六',
  '0': '日',
}

export function timeCondition(time){
  let condition = false
  condition = time.getHours() === 0 && time.getMinutes() === 0 && time.getSeconds() === 0
  return condition
}
