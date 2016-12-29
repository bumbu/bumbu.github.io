const categories = window.CATEGORIES.slice(0) // Shallow copy

/**
 * Checks if a string is a category
 * Checks by category id and path
 *
 * @param {string} name
 * @returns boolean
 */
export function isCategory(name) {
  for (let category of categories) {
    if (category.id === name || category.path === name) {
      return true
    }
  }
  return false
}

/**
 * Trims trailing slashes
 *
 * @param {string} path
 * @returns string
 */
export function trimPath(path) {
  if (path[0] === '/') path = path.substr(1, path.length - 1)
  if (path[path.length - 1] === '/') path = path.substr(0, path.length - 1)
  return path
}

/**
 * Transforms a path into name
 * If no such category path found, returns self
 *
 * @export
 * @param {string} path
 * @returns string
 */
export function pathToId(path) {
  for (let category of categories) {
    if (category.path === path) {
      return category.id
    }
  }

  return path
}

/**
 * Transforms a name into a path
 * If no such category path found, returns self
 *
 * @export
 * @param {string} name
 * @returns string
 */
export function idToPath(name) {
  for (let category of categories) {
    if (category.id === name) {
      return category.path
    }
  }

  return name
}

/**
 * Return a category by id
 *
 * @export
 * @param {string} id
 * @returns object|null
 */
export function categoryById(id) {
  for (let category of categories) {
    if (category.id === id) {
      return category
    }
  }

  return null
}
