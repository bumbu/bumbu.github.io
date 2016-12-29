import { u as $ } from 'umbrellajs'
import { idToPath } from '../utils/categories'

const SELECTOR_ITEM = '[data-element="sidebar-icon"]'
const CLASS_ACTIVE = 'active'

export default class SidebarIcons {
  constructor(rootEl, pushPath) {
    this.$el = $(rootEl)
    this.$icons = this.$el.find(SELECTOR_ITEM)

    this.pushPath = pushPath
    this._hook()
  }

  _hook() {
    this.$icons.on('click', (ev) => {
      ev.preventDefault()
      const name = idToPath($(ev.currentTarget).data('id'))
      this.pushPath(`/${name}`)
    })
  }

  activate(name) {
    this.$icons.removeClass(CLASS_ACTIVE)
    this.$icons.filter(`[data-id="${name}"]`).addClass(CLASS_ACTIVE)
  }
}
