module.exports = {
  init: function() {
    const triggerEl = document.querySelector('[data-action="toggle-sidebar"]')

    if (triggerEl) {
      let sidebarOpen = false
      const bodyEl = document.querySelector('body')
      const OPEN_CLASS = 'sidebar-open'

      triggerEl.addEventListener('click', function(ev) {
        if (sidebarOpen) {
          bodyEl.classList.remove(OPEN_CLASS)
        } else {
          bodyEl.classList.add(OPEN_CLASS)
        }

        sidebarOpen = !sidebarOpen
      })
    }
  }
}
