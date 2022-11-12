import * as mainJS from '../main.js'



const addTodoBtn = document.querySelector('.add-todo-btn')
const addTodoBtn__shadow = document.querySelector('.add-todo-btn__shadow')
const addTodoWindow__input = document.querySelector('.add-todo-window__input')



addTodoBtn.style.transition = '200ms'

addTodoBtn.onclick = () => {
  mainJS.locationHash('#addTodoBtn')
  addTodoWindow__input.contentEditable = true
  addTodoWindow__input.innerHTML = ''
  addTodoWindow__input.focus()
}

addTodoBtn__shadow.onclick = () => {
  history.back()
}


export function addTodoBtn_open() {
  addTodoBtn.style.transform = 'translate(-50%, calc(-100% - 20px))'
}
export function addTodoBtn_close() {
  addTodoBtn.style.transform = 'translate(-50%, 1px)'
}