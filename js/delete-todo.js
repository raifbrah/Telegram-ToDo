import * as localStorageJS from './saves/localStorage.js'


deleteTodo()

//let toggleOfVerticalScroll = false

export function deleteTodo() {
  const category__radio = document.querySelectorAll('.category__radio')
  const completedTasks__btn = document.querySelectorAll(`.completed-tasks__btn`)
  const completedTasks = document.querySelectorAll(`.completed-tasks`)

  let toggleOfVerticalScroll = false

  for (let i=0; i<category__radio.length; i++) {
    const mainTodo = document.querySelectorAll(`.lists-slider__slide:nth-child(${i+1}) .main-list .todo`)
    const completedTodo = document.querySelectorAll(`.lists-slider__slide:nth-child(${i+1}) .completed-tasks .todo`)
    
    for (let mainCount=0; mainCount<mainTodo.length; mainCount++) {
      mainTodo[mainCount].addEventListener('touchstart', (e) => TouchStart(e))
      mainTodo[mainCount].addEventListener('touchmove', (e) => TouchMove(e))
      mainTodo[mainCount].addEventListener('touchend', (e) => TouchEnd(e))
      
      var startPosition = null
      var currentPosition = null

      var startPositionY = null
      var currentPositionY = null

      function TouchStart(e) {
        startPosition = e.changedTouches[0].clientX
        currentPosition = startPosition

        startPositionY = e.changedTouches[0].clientY

        mainTodo[mainCount].style.transition = 'background .3s'
      }

      function TouchMove(e) {
        currentPosition = e.changedTouches[0].clientX
        currentPositionY = e.changedTouches[0].clientY

        if (Math.abs(startPositionY - currentPositionY) > 20 
                     && startPosition - currentPosition < 20) {
          toggleOfVerticalScroll = true
        }

        if (startPosition - currentPosition > 20 && toggleOfVerticalScroll === false) {
          mainTodo[mainCount].style.transform = `translateX(-${startPosition - currentPosition - 20}px)`
        }
        if (startPosition - currentPosition > 100 && toggleOfVerticalScroll === false) {
          mainTodo[mainCount].style.background = '#F76B72AA'
        } else {
          mainTodo[mainCount].style.background = '#212D3B'
        }
      }

      function TouchEnd(e) {
        mainTodo[mainCount].style.transition = '.3s, opacity .2s'
        
        if (toggleOfVerticalScroll === false) {
          CheckAction()
        }

        startPosition = null
        currentPosition = null

        startPositionY = null
        currentPositionY = null

        toggleOfVerticalScroll = false
      }

      function CheckAction() {
        if (startPosition - currentPosition > 100) {
          mainTodo[mainCount].style.transform = `translateX(-100%)`
          mainTodo[mainCount].style.opacity = '0'
          for (let afterTodo=mainCount+1; afterTodo<mainTodo.length; afterTodo++) {
            mainTodo[afterTodo].style.transition = '.3s'
          }
          completedTasks__btn[i].style.transition = '.3s'
          completedTasks[i].style.transition = '.3s'
          for (let afterTodo=mainCount+1; afterTodo<mainTodo.length; afterTodo++) {
            mainTodo[afterTodo].style.transform = `translateY(-${5 + mainTodo[mainCount].offsetHeight}px)`          
          }
          completedTasks__btn[i].style.transform = `translateY(-${5 + mainTodo[mainCount].offsetHeight}px)`
          completedTasks[i].style.transform = `translateY(-${5 + mainTodo[mainCount].offsetHeight}px)`
          setTimeout(() => {
            for (let afterTodo=mainCount+1; afterTodo<mainTodo.length; afterTodo++) {
              mainTodo[afterTodo].style.transition = 'none'
            }
            completedTasks__btn[i].style.transition = 'none'
            completedTasks[i].style.transition = 'none'
            for (let afterTodo=mainCount+1; afterTodo<mainTodo.length; afterTodo++) {
              mainTodo[afterTodo].style.transform = `translateY(0)`          
            }
            completedTasks__btn[i].style.transform = `translateY(0)`
            completedTasks[i].style.transform = `translateY(0)`
            mainTodo[mainCount].remove()
          }, 300)
          
          setTimeout(() => {
            localStorageJS.save()
          }, 1000)
        } else {
          mainTodo[mainCount].style.transform = `translateX(0)`
          mainTodo[mainCount].style.background = '#212D3B'
        }
      }
    }

    for (let completedCount=0; completedCount<completedTodo.length; completedCount++) {
      completedTodo[completedCount].addEventListener('touchstart', (e) => TouchStart(e))
      completedTodo[completedCount].addEventListener('touchmove', (e) => TouchMove(e))
      completedTodo[completedCount].addEventListener('touchend', (e) => TouchEnd(e))
      
      var startPosition = null
      var currentPosition = null

      var startPositionY = null
      var currentPositionY = null

      function TouchStart(e) {
        startPosition = e.changedTouches[0].clientX
        currentPosition = startPosition

        startPositionY = e.changedTouches[0].clientY

        completedTodo[completedCount].style.transition = 'background .3s'
      }

      function TouchMove(e) {
        currentPosition = e.changedTouches[0].clientX
        currentPositionY = e.changedTouches[0].clientY

        if (Math.abs(startPositionY - currentPositionY) > 20 
                     && startPosition - currentPosition < 20) {
          toggleOfVerticalScroll = true
        }

        if (startPosition - currentPosition > 20 && toggleOfVerticalScroll === false) {
          completedTodo[completedCount].style.transform = `translateX(-${startPosition - currentPosition - 20}px)`
        }
        if (startPosition - currentPosition > 100 && toggleOfVerticalScroll === false) {
          completedTodo[completedCount].style.background = '#F76B72AA'
        } else {
          completedTodo[completedCount].style.background = '#212D3B'
        }
      }

      function TouchEnd(e) {
        completedTodo[completedCount].style.transition = '.3s, opacity .2s'
        
        if (toggleOfVerticalScroll === false) {
          CheckAction()
        }

        startPosition = null
        currentPosition = null

        startPositionY = null
        currentPositionY = null

        toggleOfVerticalScroll = false
      }

      function CheckAction() {
        if (startPosition - currentPosition > 100) {
          completedTodo[completedCount].style.transform = `translateX(-100%)`
          completedTodo[completedCount].style.opacity = '0'
          for (let afterTodo=completedCount+1; afterTodo<completedTodo.length; afterTodo++) {
            completedTodo[afterTodo].style.transition = '.3s'
            completedTodo[afterTodo].style.transform = `translateY(-${5 + completedTodo[completedCount].offsetHeight}px)`
          }
          setTimeout(() => {
            for (let afterTodo=completedCount+1; afterTodo<completedTodo.length; afterTodo++) {
              completedTodo[afterTodo].style.transition = 'none'
              completedTodo[afterTodo].style.transform = 'translateY(0)'
            }
            completedTodo[completedCount].remove()
          }, 300)

          setTimeout(() => {
            localStorageJS.save()
          }, 1000)
        } else {
          completedTodo[completedCount].style.transform = `translateX(0)`
          completedTodo[completedCount].style.background = '#212D3B'
        }
      }
    }
  }
}

