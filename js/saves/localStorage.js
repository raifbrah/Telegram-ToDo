import * as categoriesJS from '../categories.js'
import * as listsContextMenuJS from '../lists-context-menu.js'
import * as deleteTodoJS from '../delete-todo.js'
import * as completedTasksJS from '../completed-tasks.js'


export function save() {
  localStorage.raifbrahTodoToggleOfSave = "true"
  const categories = document.querySelector('.categories')
  const listsSlider__con = document.querySelector('.lists-slider__con')

  localStorage.categories = JSON.stringify(categories.innerHTML)
  localStorage.listsSlider__con = JSON.stringify(listsSlider__con.innerHTML)

  console.log('Сохранено')
}

export function importSaves() {
  if (localStorage.raifbrahTodoToggleOfSave === "true") {
    const categories = document.querySelector('.categories')
    const listsSlider__con = document.querySelector('.lists-slider__con')

    categories.innerHTML = JSON.parse(localStorage.categories)
    listsSlider__con.innerHTML = JSON.parse(localStorage.listsSlider__con)

    document.querySelectorAll('.category__radio')[0].click()

    categoriesJS.categoriesBtnsOnClick()
    categoriesJS.listsSlider_switch()
    listsContextMenuJS.callingTheMenu()
    deleteTodoJS.deleteTodo()
    completedTasksJS.complete()
    completedTasksJS.uncomplete()
    completedTasksJS.open_close()
    completedTasksJS.check__openClose()

    console.log('Сохранение восставновлено')
  } else {
    console.log('Сохранений нет')
  }
}

