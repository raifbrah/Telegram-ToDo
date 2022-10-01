import * as deleteTodoJS from './delete-todo.js'
import * as localStorageJS from './saves/localStorage.js'



complete()
uncomplete()

export function complete() {
  const category__radio = document.querySelectorAll('.category__radio')
  const completedTasks__btn = document.querySelectorAll(`.completed-tasks__btn`)
  const completedTasks = document.querySelectorAll(`.completed-tasks`)
  
  
  for (let i = 0; i < category__radio.length; i++) {
    const todo = document.querySelectorAll(`.lists-slider__slide:nth-child(${i+1}) .main-list .todo`)
    const mainTodo__checkbox = document.querySelectorAll(`.lists-slider__slide:nth-child(${i+1}) .main-list .todo__checkbox`)
    
    for (let c=0; c<todo.length; c++) {
      mainTodo__checkbox[c].onclick = () => {
        todo[c].style.transition = '.2s'
        completedTasks__btn[i].style.transition = '.3s'
        completedTasks[i].style.transition = '.3s'
        todo[c].style.opacity = '0'
          
        for (let c2=c+1; c2<todo.length; c2++) {
          todo[c2].style.transition = '.3s'
          todo[c2].style.transform = `translateY(-${todo[c].offsetHeight + 5}px)`
        }
          
        completedTasks__btn[i].style.transform = `translateY(-${todo[c].offsetHeight + 5}px)`
        completedTasks[i].style.transform = `translateY(-${todo[c].offsetHeight + 5}px)`
        
        setTimeout(() => {
          completedTasks__btn[i].style.transition = '0s'
          completedTasks[i].style.transition = '0s'
          for (let c2 = c + 1; c2 < todo.length; c2++) {
            todo[c2].style.transition = '0s'
          }
          
          for (let c2 = c + 1; c2 < todo.length; c2++) {
            todo[c2].style.transform = `translateY(0)`
          }
          completedTasks__btn[i].style.transform = `translateY(0)`
          completedTasks[i].style.transform = `translateY(0)`
          
          
          const todoText = todo[c].innerText
          const todoHeight = todo[c].offsetHeight
          todo[c].remove()
          completedTasks[i].insertAdjacentHTML('afterbegin', `
            <div class="todo">
              <label class="todo__checkbox-wrapper">
                <input checked class="todo__checkbox" type="checkbox">
                <span class="todo__checkbox-label"></span>
              </label>
              <p class="todo__text" style="text-decoration: line-through; color: #aaa;">
                ${todoText}
              </p>
            </div>
          `)
          uncomplete()
          const todo_completed = document.querySelector(`.lists-slider__slide:nth-child(${i+1}) .completed-tasks .todo`)
          todo_completed.style.transition = '0s'
          todo_completed.style.opacity = '0'
          completedTasks[i].style.transform = `translateY(-${todoHeight + 5}px)`
          
          
          setTimeout(() => {
            completedTasks[i].style.transition = '.3s'
            completedTasks[i].style.transform = 'translateY(0)'
            setTimeout(() => {
              todo_completed.style.transition = '.2s'
              todo_completed.style.opacity = '1'
              deleteTodoJS.deleteTodo()
            }, 100)
          }, 50)
        }, 300)

        setTimeout(() => {
          localStorageJS.save()
        }, 1000)
      }
    }
  }
}

export function uncomplete() {
  const category__radio = document.querySelectorAll('.category__radio')
  const mainList = document.querySelectorAll('.main-list')
  const completedTasks__btn = document.querySelectorAll(`.completed-tasks__btn`)
  const completedTasks = document.querySelectorAll(`.completed-tasks`)

  
  for (let i = 0; i < category__radio.length; i++) {
    const todo = document.querySelectorAll(`.lists-slider__slide:nth-child(${i+1}) .completed-tasks .todo`)
    const completedTodo__checkbox = document.querySelectorAll(`.lists-slider__slide:nth-child(${i+1}) .completed-tasks .todo__checkbox`)
    
    for (let c=0; c<todo.length; c++) {
      completedTodo__checkbox[c].onclick = () => {
        const todoText = todo[c].innerText
        const todoHeight = todo[c].offsetHeight

        todo[c].style.transition = '.2s'
        todo[c].style.opacity = '0'

        for (let c2=c+1; c2<todo.length; c2++) {
          todo[c2].style.transition = '.3s'
          todo[c2].style.transform = `translateY(-${todo[c].offsetHeight + 5}px)`
        }
        
        setTimeout(() => {
          todo[c].remove()

          for (let c2=c+1; c2<todo.length; c2++) {
            todo[c2].style.transition = '0s'
            todo[c2].style.transform = 'translateY(0)'
          }

          mainList[i].style.transition = '0s'
          completedTasks__btn[i].style.transition = '0s'
          completedTasks[i].style.transition = '0s'

          mainList[i].style.transform = `translateY(-${todoHeight + 5}px)`
          completedTasks__btn[i].style.transform = `translateY(-${todoHeight + 5}px)`
          completedTasks[i].style.transform = `translateY(-${todoHeight + 5}px)`
          
          mainList[i].insertAdjacentHTML('afterbegin', `
            <div class="todo">
              <label class="todo__checkbox-wrapper">
                <input class="todo__checkbox" type="checkbox">
                <span class="todo__checkbox-label"></span>
              </label>
              <p class="todo__text">
                ${todoText}
              </p>
            </div>
          `)
          complete()
          const todo_uncompleted = document.querySelector(`.lists-slider__slide:nth-child(${i+1}) .main-list .todo`)
          todo_uncompleted.style.transition = '0s'
          todo_uncompleted.style.opacity = '0'

          setTimeout(() => {
            mainList[i].style.transition = '.3s'
            completedTasks__btn[i].style.transition = '.3s'
            completedTasks[i].style.transition = '.3s'

                      
            mainList[i].style.transform = 'translateY(0)'
            completedTasks__btn[i].style.transform = 'translateY(0)'
            completedTasks[i].style.transform = 'translateY(0)'

            setTimeout(() => {
              todo_uncompleted.style.transition = '.2s'
              todo_uncompleted.style.opacity = '1'
              deleteTodoJS.deleteTodo()
            }, 100)
          }, 50)
        }, 300)
        
        setTimeout(() => {
          localStorageJS.save()
        }, 1000)
      }
    }
  }
}


export function open_close() {
  const completedTasks__checkbox = document.querySelectorAll('.completed-tasks__checkbox')
  const completedTasks = document.querySelectorAll('.completed-tasks')
  
  for (let i=0; i<completedTasks.length; i++) {
    completedTasks__checkbox[i].onclick = () => {
      if (completedTasks__checkbox[i].checked === false) {
        completedTasks[i].style.display = 'flex'
        setTimeout(() => {
          completedTasks[i].style.opacity = '1'
        }, 0)
      } else {
        completedTasks[i].style.opacity = '0'
        setTimeout(() => {
          completedTasks[i].style.display = 'none'
        }, 100)
      }

      setTimeout(() => {
        localStorageJS.save()
      }, 500)
    }
  }
}

open_close()


export function check__openClose() {
  const completedTasks__checkbox = document.querySelectorAll('.completed-tasks__checkbox')
  const completedTasks = document.querySelectorAll('.completed-tasks')
  
  for (let i=0; i<completedTasks.length; i++) {
      if (completedTasks__checkbox[i].checked === false) {
        completedTasks[i].style.display = 'flex'
        setTimeout(() => {
          completedTasks[i].style.opacity = '1'
        }, 0)
      } else {
        completedTasks[i].style.opacity = '0'
        setTimeout(() => {
          completedTasks[i].style.display = 'none'
        }, 100)
      }

      setTimeout(() => {
        localStorageJS.save()
      }, 500)
  }
}
