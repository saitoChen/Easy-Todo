const {Notification} = window.require('electron').remote

export function notificate() {
  if (Notification.isSupported()) {
    let title = `Easy-Todo`
    let body = `昨日有未完成的待办事项，请尽快完成`
    let notify = new Notification({
      title,
      body
    })
    notify.show()
  }
}