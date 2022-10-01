import * as mainJS from '../main.js'


const leftMenu__shadowBG = document.querySelector('.left-menu__shadow-bg')
const leftMenu = document.querySelector('.left-menu')
const wrapper = document.querySelector('.wrapper')
const burgerBtn = document.querySelector('.burger-btn')



leftMenu.addEventListener('touchstart', (e) => TouchStart(e))
leftMenu.addEventListener('touchmove', (e) => TouchMove(e))
leftMenu.addEventListener('touchend', (e) => TouchEnd(e))

burgerBtn.onclick = () => {
  mainJS.locationHash('#leftMenu')
  open()
}
leftMenu__shadowBG.onclick = () => close()



var startPosition = null
var currentPosition = null

var leftMenu_width = Math.min(window.innerWidth / 100 * 75, 275)


function TouchStart(e) {
  startPosition = e.changedTouches[0].clientX
  currentPosition = startPosition
  
  leftMenu.style.transition = 'none'
  leftMenu__shadowBG.style.transition = '0s'
  wrapper.style.transition = '0s'
}

function TouchMove(e) {
  currentPosition = e.changedTouches[0].clientX
  
  if (startPosition - currentPosition > 0) {
    leftMenu.style.transform = `translateX(calc(${leftMenu_width}px - ${Math.abs(startPosition - currentPosition)}px))`
    leftMenu__shadowBG.style.opacity = `calc(.6 / (${startPosition / currentPosition}))`
    wrapper.style.transform = `translate(${8 / (startPosition / currentPosition)}%)`
  }
}

function TouchEnd(e) {
  leftMenu.style.transition = 'var(--left-menu_transition)'
  
  CheckAction()
  
  startPosition = null
  currentPosition = null
}

function CheckAction() {
  var x = startPosition - currentPosition
  
  if (x > 100) {
    close()
  } else {
    open()
  }
}


function open() {
  leftMenu.style.boxShadow = '2px 0 7px #0007'
  leftMenu.style.transform = 'translateX(var(--left-menu_width)'
  
  leftMenu__shadowBG.style.zIndex = '999'
  leftMenu__shadowBG.style.pointerEvents = 'auto'
  leftMenu__shadowBG.style.opacity = '.6'
  leftMenu__shadowBG.style.transition = 'var(--left-menu_transition)'
  
  wrapper.style.transition = 'var(--left-menu_transition)'
  wrapper.style.transform = 'translate(8%)'
}

export function close() {
  setTimeout(() => {
    leftMenu.style.boxShadow = 'none'
  }, 300)
  leftMenu.style.transform = 'translateX(0)'
  
  leftMenu__shadowBG.style.zIndex = '-1'
  leftMenu__shadowBG.style.pointerEvents = 'none'
  leftMenu__shadowBG.style.opacity = '0'
  leftMenu__shadowBG.style.transition = 'var(--left-menu_transition)'
  
  wrapper.style.transition = 'var(--left-menu_transition)'
  wrapper.style.transform = 'translate(0)'
  
  history.back()
}
