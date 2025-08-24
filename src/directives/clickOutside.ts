import type { DirectiveBinding, ObjectDirective } from 'vue'

interface ClickOutsideElement extends HTMLElement {
  clickOutsideEvent?: (event: Event) => void
}

const clickOutside: ObjectDirective = {
  beforeMount(el: ClickOutsideElement, binding: DirectiveBinding) {
    el.clickOutsideEvent = function (event: Event) {
      event.preventDefault()
      event.stopPropagation()
      // Проверяем, что клик произошел не внутри элемента
      if (!(el === event.target || el.contains(event.target as Node))) {
        // Вызываем функцию-обработчик, переданную в директиву
        if (binding.value && typeof binding.value === 'function') {
          binding.value(event)
        }
      }
    }

    // Добавляем обработчик события на document
    document.addEventListener('click', el.clickOutsideEvent)
  },

  unmounted(el: ClickOutsideElement) {
    // Удаляем обработчик при размонтировании компонента
    if (el.clickOutsideEvent) {
      document.removeEventListener('click', el.clickOutsideEvent)
      delete el.clickOutsideEvent
    }
  },
}

export default clickOutside
