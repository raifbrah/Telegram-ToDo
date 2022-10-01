import * as mainJS from '../main.js'
import * as completedTasksJS from './completed-tasks.js'
import * as deleteTodoJS from './delete-todo.js'
import * as listsContextMenuJS from './lists-context-menu.js'
import * as localStorageJS from './saves/localStorage.js'



let addListBtn = document.querySelector('.add-list-btn')
let addCategoryWindow = document.querySelector('.add-category-window')
let addCategoryWindow__input = document.querySelector('.add-category-window__input')
let addCategoryWindow__cancel = document.querySelector('.add-category-window__cancel')
let addCategoryWindow__confirm = document.querySelector('.add-category-window__confirm')
let addCategoryWindow__shadowBg = document.querySelector('.add-category-window__shadow-bg')

const listsSlider__con = document.querySelector('.lists-slider__con')

let categoryRadios = document.querySelectorAll('.category__radio')



function open() {
  addListBtn = document.querySelector('.add-list-btn')
  addCategoryWindow = document.querySelector('.add-category-window')
  addCategoryWindow__input = document.querySelector('.add-category-window__input')
  addCategoryWindow__cancel = document.querySelector('.add-category-window__cancel')
  addCategoryWindow__confirm = document.querySelector('.add-category-window__confirm')
  addCategoryWindow__shadowBg = document.querySelector('.add-category-window__shadow-bg')

    var addCatWindow_transition = 900
    
    addCategoryWindow__input.value = ''
    addCategoryWindow.style.animationDuration = `${addCatWindow_transition}ms`
    addCategoryWindow.style.transition = `${addCatWindow_transition / 3}ms`
    addCategoryWindow.style.top = `${window.innerHeight / 2}px`
    addCategoryWindow.style.animationName = 'add-category-window_open-anim'
    addCategoryWindow__shadowBg.style.transition = `${addCatWindow_transition / 3}ms`
    addCategoryWindow__shadowBg.style.zIndex = '999'
    addCategoryWindow__shadowBg.style.opacity = '.6'
    addCategoryWindow__shadowBg.style.pointerEvents = 'auto'
}

export function close() {
  addListBtn = document.querySelector('.add-list-btn')
  addCategoryWindow = document.querySelector('.add-category-window')
  addCategoryWindow__input = document.querySelector('.add-category-window__input')
  addCategoryWindow__cancel = document.querySelector('.add-category-window__cancel')
  addCategoryWindow__confirm = document.querySelector('.add-category-window__confirm')
  addCategoryWindow__shadowBg = document.querySelector('.add-category-window__shadow-bg')


  const addCatWindow_transition = '.15s'
  setTimeout(() => {
    addCategoryWindow.style.transition = '0s'
  }, 150)
  
  addCategoryWindow.style.animationDuration = addCatWindow_transition
  addCategoryWindow.style.transition = addCatWindow_transition

  addCategoryWindow.style.top = `101%`

  addCategoryWindow.style.animationName = 'add-category-window_close-anim'
  addCategoryWindow__shadowBg.style.transition = addCatWindow_transition
  addCategoryWindow__shadowBg.style.zIndex = '-1'
  addCategoryWindow__shadowBg.style.opacity = '0'
  addCategoryWindow__shadowBg.style.pointerEvents = 'none' 
}

function add() {
  addListBtn = document.querySelector('.add-list-btn')
  addCategoryWindow = document.querySelector('.add-category-window')
  addCategoryWindow__input = document.querySelector('.add-category-window__input')
  addCategoryWindow__cancel = document.querySelector('.add-category-window__cancel')
  addCategoryWindow__confirm = document.querySelector('.add-category-window__confirm')
  addCategoryWindow__shadowBg = document.querySelector('.add-category-window__shadow-bg')


  categoryRadios = document.querySelectorAll('.category__radio')

  if (addCategoryWindow__input.value !== "") {
    history.back()
    
    addListBtn.insertAdjacentHTML('beforebegin', `
      <label class="category-wrapper">
        <input checked type="radio" class="category__radio" name="category__radio">
        <span class="category">
          ${addCategoryWindow__input.value}
        </span>
      </label>
    `)
    addCategoryWindow__input.value = ''
    
    listsSlider__con.innerHTML += `
      <div class="lists-slider__slide">
        <div class="main-list"></div>
        <label class="completed-tasks__btn">
          Выполненные задачи
          <input class="completed-tasks__checkbox" type="checkbox">
          <span class="completed-tasks__toggle"></span>
        </label>
        <div class="completed-tasks">
        </div>
      </div>
    `
    listsSlider_switch(categoryRadios.length)
    completedTasksJS.complete()
    completedTasksJS.uncomplete()
    completedTasksJS.open_close()
    deleteTodoJS.deleteTodo()
    listsContextMenuJS.callingTheMenu()
    setTimeout(() => {
      localStorageJS.save()
    }, 500)
  } else {
    const wrapper = document.querySelector('.wrapper')
    wrapper.style.pointerEvents = 'none'
    addCategoryWindow__shadowBg.style.pointerEvents = 'none'
    addCategoryWindow.style.pointerEvents = 'none'

    addCategoryWindow.style.animationDuration = '.4s'
    addCategoryWindow.style.animationName = 'rename-lists-window_shaking'
    addCategoryWindow.style.transform = 'translate(-50%, -50%)'
    setTimeout(() => {
      addCategoryWindow.style.animationName = 'none'
      wrapper.style.pointerEvents = 'auto'
      addCategoryWindow__shadowBg.style.pointerEvents = 'auto'
      addCategoryWindow.style.pointerEvents = 'auto'
    }, 400)
  }
}

export function categoriesBtnsOnClick() {
  addListBtn = document.querySelector('.add-list-btn')
  addCategoryWindow = document.querySelector('.add-category-window')
  addCategoryWindow__input = document.querySelector('.add-category-window__input')
  addCategoryWindow__cancel = document.querySelector('.add-category-window__cancel')
  addCategoryWindow__confirm = document.querySelector('.add-category-window__confirm')
  addCategoryWindow__shadowBg = document.querySelector('.add-category-window__shadow-bg')


  addListBtn.onclick = () => {
    categoryRadios = document.querySelectorAll('.category__radio')
  
    if (categoryRadios.length < 10) {
      mainJS.locationHash('#addCategoryWindow')
      open()
    }
  }
  addCategoryWindow__cancel.onclick = () => history.back()
  addCategoryWindow__confirm.onclick = () => add()

  addCategoryWindow__shadowBg.onclick = () => history.back()

  function pressedEnter(e) {
    if (e.keyCode === 13) {
      addCategoryWindow__input.blur()
      add()
    }
  }
  addCategoryWindow__input.onfocus = () => {
    addCategoryWindow__input.addEventListener('keyup', pressedEnter)
  }
  addCategoryWindow__input.onblur = () => {
    addCategoryWindow__input.removeEventListener('keyup', pressedEnter)
  }
}
categoriesBtnsOnClick()

export function listsSlider_switch(count) {
  addListBtn = document.querySelector('.add-list-btn')
  addCategoryWindow = document.querySelector('.add-category-window')
  addCategoryWindow__input = document.querySelector('.add-category-window__input')
  addCategoryWindow__cancel = document.querySelector('.add-category-window__cancel')
  addCategoryWindow__confirm = document.querySelector('.add-category-window__confirm')
  addCategoryWindow__shadowBg = document.querySelector('.add-category-window__shadow-bg')


  categoryRadios = document.querySelectorAll('.category__radio')
  
  for (let i=0; i < categoryRadios.length; i++) {
    categoryRadios[i].onclick = () => {
      listsSlider__con.style.transform = `translateX(-${window.innerWidth * i}px)`
    }
  }
  
  if (count > 0) {
    listsSlider__con.style.transform = `translateX(-${window.innerWidth * count}px)`
  }
}
listsSlider_switch()

