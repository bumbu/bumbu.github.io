import { observable } from 'mobx'
import { categoryById } from '../utils/categories'
import { filterByCategory, filterBySearch } from '../utils/posts'

export default class SidebarStore {
    constructor() {
        return observable({
            activeCategory: window.ACTIVE_CATEGORY,
            activePost: window.ACTIVE_POST,
            allPosts: window.POSTS.slice(0), // Shallow copy
            searchTerm: '',
            get visiblePosts() {
              if (this.showSearch) {
                return filterBySearch(this.allPosts, this.searchTerm)
              } else {
                return filterByCategory(this.allPosts, this.activeCategory)
              }
            },
            get showSearch() {
              return this.activeCategory === 'search'
            },
            get activeCategoryName() {
              const category = categoryById(this.activeCategory)
              return category ? category.name : null
            }
        })
    }
}
