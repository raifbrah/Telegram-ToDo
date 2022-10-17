import * as appJS from './app.js'
import * as localStorageJS from './js/saves/localStorage.js'
localStorageJS.importSaves()

import * as leftMenuJS from './js/left-menu.js'
import * as categoriesJS from './js/categories.js'
import * as addTodoBtnJS from './js/add-todo-btn.js'
import * as addTodoWindowJS from './js/add-todo-window.js'
import * as completedTasksJS from './js/completed-tasks.js'
import * as deleteTodoJS from './js/delete-todo.js'
import * as listsContextMenuJS from './js/lists-context-menu.js'


const addCategoryWindow = document.querySelector('.add-category-window')
const wrapper = document.querySelector('.wrapper')
const addTodoBtn = document.querySelector('.add-todo-btn')
const addTodoBtn__checkbox = document.querySelector('.add-todo-btn__checkbox')
const addTodoWindow = document.querySelector('.add-todo-window')
const addTodoWindow__input = document.querySelector('.add-todo-window__input')



let forwardHistory = ''
export function locationHash(tag) {
  location.hash = tag
  forwardHistory = tag
}


window.addEventListener('hashchange', hashChange)

window.addEventListener('resize', () => {
  wrapper.style.height = `${window.innerHeight}px`
})
wrapper.style.height = `${window.innerHeight}px`

window.addEventListener('resize', addTodoBtn_changeTop)
window.addEventListener('resize', addTodoWindow_changeTop)

function hashChange() {
  if (location.hash === '#addCategoryWindow') {
    window.addEventListener('resize', addCatWindow_changeTop)
    window.removeEventListener('resize', addTodoBtn_changeTop)
    addTodoBtn.style.top = `calc(101% + 80px)`
  } else if (location.hash === '#listsContextMenu' && forwardHistory !== '#renameListsWindow') {
    window.removeEventListener('resize', addTodoBtn_changeTop)
    addTodoBtn.style.top = `calc(101% + 80px)`
  } else {
    if (forwardHistory === '#addCategoryWindow' && location.hash !== 'addCategoryWindow') {
      window.removeEventListener('resize', addCatWindow_changeTop)
      categoriesJS.close()
      window.addEventListener('resize', addTodoBtn_changeTop)
      addTodoBtn.style.top = '100%'
    } else if (forwardHistory === '#leftMenu' && location.hash !== '#leftMenu') {
      leftMenuJS.close()
    } else if (forwardHistory === '#addTodoBtn' && location.hash !== '#addTodoBtn') {
      addTodoBtn__checkbox.checked = false
      addTodoWindow__input.contentEditable = false
    } else if (forwardHistory === '#listsContextMenu' && location.hash !== '#listsContextMenu') {
      listsContextMenuJS.close()
      window.addEventListener('resize', addTodoBtn_changeTop)
      addTodoBtn.style.top = '100%'
    }
  }
}
function addCatWindow_changeTop() {
  addCategoryWindow.style.top = `${window.innerHeight / 2}px`
}
function addTodoBtn_changeTop() {
  addTodoBtn.style.top = '100%'
}
function addTodoWindow_changeTop() {
  addTodoWindow.style.top = '100%'
}

addTodoBtn_changeTop()
addTodoWindow_changeTop()


// отключение zoom через скролл (в том числе трекападами в macOS)
document.addEventListener('mousewheel', function(e){
  if(!e.ctrlKey && !e.metaKey) return;

  e.preventDefault();
  e.stopImmediatePropagation();
}, {passive:false});

// отключение zoom прикосновениями (в том числе трекападами и т.п.) в Safari и iOS
document.addEventListener('gesturestart', function(e){
  e.preventDefault();
  e.stopImmediatePropagation();
}, {passive:false});

// отключение zoom через клавиатуру (ctrl + "+", ctrl + "-")
// кнопки браузера для управления zoom отключены не будут
document.addEventListener('keydown', function(e){
  if(!e.ctrlKey && !e.metaKey) return;
  if(e.keyCode != 189 && e.keyCode != 187) return;

  e.preventDefault();
  e.stopImmediatePropagation();
}, {passive:false});
