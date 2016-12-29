import mobx from 'mobx'
import SidebarIcons from '../modules/SidebarIcons'
import { isCategory, trimPath, idToPath, pathToId } from '../utils/categories'

export function observe (stores, history) {
    _observeHistory(history, stores)

    const sidebarIcons = _getSidebarIcons(stores.routing)
    _observeActiveCategory(stores, sidebarIcons)
    _activateIconsCategory(sidebarIcons, stores.sidebar.activeCategory)
}

function _getSidebarIcons(routingStore) {
    const iconsEl = document.querySelector('[data-element="sidebar-icons"]')
    return new SidebarIcons(iconsEl, name => routingStore.push(idToPath(name)))
}

function _observeHistory(history, stores) {
    history.listen(location => {
        const path = trimPath(location.pathname)
        if (isCategory(path)) {
          stores.sidebar.activeCategory = pathToId(path)
        } else {
          stores.sidebar.activePost = path
        }
    })
}

function _observeActiveCategory(stores, sidebarIcons) {
    mobx.observe(stores.sidebar, 'activeCategory', (newVal, oldVal) => {
      _activateIconsCategory(sidebarIcons, newVal)
    })
}

function _activateIconsCategory(sidebarIcons, category) {
  sidebarIcons.activate(category)
}

