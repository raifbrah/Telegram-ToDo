import * as mainJS from '../main.js'
import * as categoriesJS from './categories.js'
import * as localStorageJS from './saves/localStorage.js'


callingTheMenu()


const wrapper = document.querySelector('.wrapper')


let hold = false
let toggleOfOpen__renameWindow = false
let toggleOfOpen__confirmWindow = false


export function callingTheMenu() {
  const category = document.querySelectorAll('.category')
  const listsContextMenu__rename = document.querySelector('.lists-context-menu__rename')
  const listsContextMenu__delete = document.querySelector('.lists-context-menu__delete')
  const renameListsWindow__input = document.querySelector('.rename-lists-window__input')

  for (let i=0; i<category.length - 1; i++) {
    category[i].addEventListener('touchstart', (e) => {
      hold = true
      setTimeout(() => {
        if (hold === true) {
          open()
          mainJS.locationHash('#listsContextMenu')
          listsContextMenu__rename.onclick = () => {
            openRenameWindow(i)
            toggleOfOpen__renameWindow = true
          }
          listsContextMenu__delete.onclick = () => {
            openConfirmWindow(i)
            toggleOfOpen__confirmWindow = true
          }
          renameListsWindow__input.value = category[i].innerText
        }
      }, 300)
    }, {passive: true})
    
    category[i].addEventListener('touchmove', (e) => {
      hold = false
    }, {passive: true})

    category[i].addEventListener('touchend', (e) => {
      hold = false
    })
  }
}

function open() {
  const listsContextMenu = document.querySelector('.lists-context-menu')
  const listsContextMenu__shadowBg = document.querySelector('.lists-context-menu__shadow-bg')

  listsContextMenu__shadowBg.style.opacity = '.6'
  listsContextMenu__shadowBg.style.pointerEvents = 'auto'

  listsContextMenu.style.animationDuration = '.7s'
  listsContextMenu.style.animationName = 'lists-context-menu_open'

  listsContextMenu__shadowBg.onclick = () => {
    close()
    history.back()
    toggleOfOpen__renameWindow = false
  }
}

export function close() {
  const renameListsWindow = document.querySelector('.rename-lists-window')
  const listsContextMenu__shadowBg = document.querySelector('.lists-context-menu__shadow-bg')
  const confirmWindow = document.querySelector('.confirm-window')

  listsContextMenu__shadowBg.style.opacity = '0'
  listsContextMenu__shadowBg.style.pointerEvents = 'none'

  if (toggleOfOpen__renameWindow === false && toggleOfOpen__confirmWindow === false) {
    const listsContextMenu = document.querySelector('.lists-context-menu')
    listsContextMenu.style.animationDuration = '.15s'
    listsContextMenu.style.animationName = 'lists-context-menu_close'
  } else if (toggleOfOpen__renameWindow === true) {
    toggleOfOpen__renameWindow = false
    
    renameListsWindow.style.animationDuration = '.15s'
    renameListsWindow.style.animationName = 'add-category-window_close-anim'
    renameListsWindow.style.transform = 'translate(-50%, 0%)'
    window.removeEventListener('resize', renameWindow_centerY)
  } else if (toggleOfOpen__confirmWindow === true) {
    toggleOfOpen__confirmWindow = false

    confirmWindow.style.animationDuration = '.15s'
    confirmWindow.style.animationName = 'lists-context-menu_close'
  }
}

function openRenameWindow(listNum) {
  const renameListsWindow = document.querySelector('.rename-lists-window')
  const renameListsWindow__confirm = document.querySelector('.rename-lists-window__confirm')
  const renameListsWindow__cancel = document.querySelector('.rename-lists-window__cancel')
  const category = document.querySelectorAll('.category')
  const renameListsWindow__input = document.querySelector('.rename-lists-window__input')
  const listsContextMenu = document.querySelector('.lists-context-menu')
  const listsContextMenu__shadowBg = document.querySelector('.lists-context-menu__shadow-bg')

  const openRenameWindow_transition = 900

  listsContextMenu.style.animationDuration = '.15s'
  listsContextMenu.style.animationName = 'lists-context-menu_close'

  setTimeout(() => {
    wrapper.style.pointerEvents = 'none'
    renameListsWindow.style.pointerEvents = 'none'
    listsContextMenu__shadowBg.style.pointerEvents = 'none'

    renameListsWindow.style.animationDuration = `${openRenameWindow_transition}ms`
    renameListsWindow.style.animationName = 'add-category-window_open-anim'

    setTimeout(() => {
      wrapper.style.pointerEvents = 'auto'
      renameListsWindow.style.pointerEvents = 'auto'
      listsContextMenu__shadowBg.style.pointerEvents = 'auto'
    }, openRenameWindow_transition / 3)
  }, 150)


  renameListsWindow__confirm.onclick = () => {
    if (renameListsWindow__input.value !== "") {
      category[listNum].innerText = renameListsWindow__input.value
      history.back()
      setTimeout(() => {
        localStorageJS.save()
      }, 500)
    } else {
      const wrapper = document.querySelector('.wrapper')
      const listsContextMenu__shadowBg = document.querySelector('.lists-context-menu__shadow-bg')
      wrapper.style.pointerEvents = 'none'
      listsContextMenu__shadowBg.style.pointerEvents = 'none'
      renameListsWindow.style.pointerEvents = 'none'

      renameListsWindow.style.animationDuration = '.4s'
      renameListsWindow.style.animationName = 'rename-lists-window_shaking'
      renameWindow_centerY()
      window.addEventListener('resize', renameWindow_centerY)

      setTimeout(() => {
        renameListsWindow.style.animationName = 'none'
        wrapper.style.pointerEvents = 'auto'
        listsContextMenu__shadowBg.style.pointerEvents = 'auto'
        renameListsWindow.style.pointerEvents = 'auto'
      }, 400)
    }
  }
  renameListsWindow__cancel.onclick = () => {
    openRenameWindow_back()
    toggleOfOpen__renameWindow = false
  }
}

export function openRenameWindow_back() {
  const renameListsWindow = document.querySelector('.rename-lists-window')
  const listsContextMenu = document.querySelector('.lists-context-menu')

  toggleOfOpen__renameWindow = false
  
  renameListsWindow.style.animationDuration = '.15s'
  renameListsWindow.style.animationName = 'add-category-window_close-anim'

  setTimeout(() => {
    listsContextMenu.style.animationDuration = '.7s'
    listsContextMenu.style.animationName = 'lists-context-menu_open'

    renameListsWindow.style.transform = `translate(-50%, 0%)`
    window.removeEventListener('resize', renameWindow_centerY)
  }, 150)
}

function renameWindow_centerY() {
  const renameListsWindow = document.querySelector('.rename-lists-window')
  renameListsWindow.style.transform = `translate(-50%, calc(-${window.innerHeight / 2}px + -50%))`
}



function openConfirmWindow(listNum) {
  const listsContextMenu = document.querySelector('.lists-context-menu')
  const confirmWindow = document.querySelector('.confirm-window')
  const confirmWindow__cancel = document.querySelector('.confirm-window__cancel')
  const confirmWindow__delete = document.querySelector('.confirm-window__delete')
  const categoryWrapper = document.querySelectorAll('.category-wrapper')
  const listsSlider__slide = document.querySelectorAll('.lists-slider__slide')
  const listsSlider__con = document.querySelector('.lists-slider__con')
  const categoryRadio = document.querySelectorAll('.category__radio')

  listsContextMenu.style.animationDuration = '.15s'
  listsContextMenu.style.animationName = 'lists-context-menu_close'

  setTimeout(() => {
    confirmWindow.style.animationDuration = '.7s'
    confirmWindow.style.animationName = 'lists-context-menu_open'
  }, 150)

  confirmWindow__cancel.onclick = () => {
    openConfirmWindow__back()
    toggleOfOpen__confirmWindow = false
  }

  confirmWindow__delete.onclick = () => {
    if (categoryWrapper.length > 1) {
      history.back()
      if (categoryRadio[listNum].checked === true) {
        if (listNum === 0) {
          categoryWrapper[listNum].remove()
          listsSlider__slide[listNum].remove()
          categoriesJS.listsSlider_switch()
          categoryRadio[listNum + 1].click()
          callingTheMenu()
        } else {
          categoryRadio[listNum - 1].click()
          categoryWrapper[listNum].remove()
          listsSlider__slide[listNum].remove()
          categoriesJS.listsSlider_switch()
          callingTheMenu()
        }
      } else {
        for (let i=0; i<categoryRadio.length; i++) {
          if (categoryRadio[i].checked === true && listNum < i) {
            listsSlider__con.style.transition = '0s'
            listsSlider__slide[listNum].remove()
            categoryWrapper[listNum].remove()
            categoriesJS.listsSlider_switch()
            categoryRadio[i].click()
            callingTheMenu()
            setTimeout(() => {
              listsSlider__con.style.transition = 'var(--left-menu_transition)'
            }, 150)
          } else if (categoryRadio[i].checked === true && listNum > i) {
            listsSlider__slide[listNum].remove()
            categoryWrapper[listNum].remove()
            categoriesJS.listsSlider_switch()
            callingTheMenu()
          }
        }
      }
      setTimeout(() => {
        localStorageJS.save()
      }, 1000)
    } else {
      const wrapper = document.querySelector('.wrapper')
      const listsContextMenu__shadowBg = document.querySelector('.lists-context-menu__shadow-bg')
      wrapper.style.pointerEvents = 'none'
      listsContextMenu__shadowBg.style.pointerEvents = 'none'
      confirmWindow.style.pointerEvents = 'none'

      confirmWindow.style.animationDuration = '.4s'
      confirmWindow.style.animationName = 'confirm-window_shaking'
      confirmWindow.style.transform = 'translate(-50%, 0%)'
      setTimeout(() => {
        confirmWindow.style.animationName = 'none'
        wrapper.style.pointerEvents = 'auto'
        listsContextMenu__shadowBg.style.pointerEvents = 'auto'
        confirmWindow.style.pointerEvents = 'auto'
      }, 400)
    }
  }
}
 
function openConfirmWindow__back() {
  const listsContextMenu = document.querySelector('.lists-context-menu')
  const confirmWindow = document.querySelector('.confirm-window')

  toggleOfOpen__confirmWindow = false

  confirmWindow.style.animationDuration = '.15s'
  confirmWindow.style.animationName = 'lists-context-menu_close'

  setTimeout(() => {
    listsContextMenu.style.animationDuration = '.7s'
    listsContextMenu.style.animationName = 'lists-context-menu_open'
  }, 150)
}
