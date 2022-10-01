import * as menuJS from '../main.js'
import * as completedTasksJS from './completed-tasks.js'
import * as deleteTodoJS from './delete-todo.js'
import * as localStorageJS from './saves/localStorage.js'



const addTodoWindow = document.querySelector('.add-todo-window')
const addTodoWindow__cancel = document.querySelector('.add-todo-window__cancel')
const addTodoWindow__confirm = document.querySelector('.add-todo-window__confirm')
const addTodoWindow__input = document.querySelector('.add-todo-window__input')
const listsSlider__con = document.querySelector('.lists-slider__con')


setTimeout(() => {
  addTodoWindow.style.opacity = '1'
}, 250)

addTodoWindow__cancel.onclick = () => {
  history.back()
}

addTodoWindow__confirm.onclick = () => {
  add()
  setTimeout(() => {
    addTodoWindow__input.innerHTML = ''
  }, 250)
}

function add() {
  if (addTodoWindow__input.innerHTML !== '') {
    const category__radio = document.querySelectorAll('.category__radio')
    const mainList = document.querySelectorAll('.main-list')
    const listsSlider__slide = document.querySelectorAll('.lists-slider__slide')
    const completedTasks__btn = document.querySelectorAll('.completed-tasks__btn')
    const completedTasks = document.querySelectorAll('.completed-tasks')
    
    for (let i = 0; i < category__radio.length; i++) {
      if (category__radio[i].checked === true) {
        
        mainList[i].style.transition = '0s'
        completedTasks__btn[i].style.transition = '0s'
        completedTasks[i].style.transition = '0s'
        
        mainList[i].insertAdjacentHTML('afterbegin', `
          <div class="todo">
            <label class="todo__checkbox-wrapper">
              <input class="todo__checkbox" type="checkbox">
              <span class="todo__checkbox-label"></span>
            </label>
            <p class="todo__text">
              ${addTodoWindow__input.innerText}
            </p>
          </div>
        `)
        
        const mainList__firstTodo = document.querySelector(`.lists-slider__slide:nth-child(${i + 1}) > .main-list > .todo:first-child`)
        mainList__firstTodo.style.transition = '0s'
        mainList__firstTodo.style.opacity = '0'
        mainList__firstTodo.style.transition = '.9s'
        
        mainList[i].style.transform = `translateY(-${mainList__firstTodo.offsetHeight + 5}px)`
        completedTasks__btn[i].style.transform = `translateY(-${mainList__firstTodo.offsetHeight + 5}px)`
        completedTasks[i].style.transform = `translateY(-${mainList__firstTodo.offsetHeight + 5}px)`
        setTimeout(() => {
          mainList[i].style.transition = '.3s'
          completedTasks__btn[i].style.transition = '.3s'
          completedTasks[i].style.transition = '.3s'
          mainList[i].style.transform = `translateY(0px)`
          completedTasks__btn[i].style.transform = `translateY(0px)`
          completedTasks[i].style.transform = `translateY(0px)`
          mainList__firstTodo.style.opacity = '1'
        }, 0)
        
        //completedTasksJS.complete()
        //deleteTodoJS.deleteTodo()
      }
    }
    completedTasksJS.complete()
    deleteTodoJS.deleteTodo()
    history.back()
    setTimeout(() => {
      localStorageJS.save()
    }, 1000)
  }
}


function pressedEnter(e) {
  if (e.keyCode === 13) {
    addTodoWindow__input.blur()
    add()
  }
}
addTodoWindow__input.onfocus = () => {
  addTodoWindow__input.addEventListener('keyup', pressedEnter)
}
addTodoWindow__input.onblur = () => {
  addTodoWindow__input.removeEventListener('keyup', pressedEnter)
}
