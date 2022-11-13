const addCategoryWindow_openAnim = document.querySelector('.add-category-window_open-anim')
const addCategoryWindow_closeAnim = document.querySelector('.add-category-window_close-anim')
const renameListsWindow_shaking = document.querySelector('.rename-lists-window_shaking')



window.addEventListener('resize', addCustomStyles)

function addCustomStyles() {
  ADDCategoryWindow_openAnim()
  ADDCategoryWindow_closeAnim()
  RENAMEListsWindow_shaking()
}
addCustomStyles()


function ADDCategoryWindow_openAnim() {
  addCategoryWindow_openAnim.innerHTML = `
    @keyframes add-category-window_open-anim {
      0% {
        transform: translate(-50%, 0);
      }
      37% {
        transform: translate(-50%, calc(-${window.innerHeight / 2}px + -55%));
      }
      66% {
        transform: translate(-50%, calc(-${window.innerHeight / 2}px + -48.5%));
      }
      100% {
        transform: translate(-50%, calc(-${window.innerHeight / 2}px + -50%));
      }
    }
  `
}

function ADDCategoryWindow_closeAnim() {
  addCategoryWindow_closeAnim.innerHTML = `
    @keyframes add-category-window_close-anim {
      0% {
        transform: translate(-50%, calc(-${window.innerHeight / 2}px + -50%));
      }
      100% {
        transform: translate(-50%, 0%);
      }
    }
  `
}

function RENAMEListsWindow_shaking() {
  renameListsWindow_shaking.innerHTML = `
    @keyframes rename-lists-window_shaking {
      0% {
        transform: translate(-50%, calc(-${window.innerHeight / 2}px + -50%));
      }
      10% {
        transform: translate(-52%, calc(-${window.innerHeight / 2}px + -50%));
      }
      35% {
        transform: translate(-48%, calc(-${window.innerHeight / 2}px + -50%));
      }
      60% {
        transform: translate(-50.5%, calc(-${window.innerHeight / 2}px + -50%));
      }
      85% {
        transform: translate(-49.5%, calc(-${window.innerHeight / 2}px + -50%));
      }
      100% {
        transform: translate(-50%, calc(-${window.innerHeight / 2}px + -50%));
      }
    }
  `
}